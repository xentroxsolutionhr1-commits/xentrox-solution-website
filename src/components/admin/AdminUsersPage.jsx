import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Ellipsis, LoaderCircle, Plus, Search, Trash2, Users } from 'lucide-react';
import { adminInitials, formatAdminDate } from './adminApi.js';

function AdminUsersPage({ users, loading, onCreate, onEdit, onDelete }) {
  const [search, setSearch] = useState('');
  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return users;
    return users.filter((user) => `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(query));
  }, [search, users]);

  return (
    <section className="admin-panel admin-table-panel">
      <div className="admin-table-toolbar">
        <div className="admin-table-toolbar__title"><span className="admin-table-toolbar__count">{users.length}</span><span>team members</span></div>
        <label className="admin-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name, email, or role…" /><kbd>⌘ K</kbd></label>
      </div>
      {loading ? <div className="admin-loading admin-table-loading"><LoaderCircle className="admin-spin" size={21} /> Loading users…</div> : filteredUsers.length === 0 ? (
        <div className="admin-empty"><span><Users size={22} /></span><strong>{users.length ? 'No matching users' : 'No users yet'}</strong><p>{users.length ? 'Try adjusting your search.' : 'Add your first team member to get started.'}</p>{!users.length && <button className="admin-button admin-button--primary" onClick={onCreate}><Plus size={16} /> Add a user</button>}</div>
      ) : (
        <>
          <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>TEAM MEMBER</th><th>ROLE</th><th>DATE ADDED</th><th>STATUS</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td><div className="admin-person"><span className={`admin-avatar admin-avatar--${user.role === 'SUPER_ADMIN' ? 'green' : user.role === 'ADMIN' ? 'lavender' : 'plain'}`}>{adminInitials(user.name)}</span><span><strong>{user.name}</strong><small>{user.email}</small></span></div></td>
                <td><span className={`admin-role-badge admin-role-badge--${user.role.toLowerCase().replace('_', '-')}`}><i />{user.role.replace('_', ' ')}</span></td>
                <td className="admin-table-date">{formatAdminDate(user.createdAt)}</td>
                <td><span className="admin-status"><i /> Active</span></td>
                <td><div className="admin-row-actions"><button className="admin-icon-button" title="Edit user" aria-label={`Edit ${user.name}`} onClick={() => onEdit(user)}><Ellipsis size={18} /></button><button className="admin-icon-button admin-icon-button--danger" title="Delete user" aria-label={`Delete ${user.name}`} onClick={() => onDelete(user)}><Trash2 size={15} /></button></div></td>
              </tr>
            ))}
          </tbody></table></div>
          <div className="admin-table-footer"><span>Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> team members</span><div className="admin-pagination"><button aria-label="Previous page" disabled><ChevronLeft size={16} /></button><button className="admin-pagination__active">1</button><button aria-label="Next page" disabled><ChevronRight size={16} /></button></div></div>
        </>
      )}
    </section>
  );
}

export default AdminUsersPage;
