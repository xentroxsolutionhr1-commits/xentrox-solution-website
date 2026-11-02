import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminCategoriesPage from './AdminCategoriesPage.jsx';
import AdminLayout from './AdminLayout.jsx';
import AdminLogin from './AdminLogin.jsx';
import AdminOverviewPage from './AdminOverviewPage.jsx';
import AdminPortfolioPage from './AdminPortfolioPage.jsx';
import AdminRecordDialog from './AdminRecordDialog.jsx';
import AdminUsersPage from './AdminUsersPage.jsx';
import {
  adminRequest,
  clearAdminSession,
  readAdminSession,
  storeAdminSession,
} from './adminApi.js';
import './AdminPage.css';

function AdminPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [session, setSession] = useState(readAdminSession);
  const requestedPage = location.pathname.replace(/\/+$/, '').split('/')[2] || 'overview';
  const activePage = ['overview', 'users', 'categories', 'portfolio'].includes(requestedPage) ? requestedPage : 'overview';
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(() => Boolean(sessionStorage.getItem('xentrox-admin-token')));
  const [setupRequired, setSetupRequired] = useState(null);
  const [setupLoading, setSetupLoading] = useState(() => !readAdminSession());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [modal, setModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (session?.token) return undefined;
    let active = true;
    adminRequest('/api/auth/setup-status')
      .then((status) => {
        if (active) {
          setSetupRequired(status.setupRequired);
          setError('');
        }
      })
      .catch((statusError) => {
        if (active) {
          setSetupRequired(null);
          setError(statusError.message);
        }
      })
      .finally(() => {
        if (active) setSetupLoading(false);
      });
    return () => { active = false; };
  }, [session?.token]);

  const loadWorkspace = useCallback(async (token) => {
    try {
      const [nextUsers, nextCategories, nextProjects] = await Promise.all([
        adminRequest('/api/users', { token }),
        adminRequest('/api/categories', { token }),
        adminRequest('/api/portfolio', { token }),
      ]);
      setUsers(nextUsers);
      setCategories(nextCategories);
      setProjects(nextProjects);
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
        const [nextUsers, nextCategories, nextProjects] = await Promise.all([
          adminRequest('/api/users', { token: session.token }),
          adminRequest('/api/categories', { token: session.token }),
          adminRequest('/api/portfolio', { token: session.token }),
        ]);
        if (!active) return;
        setUsers(nextUsers);
        setCategories(nextCategories);
        setProjects(nextProjects);
        setError('');
      } catch (loadError) {
        if (!active) return;
        if (loadError.status === 401 || loadError.status === 403) {
          clearAdminSession();
          setSetupRequired(null);
          setSetupLoading(true);
          setSession(null);
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
    if (requestedPage !== activePage) navigate('/admin', { replace: true });
  }, [activePage, navigate, requestedPage]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(''), 3500);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setBusy(true);
    setError('');
    try {
      const result = await adminRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
        }),
      });
      if (result.user?.role !== 'SUPER_ADMIN') {
        setError('Admin access is reserved for super administrators.');
        return;
      }
      storeAdminSession(result);
      setSession({ token: result.accessToken, user: result.user });
      setSetupRequired(false);
      setLoading(true);
      navigate('/admin', { replace: true });
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setBusy(false);
    }
  };

  const handleSetup = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = formData.get('password');
    if (password !== formData.get('confirmPassword')) {
      setError('Passwords do not match.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const result = await adminRequest('/api/auth/setup', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          password,
        }),
      });
      storeAdminSession(result);
      setSession({ token: result.accessToken, user: result.user });
      setSetupRequired(false);
      setLoading(true);
      navigate('/admin', { replace: true });
    } catch (setupError) {
      setError(setupError.message);
      if (setupError.status === 409) {
        setSetupRequired(false);
      }
    } finally {
      setBusy(false);
    }
  };

  const saveRecord = async (event) => {
    event.preventDefault();
    if (!modal || !session) return;
    const formData = new FormData(event.currentTarget);
    const editing = Boolean(modal.record);
    const id = modal.record?.id;
    setBusy(true);
    setError('');
    try {
      if (modal.type === 'portfolio') {
        const projectData = {
          projectName: formData.get('projectName'),
          projectDescription: formData.get('projectDescription'),
          projectTechStack: formData.getAll('projectTechStack'),
          categoryId: Number(formData.get('categoryId')),
        };
        const multipart = new FormData();
        multipart.append('project', new Blob([JSON.stringify(projectData)], { type: 'application/json' }));
        const image = formData.get('image');
        if (image instanceof File && image.size > 0) multipart.append('image', image);
        await adminRequest(`/api/portfolio${editing ? `/${id}` : ''}`, {
          token: session.token,
          method: editing ? 'PUT' : 'POST',
          body: multipart,
        });
      } else {
        const resource = modal.type === 'user' ? 'users' : 'categories';
        const payload = modal.type === 'user'
          ? {
          name: formData.get('name'),
          email: formData.get('email'),
          role: formData.get('role'),
          }
          : {
          categoryName: formData.get('categoryName'),
          description: formData.get('description'),
          };
        if (modal.type === 'user') {
          const password = formData.get('password');
          if (!editing || password) payload.password = password;
        }
        await adminRequest(`/api/${resource}${editing ? `/${id}` : ''}`, {
          token: session.token,
          method: editing ? 'PUT' : 'POST',
          body: JSON.stringify(payload),
        });
      }
      setModal(null);
      const typeLabel = modal.type === 'user' ? 'User' : modal.type === 'portfolio' ? 'Portfolio project' : 'Category';
      setNotice(`${typeLabel} ${editing ? 'updated' : 'created'} successfully.`);
      setLoading(true);
      await loadWorkspace(session.token);
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setBusy(false);
    }
  };

  const deleteRecord = async () => {
    if (!deleteTarget || !session) return;
    const { type, record } = deleteTarget;
    setBusy(true);
    setError('');
    try {
      const resource = type === 'user' ? 'users' : type === 'portfolio' ? 'portfolio' : 'categories';
      await adminRequest(`/api/${resource}/${record.id}`, {
        token: session.token,
        method: 'DELETE',
      });
      setDeleteTarget(null);
      const typeLabel = type === 'user' ? 'User' : type === 'portfolio' ? 'Portfolio project' : 'Category';
      setNotice(`${typeLabel} deleted successfully.`);
      setLoading(true);
      await loadWorkspace(session.token);
    } catch (deleteError) {
      setError(deleteError.message);
      setDeleteTarget(null);
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    setSetupRequired(null);
    setSetupLoading(true);
    setSession(null);
    setUsers([]);
    setCategories([]);
    setProjects([]);
    setLoading(false);
    setError('');
    setNotice('');
    setModal(null);
    setDeleteTarget(null);
  };

  const handleNavigate = (page) => {
    navigate(page === 'overview' ? '/admin' : `/admin/${page}`);
    setMobileNavOpen(false);
    setError('');
  };

  const closeDialog = useCallback(() => {
    setModal(null);
    setDeleteTarget(null);
  }, []);

  if (!session) {
    return (
      <AdminLogin
        error={error}
        busy={busy}
        setupRequired={setupRequired}
        setupLoading={setupLoading}
        onSubmit={handleLogin}
        onSetup={handleSetup}
      />
    );
  }

  const openCreateDialog = (type) => setModal({ type });
  const openEditDialog = (type, record) => setModal({ type, record });
  const openDeleteDialog = (type, record) => setDeleteTarget({ type, record });

  return (
    <>
      <AdminLayout
        activePage={activePage}
        user={session.user}
        userCount={users.length}
        portfolioCount={projects.length}
        mobileOpen={mobileNavOpen}
        error={error}
        notice={notice}
        onNavigate={handleNavigate}
        onOpenNavigation={() => setMobileNavOpen(true)}
        onCloseNavigation={() => setMobileNavOpen(false)}
        onLogout={handleLogout}
        onDismissError={() => setError('')}
        onCreate={() => openCreateDialog(activePage === 'users' ? 'user' : activePage === 'categories' ? 'category' : 'portfolio')}
      >
        {activePage === 'overview' && (
          <AdminOverviewPage
            users={users}
            categories={categories}
            loading={loading}
            onNavigate={handleNavigate}
            onCreate={openCreateDialog}
            onRefresh={() => {
              setError('');
              setLoading(true);
              loadWorkspace(session.token);
            }}
          />
        )}
        {activePage === 'users' && (
          <AdminUsersPage
            users={users}
            loading={loading}
            onCreate={() => openCreateDialog('user')}
            onEdit={(record) => openEditDialog('user', record)}
            onDelete={(record) => openDeleteDialog('user', record)}
          />
        )}
        {activePage === 'categories' && (
          <AdminCategoriesPage
            categories={categories}
            loading={loading}
            onCreate={() => openCreateDialog('category')}
            onEdit={(record) => openEditDialog('category', record)}
            onDelete={(record) => openDeleteDialog('category', record)}
          />
        )}
        {activePage === 'portfolio' && (
          <AdminPortfolioPage
            projects={projects}
            loading={loading}
            onCreate={() => openCreateDialog('portfolio')}
            onEdit={(record) => openEditDialog('portfolio', record)}
            onDelete={(record) => openDeleteDialog('portfolio', record)}
          />
        )}
      </AdminLayout>
      <AdminRecordDialog
        key={modal
          ? `${modal.type}-${modal.record?.id ?? 'new'}`
          : deleteTarget
            ? `delete-${deleteTarget.type}-${deleteTarget.record.id}`
            : 'closed'}
        modal={modal}
        deleteTarget={deleteTarget}
        busy={busy}
        error={error}
        categories={categories}
        onSave={saveRecord}
        onDelete={deleteRecord}
        onClose={closeDialog}
      />
    </>
  );
}

export default AdminPage;
