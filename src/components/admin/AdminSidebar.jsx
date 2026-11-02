import {
  ArrowUpRight,
  Boxes,
  BriefcaseBusiness,
  ChevronDown,
  CircleHelp,
  Command,
  LayoutDashboard,
  LogOut,
  Users,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { adminInitials } from './adminApi.js';

const navigation = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'categories', label: 'Categories', icon: Boxes },
  { id: 'portfolio', label: 'Portfolio', icon: BriefcaseBusiness },
];

function AdminSidebar({ user, userCount, portfolioCount, mobileOpen, onNavigate, onClose, onLogout }) {
  return (
    <>
      {mobileOpen && <button className="admin-sidebar-scrim" aria-label="Close navigation" onClick={onClose} />}
      <aside className={`admin-sidebar ${mobileOpen ? 'admin-sidebar--open' : ''}`}>
        <a className="admin-sidebar__brand" href="/" aria-label="XentroX home">
          <span className="admin-brand-mark">X</span>
          <span><strong>XENTRO<span>X</span></strong><small>SOLUTIONS</small></span>
        </a>
        <div className="admin-sidebar__workspace">
          <span className="admin-sidebar__workspace-icon"><Command size={17} /></span>
          <span><strong>Workspace</strong><small>Administration</small></span>
          <ChevronDown size={15} className="admin-sidebar__chevron" />
        </div>
        <span className="admin-sidebar__label">WORKSPACE</span>
        <nav className="admin-nav" aria-label="Admin navigation">
          {navigation.map(({ id, label, icon: Icon }) => (
            <NavLink
              to={id === 'overview' ? '/admin' : `/admin/${id}`}
              end={id === 'overview'}
              className={({ isActive }) => `admin-nav__item ${isActive ? 'admin-nav__item--active' : ''}`}
              key={id}
              onClick={() => onNavigate(id)}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
              {(id === 'users' || id === 'portfolio') && (
                <span className="admin-nav__count">{id === 'users' ? userCount : portfolioCount}</span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar__bottom">
          <div className="admin-sidebar__help">
            <span className="admin-sidebar__help-icon"><CircleHelp size={17} /></span>
            <span><strong>Need a hand?</strong><small>We're here to help.</small></span>
            <ArrowUpRight size={14} />
          </div>
          <div className="admin-sidebar__profile">
            <span className="admin-avatar admin-avatar--sidebar">{adminInitials(user.name)}</span>
            <span className="admin-sidebar__profile-copy"><strong>{user.name}</strong><small>Super administrator</small></span>
            <button className="admin-icon-button admin-sidebar__logout" aria-label="Sign out" title="Sign out" onClick={onLogout}><LogOut size={17} /></button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
