import {
  ArrowRight, ArrowUpRight, BadgeCheck, BookOpen,
  Boxes, Briefcase, BriefcaseBusiness, ChevronRight, Ellipsis,
  Eye, LoaderCircle, Mail, MailOpen, MessageSquare, Newspaper, Plus, Shield, Sparkles, Users,
} from 'lucide-react';
import { formatAdminDate } from './adminApi.js';

function StatCard({ icon: Icon, iconColor, label, value, loading, foot, trend, onClick }) {
  return (
    <article
      className={`admin-stat-card ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={onClick}
    >
      <div className="admin-stat-card__top">
        <span className={`admin-stat-card__icon admin-stat-card__icon--${iconColor}`}><Icon size={18} /></span>
        {trend && <span className="admin-stat-card__trend">{trend}</span>}
      </div>
      <p>{label}</p>
      <strong>{loading ? '—' : value}</strong>
      <span className="admin-stat-card__foot">{foot}</span>
    </article>
  );
}

function AdminOverviewPage({
  users,
  categories,
  projects,
  enquiries,
  blogs,
  careers = [],
  loading,
  onNavigate,
  onCreate,
  onRefresh,
  onMarkRead,
  onSelectEnquiry,
}) {
  const totalAdmins = users.filter((u) => u.role === 'ADMIN' || u.role === 'SUPER_ADMIN').length;
  const unreadEnquiries = enquiries.filter((e) => !e.isRead).length;

  const recentActivity = [
    ...users.map((r) => ({ ...r, type: 'user', date: r.createdAt })),
    ...categories.map((r) => ({ ...r, type: 'category', date: r.createdAt })),
    ...projects.map((r) => ({ ...r, type: 'portfolio', date: r.createdAt })),
    ...blogs.map((r) => ({ ...r, type: 'blog', date: r.createdAt })),
    ...careers.map((r) => ({ ...r, type: 'career', date: r.createdAt })),
    ...enquiries.map((r) => ({ ...r, type: 'enquiry', date: r.createdAt })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);

  const recentEnquiries = enquiries.slice(0, 5);

  const activityIcon = (type) => {
    if (type === 'user') return <Users size={15} />;
    if (type === 'category') return <Boxes size={15} />;
    if (type === 'portfolio') return <BriefcaseBusiness size={15} />;
    if (type === 'blog') return <Newspaper size={15} />;
    if (type === 'career') return <Briefcase size={15} />;
    return <Mail size={15} />;
  };

  const activityLabel = (item) => {
    if (item.type === 'user') return item.name;
    if (item.type === 'category') return item.categoryName;
    if (item.type === 'portfolio') return item.projectName;
    if (item.type === 'blog') return item.title;
    if (item.type === 'career') return item.title;
    return item.name;
  };

  const activitySub = (item) => {
    if (item.type === 'user') return item.email;
    if (item.type === 'category') return 'New category';
    if (item.type === 'portfolio') return 'Portfolio project';
    if (item.type === 'blog') return item.author ? `By ${item.author}` : 'Blog post';
    if (item.type === 'career') return `${item.type} • ${item.location}`;
    return item.email || 'Enquiry';
  };

  return (
    <section className="admin-dashboard">
      {/* Welcome Banner */}
      <div className="admin-welcome-banner">
        <div className="admin-welcome-banner__copy">
          <span className="admin-welcome-banner__eyebrow"></span>
          <h2>Make room for<br />great things.</h2>
          <p>Your workspace is live. Review customer queries, manage content, and keep everything updated.</p>
          <button onClick={() => onNavigate('enquiries')}>View Customer Queries ({enquiries.length}) <ArrowRight size={16} /></button>
        </div>
        <div className="admin-welcome-banner__art" aria-hidden="true">
          <div className="admin-banner-orbit admin-banner-orbit--outer" />
          <div className="admin-banner-orbit admin-banner-orbit--inner" />
          <div className="admin-banner-sun"><img src="/Logo.svg" alt="" /></div>
          <div className="admin-banner-card admin-banner-card--top"><span className="admin-banner-card__icon"><Mail size={15} /></span><span><b>{enquiries.length}</b><small>queries</small></span><i /></div>
          <div className="admin-banner-card admin-banner-card--bottom"><span className="admin-banner-card__icon admin-banner-card__icon--light"><BriefcaseBusiness size={15} /></span><span><b>{projects.length}</b><small>projects</small></span><ArrowUpRight size={14} /></div>
          <div className="admin-banner-spark admin-banner-spark--one">✳</div>
          <div className="admin-banner-spark admin-banner-spark--two">✦</div>
        </div>
        <div className="admin-welcome-banner__watermark">X</div>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        <StatCard
          icon={Mail}
          iconColor="rose"
          label="Customer Queries"
          value={enquiries.length}
          loading={loading}
          foot={`${unreadEnquiries} unread message${unreadEnquiries !== 1 ? 's' : ''}`}
          trend={unreadEnquiries > 0 ? <><span className="admin-live-dot" /> {unreadEnquiries} NEW</> : 'ALL READ'}
          onClick={() => onNavigate('enquiries')}
        />
        <StatCard
          icon={BriefcaseBusiness}
          iconColor="blue"
          label="Portfolio projects"
          value={projects.length}
          loading={loading}
          foot="Showcased projects"
          trend="PUBLISHED"
          onClick={() => onNavigate('portfolio')}
        />
        <StatCard
          icon={Briefcase}
          iconColor="teal"
          label="Career Openings"
          value={careers.length}
          loading={loading}
          foot={`${careers.filter((c) => c.active).length} active positions`}
          trend="HIRING"
          onClick={() => onNavigate('careers')}
        />
        <StatCard
          icon={Newspaper}
          iconColor="amber"
          label="Blog posts"
          value={blogs.length}
          loading={loading}
          foot="Published articles"
          trend="CONTENT"
          onClick={() => onNavigate('blogs')}
        />
        <StatCard
          icon={Boxes}
          iconColor="amber"
          label="Categories"
          value={categories.length}
          loading={loading}
          foot="Across your workspace"
          trend="ORGANIZED"
          onClick={() => onNavigate('categories')}
        />
        <StatCard
          icon={Users}
          iconColor="green"
          label="Total users"
          value={users.length}
          loading={loading}
          foot="Registered in workspace"
          trend={<><ArrowUpRight size={13} /> LIVE</>}
          onClick={() => onNavigate('users')}
        />
      </div>

      {/* Prominent Customer Queries Section right on Dashboard */}
      <section className="admin-panel admin-queries-dashboard-panel">
        <div className="admin-panel__heading">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
                <MessageSquare size={18} />
              </span>
              <h3 className="text-base font-bold text-slate-800">Recent Customer Queries</h3>
              {unreadEnquiries > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700 animate-pulse">
                  {unreadEnquiries} New
                </span>
              )}
            </div>
            <p>Direct inquiries submitted from website contact and application forms</p>
          </div>
          <button className="admin-text-button" onClick={() => onNavigate('enquiries')}>
            Open All Enquiries ({enquiries.length}) <ArrowRight size={15} />
          </button>
        </div>

        {loading ? (
          <div className="admin-loading"><LoaderCircle className="admin-spin" size={21} /> Loading queries…</div>
        ) : recentEnquiries.length === 0 ? (
          <div className="admin-empty admin-empty--compact">
            <span><Mail size={22} /></span>
            <strong>No customer queries yet</strong>
            <p>When clients or students submit forms on your website, their queries appear here instantly.</p>
          </div>
        ) : (
          <div className="admin-table-wrapper" style={{ border: 'none', borderRadius: '12px' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '28px' }}></th>
                  <th>Client</th>
                  <th>Service / Subject</th>
                  <th>Message Preview</th>
                  <th>Date</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentEnquiries.map((enquiry) => (
                  <tr
                    key={enquiry.id}
                    className={!enquiry.isRead ? 'admin-table__row--unread cursor-pointer' : 'cursor-pointer'}
                    onClick={() => (onSelectEnquiry ? onSelectEnquiry(enquiry) : onNavigate('enquiries'))}
                  >
                    <td>
                      <span
                        className={`admin-read-dot ${enquiry.isRead ? 'admin-read-dot--read' : 'admin-read-dot--unread'}`}
                        title={enquiry.isRead ? 'Read' : 'New unread query'}
                      />
                    </td>
                    <td>
                      <div>
                        <strong className="block text-slate-900">{enquiry.name}</strong>
                        <span className="text-xs text-slate-500">{enquiry.email}</span>
                        {enquiry.phone && <span className="block text-[11px] text-slate-400">{enquiry.phone}</span>}
                      </div>
                    </td>
                    <td>
                      <span className="admin-badge admin-badge--admin">
                        {enquiry.service || 'General Inquiry'}
                      </span>
                    </td>
                    <td className="admin-table__message-cell">
                      <span className="admin-table__message-preview" title={enquiry.message}>
                        {enquiry.message}
                      </span>
                    </td>
                    <td className="admin-table__date">{formatAdminDate(enquiry.createdAt)}</td>
                    <td>
                      <div className="admin-table__actions" style={{ justifyContent: 'flex-end' }} onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          className="admin-icon-button"
                          title="View Details"
                          onClick={() => (onSelectEnquiry ? onSelectEnquiry(enquiry) : onNavigate('enquiries'))}
                        >
                          <Eye size={15} />
                        </button>
                        {!enquiry.isRead && onMarkRead && (
                          <button
                            type="button"
                            className="admin-icon-button admin-icon-button--success"
                            title="Mark as Read"
                            onClick={() => onMarkRead(enquiry)}
                          >
                            <MailOpen size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <div className="admin-dashboard__columns">
        {/* Recent Activity */}
        <section className="admin-panel admin-activity">
          <div className="admin-panel__heading">
            <div><h3>Workspace Activity</h3><p>Latest updates across users, projects, and queries</p></div>
            <button className="admin-text-button" onClick={() => onNavigate('users')}>View team <ArrowRight size={15} /></button>
          </div>
          {loading ? (
            <div className="admin-loading"><LoaderCircle className="admin-spin" size={21} /> Loading activity…</div>
          ) : recentActivity.length === 0 ? (
            <div className="admin-empty admin-empty--compact">
              <span><Sparkles size={20} /></span>
              <strong>Activity log starts here</strong>
              <p>Add a user, publish a project, or receive a query to see it appear here.</p>
            </div>
          ) : (
            <div className="admin-activity-list">
              {recentActivity.map((item) => (
                <div className="admin-activity-row" key={`${item.type}-${item.id ?? item._id}`}>
                  <span className={`admin-activity-icon admin-activity-icon--${item.type}`}>{activityIcon(item.type)}</span>
                  <span className="admin-activity-row__main">
                    <strong>{activityLabel(item)}</strong>
                    <small>{activitySub(item)}</small>
                  </span>
                  <span className="admin-activity-row__type">{item.type}</span>
                  <span className="admin-activity-row__date">{formatAdminDate(item.date)}</span>
                </div>
              ))}
            </div>
          )}
          <div className="admin-activity__footer">
            <span><span className="admin-live-dot" /> Live sync</span>
            <button className="admin-icon-button" aria-label="Refresh workspace" onClick={onRefresh}><ArrowUpRight size={16} /></button>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="admin-panel admin-quick-panel">
          <div className="admin-panel__heading"><div><h3>Quick actions</h3><p>Manage content & tools</p></div><Ellipsis size={20} /></div>
          <button className="admin-quick-action" onClick={() => onNavigate('enquiries')}>
            <span className="admin-quick-action__icon admin-quick-action__icon--enquiry"><Mail size={17} /></span>
            <span>
              <strong>Customer Enquiries</strong>
              <small>{unreadEnquiries > 0 ? `${unreadEnquiries} new message${unreadEnquiries > 1 ? 's' : ''}` : 'View all inquiries'}</small>
            </span>
            <ChevronRight size={17} />
          </button>
          <button className="admin-quick-action" onClick={() => onCreate('portfolio')}>
            <span className="admin-quick-action__icon admin-quick-action__icon--portfolio"><BriefcaseBusiness size={17} /></span>
            <span><strong>Add portfolio project</strong><small>Showcase new client work</small></span>
            <ChevronRight size={17} />
          </button>
          <button className="admin-quick-action" onClick={() => onCreate('career')}>
            <span className="admin-quick-action__icon admin-quick-action__icon--blog"><Briefcase size={17} /></span>
            <span><strong>Post a job opening</strong><small>Publish career positions</small></span>
            <ChevronRight size={17} />
          </button>
          <button className="admin-quick-action" onClick={() => onCreate('blog')}>
            <span className="admin-quick-action__icon admin-quick-action__icon--blog"><Newspaper size={17} /></span>
            <span><strong>Write a blog post</strong><small>Publish industry insights</small></span>
            <ChevronRight size={17} />
          </button>
          <button className="admin-quick-action" onClick={() => onCreate('user')}>
            <span className="admin-quick-action__icon admin-quick-action__icon--users"><Plus size={17} /></span>
            <span><strong>Invite a team member</strong><small>Grant workspace access</small></span>
            <ChevronRight size={17} />
          </button>
          <button className="admin-quick-action" onClick={() => onCreate('category')}>
            <span className="admin-quick-action__icon admin-quick-action__icon--category"><Boxes size={17} /></span>
            <span><strong>Create a category</strong><small>Organize service offerings</small></span>
            <ChevronRight size={17} />
          </button>
          <div className="admin-security-note">
            <span><Shield size={16} /></span>
            <p><strong>Database Protected</strong><small>Encrypted MERN stack API connected to MongoDB Atlas.</small></p>
            <BadgeCheck size={15} />
          </div>
        </section>
      </div>
    </section>
  );
}

export default AdminOverviewPage;
