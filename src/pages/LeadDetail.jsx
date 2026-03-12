import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { LEAD_STATUS_OPTIONS, getLeadStatusLabel } from '../constants/leadStatus';
import Dropdown from '../components/Dropdown';

export default function LeadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { toast } = useNotification();
  const mode = location.state?.mode || 'edit'; // 'assign' | 'edit'
  const assignOnly = mode === 'assign';

  const [lead, setLead] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ status: '', assignedAdvisor: '', notes: '' });

  useEffect(() => {
    const fetch = async () => {
      try {
        const [leadRes, usersRes] = await Promise.all([
          axiosInstance.get(`/leads/${id}`),
          user?.role === 'ADMIN' ? axiosInstance.get('/users') : Promise.resolve({ data: { data: [] } })
        ]);
        setLead(leadRes.data.data);
        setForm({
          status: leadRes.data.data.status,
          assignedAdvisor: leadRes.data.data.assignedAdvisor?._id || leadRes.data.data.assignedAdvisor || '',
          notes: leadRes.data.data.notes || ''
        });
        if (usersRes?.data?.data) setUsers(usersRes.data.data.filter((u) => u.role === 'ADVISOR'));
      } catch (err) {
        setError(err.response?.status === 404 ? 'Lead not found' : err.response?.data?.message || 'Failed to load lead');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id, user?.role]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        assignedAdvisor: form.assignedAdvisor || null
      };
      await axiosInstance.put(`/leads/${id}`, payload);
      toast.success(assignOnly ? 'Advisor assigned.' : 'Lead updated.');
      navigate('/leads');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page-loading">
        <div className="page-loading-spinner" aria-hidden />
        <span style={{ marginLeft: '0.75rem' }}>Loading lead…</span>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="app-alert app-alert-error" role="alert">
        {error || 'Lead not found'}
        <div style={{ marginTop: '1rem' }}>
          <button type="button" className="btn btn-ghost-app" onClick={() => navigate('/leads')}>
            Back to leads
          </button>
        </div>
      </div>
    );
  }

  const isEnrolled = lead.status === 'ENROLLED';
  const canEdit = !isEnrolled && (user?.role === 'ADMIN' || user?.role === 'ADVISOR');
  const advisors = users.filter((u) => u.role === 'ADVISOR');

  return (
    <>
      <header className="page-header">
        <h1 className="page-heading">{assignOnly ? 'Assign advisor' : 'Lead details'}</h1>
        <div className="page-actions">
          <button type="button" className="btn btn-ghost-app" onClick={() => navigate('/leads')}>
            Back to leads
          </button>
        </div>
      </header>

      <div className="section-card">
        <h2 className="section-card-title">Lead information</h2>
        <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.5rem 2rem', margin: 0 }}>
          <dt style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Name</dt>
          <dd style={{ margin: 0 }}>{lead.firstName} {lead.lastName}</dd>
          <dt style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Email</dt>
          <dd style={{ margin: 0 }}>{lead.email}</dd>
          <dt style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Phone</dt>
          <dd style={{ margin: 0 }}>{lead.phone || '—'}</dd>
          <dt style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Program</dt>
          <dd style={{ margin: 0 }}>{lead.interestedProgram?.name || '—'}</dd>
          <dt style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Status</dt>
          <dd style={{ margin: 0 }}>
            <span className={`badge badge-${lead.status === 'ENROLLED' ? 'enrolled' : lead.status === 'LOST' ? 'lost' : 'new'}`}>
              {getLeadStatusLabel(lead.status)}
            </span>
          </dd>
          <dt style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Advisor</dt>
          <dd style={{ margin: 0 }}>{lead.assignedAdvisor?.name || '—'}</dd>
          <dt style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Notes</dt>
          <dd style={{ margin: 0 }}>{lead.notes || '—'}</dd>
        </dl>
      </div>

      {canEdit ? (
        <div className="section-card">
          <h2 className="section-card-title">{assignOnly ? 'Assign advisor' : 'Update lead'}</h2>
          <form onSubmit={handleSave} className="login-form">
            {!assignOnly && (
              <Dropdown
                id="lead-status"
                label="Status"
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                options={LEAD_STATUS_OPTIONS.map((s) => ({ value: s, label: getLeadStatusLabel(s) }))}
              />
            )}
            {user?.role === 'ADMIN' && (
              <Dropdown
                id="lead-advisor"
                label="Advisor"
                placeholder="Unassigned"
                value={form.assignedAdvisor}
                onChange={(e) => setForm((f) => ({ ...f, assignedAdvisor: e.target.value }))}
                options={advisors.map((a) => ({ value: a._id, label: a.name }))}
              />
            )}
            {!assignOnly && (
              <div className="login-field">
                <label htmlFor="lead-notes" className="login-label">Notes</label>
                <input
                  id="lead-notes"
                  type="text"
                  className="login-input"
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  placeholder="Notes…"
                />
              </div>
            )}
            <div className="app-form-actions">
              <button type="submit" className="btn btn-primary-app" disabled={saving}>
                {saving ? 'Saving…' : 'Save'}
              </button>
              <button type="button" className="btn btn-ghost-app" onClick={() => navigate('/leads')}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : isEnrolled ? (
        <div className="section-card">
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Enrolled leads cannot be edited.</p>
        </div>
      ) : null}
    </>
  );
}
