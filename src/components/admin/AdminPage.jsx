import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminBlogsPage from './AdminBlogsPage.jsx';
import AdminCareersPage from './AdminCareersPage.jsx';
import AdminCategoriesPage from './AdminCategoriesPage.jsx';
import AdminEnquiriesPage from './AdminEnquiriesPage.jsx';
import AdminLayout from './AdminLayout.jsx';
import AdminLogin from './AdminLogin.jsx';
import AdminOverviewPage from './AdminOverviewPage.jsx';
import AdminPortfolioPage from './AdminPortfolioPage.jsx';
import AdminPricingPage from './AdminPricingPage.jsx';
import AdminRecordDialog from './AdminRecordDialog.jsx';
import AdminUsersPage from './AdminUsersPage.jsx';
import {
  adminRequest,
  clearAdminSession,
  readAdminSession,
  storeAdminSession,
} from './adminApi.js';
import './AdminPage.css';

const validPages = ['overview', 'users', 'categories', 'portfolio', 'careers', 'enquiries', 'blogs', 'pricing'];

function AdminPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [session, setSession] = useState(readAdminSession);
  const requestedPage = location.pathname.replace(/\/+$/, '').split('/')[2] || 'overview';
  const activePage = validPages.includes(requestedPage) ? requestedPage : 'overview';

  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [careers, setCareers] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(() => Boolean(sessionStorage.getItem('xentrox-admin-token')));
  const [setupRequired, setSetupRequired] = useState(null);
  const [setupLoading, setSetupLoading] = useState(() => !readAdminSession());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [modal, setModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [activeEnquiry, setActiveEnquiry] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // --- Setup status check ---
  useEffect(() => {
    if (session?.token) return undefined;
    let active = true;
    adminRequest('/api/auth/setup-status')
      .then((status) => { if (active) { setSetupRequired(status.setupRequired); setError(''); } })
      .catch((err) => { if (active) { setSetupRequired(null); setError(err.message); } })
      .finally(() => { if (active) setSetupLoading(false); });
    return () => { active = false; };
  }, [session?.token]);

  // --- Load all workspace data ---
  const loadWorkspace = useCallback(async (token) => {
    try {
      const [u, c, p, cr, e, b] = await Promise.all([
        adminRequest('/api/users', { token }),
        adminRequest('/api/categories', { token }),
        adminRequest('/api/portfolio', { token }),
        adminRequest('/api/careers?all=true', { token }),
        adminRequest('/api/enquiries', { token }),
        adminRequest('/api/blogs', { token }),
      ]);
      setUsers(u);
      setCategories(c);
      setProjects(p);
      setCareers(cr);
      setEnquiries(e);
      setBlogs(b);
      setError('');
    } catch (loadError) {
      if (loadError.status === 401 || loadError.status === 403) {
        clearAdminSession();
        setSetupRequired(null);
        setSetupLoading(true);
        setSession(null);
      }
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!session?.token) return undefined;
    let active = true;
    const fetchWorkspace = async () => {
      try {
        const [u, c, p, cr, e, b] = await Promise.all([
          adminRequest('/api/users', { token: session.token }),
          adminRequest('/api/categories', { token: session.token }),
          adminRequest('/api/portfolio', { token: session.token }),
          adminRequest('/api/careers?all=true', { token: session.token }),
          adminRequest('/api/enquiries', { token: session.token }),
          adminRequest('/api/blogs', { token: session.token }),
        ]);
        if (!active) return;
        setUsers(u); setCategories(c); setProjects(p); setCareers(cr); setEnquiries(e); setBlogs(b);
        setError('');
      } catch (loadError) {
        if (!active) return;
        if (loadError.status === 401 || loadError.status === 403) {
          clearAdminSession(); setSetupRequired(null); setSetupLoading(true); setSession(null);
        }
        setError(loadError.message);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchWorkspace();
    return () => { active = false; };
  }, [session?.token]);

  useEffect(() => {
    if (requestedPage !== activePage) navigate(activePage === 'overview' ? '/admin' : `/admin/${activePage}`, { replace: true });
  }, [activePage, navigate, requestedPage]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(''), 3500);
    return () => window.clearTimeout(timer);
  }, [notice]);

  // --- Auth handlers ---
  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setBusy(true); setError('');
    try {
      const result = await adminRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: formData.get('email'), password: formData.get('password') }),
      });
      if (result.user?.role !== 'SUPER_ADMIN') { setError('Admin access is reserved for super administrators.'); return; }
      storeAdminSession(result);
      setSession({ token: result.accessToken, user: result.user });
      setSetupRequired(false); setLoading(true);
      navigate('/admin', { replace: true });
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  const handleSetup = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = formData.get('password');
    if (password !== formData.get('confirmPassword')) { setError('Passwords do not match.'); return; }
    setBusy(true); setError('');
    try {
      const result = await adminRequest('/api/auth/setup', {
        method: 'POST',
        body: JSON.stringify({ name: formData.get('name'), email: formData.get('email'), password }),
      });
      storeAdminSession(result);
      setSession({ token: result.accessToken, user: result.user });
      setSetupRequired(false); setLoading(true);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message);
      if (err.status === 409) setSetupRequired(false);
    } finally { setBusy(false); }
  };

  // --- CRUD handlers ---
  const saveRecord = async (event) => {
    event.preventDefault();
    if (!modal || !session) return;
    const formData = new FormData(event.currentTarget);
    const editing = Boolean(modal.record);
    const id = modal.record?.id;
    setBusy(true); setError('');
    try {
      if (modal.type === 'portfolio') {
        const projectData = {
          projectName: formData.get('projectName'),
          projectDescription: formData.get('projectDescription'),
          projectTechStack: formData.getAll('projectTechStack'),
          categoryId: formData.get('categoryId'),
        };
        const multipart = new FormData();
        multipart.append('project', multipart.append('project', JSON.stringify(projectData));
        const image = formData.get('image');
        if (image instanceof File && image.size > 0) multipart.append('image', image);
        await adminRequest(`/api/portfolio${editing ? `/${id}` : ''}`, { token: session.token, method: editing ? 'PUT' : 'POST', body: multipart });
      } else if (modal.type === 'blog') {
        const multipart = new FormData();
        multipart.append('title', formData.get('title'));
        multipart.append('content', formData.get('content'));
        multipart.append('author', formData.get('author'));
        multipart.append('tags', formData.get('tags') || '');
        multipart.append('published', formData.get('published'));
        const image = formData.get('image');
        if (image instanceof File && image.size > 0) multipart.append('image', image);
        await adminRequest(`/api/blogs${editing ? `/${id}` : ''}`, { token: session.token, method: editing ? 'PUT' : 'POST', body: multipart });
      } else if (modal.type === 'career') {
        const payload = {
          title: formData.get('title'),
          category: formData.get('category'),
          type: formData.get('type'),
          location: formData.get('location'),
          description: formData.get('description'),
          skills: formData.get('skills') || '',
          active: formData.get('active') === 'true',
        };
        await adminRequest(`/api/careers${editing ? `/${id}` : ''}`, {
          token: session.token,
          method: editing ? 'PUT' : 'POST',
          body: JSON.stringify(payload),
        });
      } else {
        const resource = modal.type === 'user' ? 'users' : 'categories';
        const payload = modal.type === 'user'
          ? { name: formData.get('name'), email: formData.get('email'), role: formData.get('role') }
          : { categoryName: formData.get('categoryName'), description: formData.get('description') };
        if (modal.type === 'user') {
          const password = formData.get('password');
          if (!editing || password) payload.password = password;
        }
        await adminRequest(`/api/${resource}${editing ? `/${id}` : ''}`, { token: session.token, method: editing ? 'PUT' : 'POST', body: JSON.stringify(payload) });
      }
      setModal(null);
      const typeLabel = {
        user: 'User',
        portfolio: 'Portfolio project',
        category: 'Category',
        blog: 'Blog post',
        career: 'Career position',
      }[modal.type] || 'Record';
      setNotice(`${typeLabel} ${editing ? 'updated' : 'created'} successfully.`);
      setLoading(true);
      await loadWorkspace(session.token);
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  const deleteRecord = async () => {
    if (!deleteTarget || !session) return;
    const { type, record } = deleteTarget;
    setBusy(true); setError('');
    try {
      const resource = {
        user: 'users',
        portfolio: 'portfolio',
        category: 'categories',
        blog: 'blogs',
        career: 'careers',
        enquiry: 'enquiries',
      }[type];
      await adminRequest(`/api/${resource}/${record.id}`, { token: session.token, method: 'DELETE' });
      setDeleteTarget(null);
      const typeLabel = {
        user: 'User',
        portfolio: 'Portfolio project',
        category: 'Category',
        blog: 'Blog post',
        career: 'Career position',
        enquiry: 'Enquiry',
      }[type] || 'Record';
      setNotice(`${typeLabel} deleted successfully.`);
      setLoading(true);
      await loadWorkspace(session.token);
    } catch (err) { setError(err.message); setDeleteTarget(null); }
    finally { setBusy(false); }
  };

  const markEnquiryRead = async (enquiry) => {
    if (!session) return;
    try {
      await adminRequest(`/api/enquiries/${enquiry.id}/read`, { token: session.token, method: 'PUT' });
      setEnquiries((prev) => prev.map((e) => e.id === enquiry.id ? { ...e, isRead: true } : e));
      setNotice('Enquiry marked as read.');
    } catch (err) { setError(err.message); }
  };

  const handleLogout = () => {
    clearAdminSession();
    setSetupRequired(null); setSetupLoading(true); setSession(null);
    setUsers([]); setCategories([]); setProjects([]); setCareers([]); setEnquiries([]); setBlogs([]);
    setLoading(false); setError(''); setNotice(''); setModal(null); setDeleteTarget(null);
  };

  const handleNavigate = (page) => {
    navigate(page === 'overview' ? '/admin' : `/admin/${page}`);
    setMobileNavOpen(false); setError('');
  };

  const closeDialog = useCallback(() => { setModal(null); setDeleteTarget(null); }, []);

  // --- Login screen ---
  if (!session) {
    return (
      <AdminLogin
        error={error} busy={busy} setupRequired={setupRequired}
        setupLoading={setupLoading} onSubmit={handleLogin} onSetup={handleSetup}
      />
    );
  }

  const openCreateDialog = (type) => setModal({ type });
  const openEditDialog = (type, record) => setModal({ type, record });
  const openDeleteDialog = (type, record) => setDeleteTarget({ type, record });

  const counts = {
    userCount: users.length,
    categoryCount: categories.length,
    portfolioCount: projects.length,
    careerCount: careers.length,
    enquiryCount: enquiries.length,
    blogCount: blogs.length,
  };

  return (
    <>
      <AdminLayout
        activePage={activePage} user={session.user} counts={counts}
        mobileOpen={mobileNavOpen} error={error} notice={notice}
        onNavigate={handleNavigate}
        onOpenNavigation={() => setMobileNavOpen(true)}
        onCloseNavigation={() => setMobileNavOpen(false)}
        onLogout={handleLogout} onDismissError={() => setError('')}
        onCreate={() => openCreateDialog(
          activePage === 'users' ? 'user' :
          activePage === 'categories' ? 'category' :
          activePage === 'blogs' ? 'blog' :
          activePage === 'careers' ? 'career' : 'portfolio'
        )}
      >
        {activePage === 'overview' && (
          <AdminOverviewPage
            users={users} categories={categories} projects={projects}
            enquiries={enquiries} blogs={blogs} careers={careers} loading={loading}
            onNavigate={handleNavigate} onCreate={openCreateDialog}
            onRefresh={() => { setError(''); setLoading(true); loadWorkspace(session.token); }}
            onMarkRead={markEnquiryRead}
            onSelectEnquiry={(enquiry) => {
              setActiveEnquiry(enquiry);
              handleNavigate('enquiries');
            }}
          />
        )}
        {activePage === 'users' && (
          <AdminUsersPage users={users} loading={loading}
            onCreate={() => openCreateDialog('user')}
            onEdit={(r) => openEditDialog('user', r)}
            onDelete={(r) => openDeleteDialog('user', r)}
          />
        )}
        {activePage === 'categories' && (
          <AdminCategoriesPage categories={categories} loading={loading}
            onCreate={() => openCreateDialog('category')}
            onEdit={(r) => openEditDialog('category', r)}
            onDelete={(r) => openDeleteDialog('category', r)}
          />
        )}
        {activePage === 'portfolio' && (
          <AdminPortfolioPage projects={projects} loading={loading}
            onCreate={() => openCreateDialog('portfolio')}
            onEdit={(r) => openEditDialog('portfolio', r)}
            onDelete={(r) => openDeleteDialog('portfolio', r)}
          />
        )}
        {activePage === 'careers' && (
          <AdminCareersPage careers={careers} loading={loading}
            onCreate={() => openCreateDialog('career')}
            onEdit={(r) => openEditDialog('career', r)}
            onDelete={(r) => openDeleteDialog('career', r)}
          />
        )}
        {activePage === 'enquiries' && (
          <AdminEnquiriesPage enquiries={enquiries} loading={loading}
            onMarkRead={markEnquiryRead}
            onDelete={(r) => openDeleteDialog('enquiry', r)}
            activeEnquiry={activeEnquiry}
            onCloseActiveEnquiry={() => setActiveEnquiry(null)}
          />
        )}
        {activePage === 'blogs' && (
          <AdminBlogsPage blogs={blogs} loading={loading}
            onCreate={() => openCreateDialog('blog')}
            onEdit={(r) => openEditDialog('blog', r)}
            onDelete={(r) => openDeleteDialog('blog', r)}
          />
        )}
        {activePage === 'pricing' && <AdminPricingPage token={session.token} />}
      </AdminLayout>
      <AdminRecordDialog
        key={modal ? `${modal.type}-${modal.record?.id ?? 'new'}` : deleteTarget ? `delete-${deleteTarget.type}-${deleteTarget.record.id}` : 'closed'}
        modal={modal} deleteTarget={deleteTarget}
        busy={busy} error={error} categories={categories}
        onSave={saveRecord} onDelete={deleteRecord} onClose={closeDialog}
      />
    </>
  );
}

export default AdminPage;
