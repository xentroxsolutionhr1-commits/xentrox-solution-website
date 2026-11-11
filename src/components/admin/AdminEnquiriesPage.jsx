import { useState } from 'react';
import {
  Calendar, Check, CheckCheck, Eye, LoaderCircle, Mail,
  MailOpen, Phone, Search, Sparkles, Trash2, User, X,
} from 'lucide-react';
import { formatAdminDate } from './adminApi.js';

function AdminEnquiriesPage({ enquiries, loading, onMarkRead, onDelete, activeEnquiry, onCloseActiveEnquiry }) {
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all' | 'unread' | 'read'
  const [search, setSearch] = useState('');

  const currentModalEnquiry = selectedEnquiry || activeEnquiry;

  const handleOpenEnquiry = (enquiry) => {
    setSelectedEnquiry(enquiry);
    if (!enquiry.isRead && onMarkRead) {
      onMarkRead(enquiry);
    }
  };

  const handleClose = () => {
    setSelectedEnquiry(null);
    if (onCloseActiveEnquiry) onCloseActiveEnquiry();
  };

  const filteredEnquiries = enquiries.filter((item) => {
    if (filter === 'unread' && item.isRead) return false;
    if (filter === 'read' && !item.isRead) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = item.name?.toLowerCase().includes(q);
      const matchEmail = item.email?.toLowerCase().includes(q);
      const matchPhone = item.phone?.toLowerCase().includes(q);
      const matchMsg = item.message?.toLowerCase().includes(q);
      const matchService = item.service?.toLowerCase().includes(q);
      return matchName || matchEmail || matchPhone || matchMsg || matchService;
    }
    return true;
  });

  const unreadCount = enquiries.filter((e) => !e.isRead).length;

  return (
    <section className="admin-table-section">
      {/* Top Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'all'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            onClick={() => setFilter('all')}
          >
            All Queries ({enquiries.length})
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              filter === 'unread'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            onClick={() => setFilter('unread')}
          >
            <span>Unread</span>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'read'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            onClick={() => setFilter('read')}
          >
            Read ({enquiries.length - unreadCount})
          </button>
        </div>

        <div className="relative min-w-[240px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search queries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      {loading ? (
        <div className="admin-loading"><LoaderCircle className="admin-spin" size={21} /> Loading customer queries…</div>
      ) : filteredEnquiries.length === 0 ? (
        <div className="admin-empty">
          <span><Sparkles size={28} /></span>
          <strong>{search ? 'No matching queries found' : 'No enquiries yet'}</strong>
          <p>
            {search
              ? 'Try adjusting your search keywords or filter.'
              : 'Enquiries submitted from your website Contact and Enrollment forms will appear here in real-time.'}
          </p>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '28px' }}></th>
                <th>Client Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Service / Track</th>
                <th>Message / Goals</th>
                <th>Submitted On</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEnquiries.map((enquiry) => (
                <tr
                  key={enquiry.id}
                  className={`cursor-pointer transition-colors ${!enquiry.isRead ? 'admin-table__row--unread' : ''}`}
                  onClick={() => handleOpenEnquiry(enquiry)}
                >
                  <td>
                    <span
                      className={`admin-read-dot ${enquiry.isRead ? 'admin-read-dot--read' : 'admin-read-dot--unread'}`}
                      title={enquiry.isRead ? 'Read' : 'New unread query'}
                    />
                  </td>
                  <td>
                    <strong className="text-slate-900 block">{enquiry.name}</strong>
                  </td>
                  <td>
                    <a
                      href={`mailto:${enquiry.email}`}
                      className="admin-link text-xs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {enquiry.email}
                    </a>
                  </td>
                  <td className="text-xs text-slate-600">
                    {enquiry.phone ? (
                      <a
                        href={`tel:${enquiry.phone}`}
                        className="hover:underline text-slate-700"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {enquiry.phone}
                      </a>
                    ) : '—'}
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
                    <div
                      className="admin-table__actions"
                      style={{ justifyContent: 'flex-end' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        className="admin-icon-button"
                        aria-label="View Query Details"
                        title="View Details"
                        onClick={() => handleOpenEnquiry(enquiry)}
                      >
                        <Eye size={16} />
                      </button>
                      {!enquiry.isRead && (
                        <button
                          type="button"
                          className="admin-icon-button admin-icon-button--success"
                          aria-label="Mark as read"
                          title="Mark as read"
                          onClick={() => onMarkRead(enquiry)}
                        >
                          <MailOpen size={16} />
                        </button>
                      )}
                      <button
                        type="button"
                        className="admin-icon-button admin-icon-button--danger"
                        aria-label="Delete enquiry"
                        title="Delete query"
                        onClick={() => onDelete(enquiry)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Query Detail Modal */}
      {currentModalEnquiry && (
        <div
          className="admin-modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <div className="admin-modal" role="dialog" aria-modal="true" style={{ maxWidth: '580px' }}>
            <div className="admin-modal__header">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                  <Mail size={18} />
                </span>
                <h2 className="text-lg font-bold text-slate-900">Customer Query Details</h2>
              </div>
              <button
                type="button"
                className="admin-icon-button"
                aria-label="Close"
                onClick={handleClose}
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 py-2">
              {/* Status Header Bar */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block w-2.5 h-2.5 rounded-full ${
                      currentModalEnquiry.isRead ? 'bg-slate-400' : 'bg-emerald-500 animate-pulse'
                    }`}
                  />
                  <span className="text-xs font-semibold text-slate-700">
                    Status: {currentModalEnquiry.isRead ? 'Reviewed / Read' : 'New / Unread'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar size={13} />
                  <span>{formatAdminDate(currentModalEnquiry.createdAt)}</span>
                </div>
              </div>

              {/* Sender Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl border border-slate-200 bg-white">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Client Name
                  </span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <User size={14} className="text-slate-500" />
                    <strong className="text-sm text-slate-900">{currentModalEnquiry.name}</strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-white">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Service / Track
                  </span>
                  <div className="mt-1">
                    <span className="admin-badge admin-badge--admin">
                      {currentModalEnquiry.service || 'General Inquiry'}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-white">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Email Address
                  </span>
                  <div className="mt-1">
                    <a
                      href={`mailto:${currentModalEnquiry.email}`}
                      className="text-xs font-medium text-emerald-700 hover:underline flex items-center gap-1"
                    >
                      <Mail size={13} />
                      {currentModalEnquiry.email}
                    </a>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-white">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Phone Number
                  </span>
                  <div className="mt-1 text-xs text-slate-700">
                    {currentModalEnquiry.phone ? (
                      <a
                        href={`tel:${currentModalEnquiry.phone}`}
                        className="hover:underline text-emerald-700 flex items-center gap-1 font-medium"
                      >
                        <Phone size={13} />
                        {currentModalEnquiry.phone}
                      </a>
                    ) : (
                      'Not provided'
                    )}
                  </div>
                </div>
              </div>

              {/* Full Message */}
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Message / Inquiry Content
                </span>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans max-h-60 overflow-y-auto">
                  {currentModalEnquiry.message}
                </div>
              </div>
            </div>

            <div className="admin-modal__actions" style={{ justifyContent: 'space-between' }}>
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${currentModalEnquiry.email}?subject=${encodeURIComponent(`Re: Your inquiry on XentroX Solutions - ${currentModalEnquiry.service || ''}`)}`}
                  className="admin-button admin-button--primary text-xs"
                >
                  <Mail size={14} /> Reply via Email
                </a>
                {currentModalEnquiry.phone && (
                  <a
                    href={`https://wa.me/${currentModalEnquiry.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="admin-button admin-button--secondary text-xs"
                  >
                    WhatsApp
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="admin-button admin-button--delete text-xs"
                  onClick={() => {
                    handleClose();
                    onDelete(currentModalEnquiry);
                  }}
                >
                  <Trash2 size={14} /> Delete
                </button>
                <button
                  type="button"
                  className="admin-button admin-button--secondary text-xs"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminEnquiriesPage;
