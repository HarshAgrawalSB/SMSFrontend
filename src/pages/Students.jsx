import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useConfirmation } from '../context/ConfirmationContext';
import Dropdown from '../components/Dropdown';
import DataTable from '../components/DataTable';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

export default function Students() {
  const { user } = useAuth();
  const { toast } = useNotification();
  const { confirmDialog } = useConfirmation();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const isAdmin = user?.role === 'ADMIN';

  const fetchStudents = async () => {
    try {
      const params = { page, limit };
      if (filterStatus) params.status = filterStatus;
      const res = await axiosInstance.get('/students', { params });
      setStudents(res.data.data || []);
      setTotal(res.data.total ?? 0);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchStudents();
  }, [filterStatus, page]);

  const handleCreatePortalUser = async (studentId) => {
    const confirmed = await confirmDialog({
      title: 'Create portal login',
      message: 'Create portal login for this student? Default password will be shown once.',
      confirmLabel: 'Create',
      variant: 'default'
    });
    if (!confirmed) return;
    try {
      const res = await axiosInstance.post(`/students/${studentId}/create-user`);
      const pw = res.data.data?.defaultPassword;
      toast.success(pw ? `Portal account created. Default password: ${pw}` : 'Portal account created.');
      fetchStudents();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create portal user');
    }
  };

  if (loading) {
    return (
      <div className="page-loading">
        <div className="page-loading-spinner" aria-hidden />
        <span style={{ marginLeft: '0.75rem' }}>Loading students…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-alert app-alert-error" role="alert">
        {error}
      </div>
    );
  }

  return (
    <>
      <header className="page-header">
        <h1 className="page-heading">Students</h1>
        <div className="page-actions">
          <Dropdown
            variant="filter"
            fullWidth={false}
            placeholder="All statuses"
            ariaLabel="Filter by status"
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
            options={[
              { value: 'ACTIVE', label: 'Active' },
              { value: 'COMPLETED', label: 'Completed' },
              { value: 'DROPPED', label: 'Dropped' }
            ]}
          />
        </div>
      </header>

      <div className="section-card" style={{ padding: 0, overflow: 'hidden' }}>
        <DataTable
          rows={students}
          getRowKey={(s) => s._id}
          pagination={{ page, limit, total, onPageChange: setPage }}
          empty={{
            message: 'No students found.',
            description: 'Enrolled leads will appear here.'
          }}
          columns={[
            { key: 'name', header: 'Name', cell: (s) => `${s.firstName} ${s.lastName}` },
            { key: 'email', header: 'Email', cell: (s) => s.email },
            { key: 'program', header: 'Program', cell: (s) => s.programId?.name || '—' },
            { key: 'enrollmentDate', header: 'Enrollment Date', cell: (s) => (s.enrollmentDate ? new Date(s.enrollmentDate).toLocaleDateString() : '—') },
            { key: 'advisor', header: 'Advisor', cell: (s) => s.enrollmentAdvisor?.name || '—' },
            {
              key: 'status',
              header: 'Status',
              cell: (s) => (
                <span className={`badge badge-${s.status === 'ACTIVE' ? 'active' : 'inactive'}`}>
                  {s.status}
                </span>
              )
            },
            ...(isAdmin ? [{
              key: 'portal',
              header: 'Portal',
              cell: (s) => (
                s.userId ? (
                  <span className="text-muted" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Has account</span>
                ) : (
                  <button type="button" className="btn btn-primary-app" onClick={() => handleCreatePortalUser(s._id)}>
                    <PersonAddAltOutlinedIcon fontSize="small" />
                    Create login
                  </button>
                )
              )
            }] : [])
          ]}
        />
      </div>
    </>
  );
}
