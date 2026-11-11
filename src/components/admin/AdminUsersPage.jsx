import { Edit2, LoaderCircle, Shield, Sparkles, Trash2, Users } from 'lucide-react';
import { formatAdminDate, adminInitials } from './adminApi.js';

const roleBadge = {
  SUPER_ADMIN: { label: 'Super Admin', cls: 'admin-badge--super' },
  ADMIN: { label: 'Admin', cls: 'admin-badge--admin' },
  USER: { label: 'User', cls: 'admin-badge--user' },
};

function AdminUsersPage({ users, loading, onCreate, onEdit, onDelete }) {
  return (
    <section className="admin-table-section">
      {loading ? (
        <div className="admin-loading"><LoaderCircle className="admin-spin" size={21} /> Loading users…</div>
      ) : users.length === 0 ? (
        <div className="admin-empty">
          <span><Sparkles size={28} /></span>
          <strong>No users yet</strong>
          <p>Invite someone to get started.</p>
          <button className="admin-button admin-button--primary" onClick={onCreate}><Users size={16} /> Add user</button>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const badge = roleBadge[user.role] || roleBadge.USER;
                return (
                  <tr key={user.id}>
                    <td>
                      <div className="admin-table__user-cell">
                        <span className="admin-avatar admin-avatar--sm">{adminInitials(user.name)}</span>
                        <strong>{user.name}</strong>
                      </div>
                    </td>
                    <td><a href={`mailto:${user.email}`} className="admin-link">{user.email}</a></td>
                    <td><span className={`admin-badge ${badge.cls}`}>{badge.label}</span></td>
                    <td className="admin-table__date">{formatAdminDate(user.createdAt)}</td>
                    <td>
                      <div className="admin-table__actions">
                        <button className="admin-icon-button" aria-label="Edit user" title="Edit" onClick={() => onEdit(user)}><Edit2 size={16} /></button>
                        <button className="admin-icon-button admin-icon-button--danger" aria-label="Delete user" title="Delete" onClick={() => onDelete(user)}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default AdminUsersPage;
