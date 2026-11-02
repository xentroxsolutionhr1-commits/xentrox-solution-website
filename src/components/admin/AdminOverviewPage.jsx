import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Boxes,
  Check,
  ChevronRight,
  Ellipsis,
  LoaderCircle,
  Plus,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react';
import { formatAdminDate } from './adminApi.js';

function AdminOverviewPage({ users, categories, loading, onNavigate, onCreate, onRefresh }) {
  const totalAdmins = users.filter((user) => user.role === 'ADMIN' || user.role === 'SUPER_ADMIN').length;
  const recentActivity = [
    ...users.map((record) => ({ ...record, type: 'user', date: record.createdAt })),
    ...categories.map((record) => ({ ...record, type: 'category', date: record.createdAt })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return (
    <section className="admin-dashboard">
      <div className="admin-welcome-banner">
        <div className="admin-welcome-banner__copy">
          <span className="admin-welcome-banner__eyebrow"></span>
          <h2>Make room for<br />great things.</h2>
          <p>Your workspace is looking good. Here’s the latest across your team.</p>
          <button onClick={() => onNavigate('users')}>Explore your team <ArrowRight size={16} /></button>
        </div>
        <div className="admin-welcome-banner__art" aria-hidden="true">
          <div className="admin-banner-orbit admin-banner-orbit--outer" />
          <div className="admin-banner-orbit admin-banner-orbit--inner" />
          <div className="admin-banner-sun"><img src="/Logo.svg" alt="" /></div>
          <div className="admin-banner-card admin-banner-card--top"><span className="admin-banner-card__icon"><Users size={15} /></span><span><b>{users.length}</b><small>people</small></span><i /></div>
          <div className="admin-banner-card admin-banner-card--bottom"><span className="admin-banner-card__icon admin-banner-card__icon--light"><BookOpen size={15} /></span><span><b>{categories.length}</b><small>categories</small></span><ArrowUpRight size={14} /></div>
          <div className="admin-banner-spark admin-banner-spark--one">✳</div>
          <div className="admin-banner-spark admin-banner-spark--two">✦</div>
        </div>
        <div className="admin-welcome-banner__watermark">X</div>
      </div>

      <div className="admin-stats-grid">
        <article className="admin-stat-card">
          <div className="admin-stat-card__top"><span className="admin-stat-card__icon admin-stat-card__icon--green"><Users size={18} /></span><span className="admin-stat-card__trend"><ArrowUpRight size={14} /> LIVE</span></div>
          <p>Total users</p><strong>{loading ? '—' : users.length}</strong><span className="admin-stat-card__foot">Registered in your workspace</span>
        </article>
        <article className="admin-stat-card">
          <div className="admin-stat-card__top"><span className="admin-stat-card__icon admin-stat-card__icon--lavender"><Shield size={18} /></span><span className="admin-stat-card__trend admin-stat-card__trend--quiet">ACCESS</span></div>
          <p>Privileged access</p><strong>{loading ? '—' : totalAdmins}</strong><span className="admin-stat-card__foot">Admins and super admins</span>
        </article>
        <article className="admin-stat-card">
          <div className="admin-stat-card__top"><span className="admin-stat-card__icon admin-stat-card__icon--amber"><Boxes size={18} /></span><span className="admin-stat-card__trend admin-stat-card__trend--quiet">ORGANIZED</span></div>
          <p>Categories</p><strong>{loading ? '—' : categories.length}</strong><span className="admin-stat-card__foot">Across your workspace</span>
        </article>
        <article className="admin-stat-card">
          <div className="admin-stat-card__top"><span className="admin-stat-card__icon admin-stat-card__icon--blue"><BadgeCheck size={18} /></span><span className="admin-stat-card__trend admin-stat-card__trend--quiet">SECURE</span></div>
          <p>Account status</p><strong className="admin-stat-card__secure">Protected</strong><span className="admin-stat-card__foot">Signed in as super admin</span>
        </article>
      </div>

      <div className="admin-dashboard__columns">
        <section className="admin-panel admin-activity">
          <div className="admin-panel__heading"><div><h3>Recently added</h3><p>The latest additions to your workspace</p></div><button className="admin-text-button" onClick={() => onNavigate('users')}>View team <ArrowRight size={15} /></button></div>
          {loading ? <div className="admin-loading"><LoaderCircle className="admin-spin" size={21} /> Loading workspace data…</div> : recentActivity.length === 0 ? (
            <div className="admin-empty admin-empty--compact"><span><Sparkles size={20} /></span><strong>Your workspace starts here</strong><p>Add a user or category to see it appear here.</p><button className="admin-text-button" onClick={() => onNavigate('users')}>Add your first user <ArrowRight size={15} /></button></div>
          ) : (
            <div className="admin-activity-list">
              {recentActivity.map((item) => (
                <div className="admin-activity-row" key={`${item.type}-${item.id}`}>
                  <span className={`admin-activity-icon admin-activity-icon--${item.type}`}>{item.type === 'user' ? <Users size={16} /> : <BookOpen size={16} />}</span>
                  <span className="admin-activity-row__main"><strong>{item.type === 'user' ? item.name : item.categoryName}</strong><small>{item.type === 'user' ? item.email : 'New category'}</small></span>
                  <span className="admin-activity-row__type">{item.type}</span>
                  <span className="admin-activity-row__date">{formatAdminDate(item.date)}</span>
                </div>
              ))}
            </div>
          )}
          <div className="admin-activity__footer"><span><span className="admin-live-dot" /> Up to date</span><button className="admin-icon-button" aria-label="Refresh workspace" onClick={onRefresh}><ArrowUpRight size={16} /></button></div>
        </section>

        <section className="admin-panel admin-quick-panel">
          <div className="admin-panel__heading"><div><h3>Quick actions</h3><p>Keep things moving</p></div><Ellipsis size={20} /></div>
          <button className="admin-quick-action" onClick={() => onCreate('user')}>
            <span className="admin-quick-action__icon admin-quick-action__icon--users"><Plus size={17} /></span><span><strong>Invite a team member</strong><small>Add someone to your workspace</small></span><ChevronRight size={17} />
          </button>
          <button className="admin-quick-action" onClick={() => onCreate('category')}>
            <span className="admin-quick-action__icon admin-quick-action__icon--category"><Boxes size={17} /></span><span><strong>Create a category</strong><small>Organize your workspace</small></span><ChevronRight size={17} />
          </button>
          <div className="admin-security-note"><span><Shield size={16} /></span><p><strong>Your workspace is protected</strong><small>Only super administrators can access these settings.</small></p><Check size={15} /></div>
        </section>
      </div>
    </section>
  );
}

export default AdminOverviewPage;
