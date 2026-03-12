import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { getLeadStatusLabel } from '../constants/leadStatus';
import EmptyState from '../components/EmptyState';
import DataTable from '../components/DataTable';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

export default function Dashboard() {
  const [stats, setStats] = useState({ leads: 0, students: 0, programs: 0 });
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const [leadsRes, studentsRes, programsRes] = await Promise.all([
          axiosInstance.get('/leads'),
          axiosInstance.get('/students'),
          axiosInstance.get('/programs')
        ]);
        setStats({
          leads: leadsRes.data.count ?? leadsRes.data.data?.length ?? 0,
          students: studentsRes.data.count ?? studentsRes.data.data?.length ?? 0,
          programs: programsRes.data.count ?? programsRes.data.data?.length ?? 0
        });
        const leads = leadsRes.data.data || [];
        setRecentLeads(leads.slice(0, 5));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="page-loading">
        <div className="page-loading-spinner" aria-hidden />
        <span style={{ marginLeft: '0.75rem' }}>Loading dashboard…</span>
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
        <h1 className="page-heading">Dashboard</h1>
      </header>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-card-icon" aria-hidden>
            <GroupsOutlinedIcon />
          </div>
          <div className="stat-label">Total Leads</div>
          <div className="stat-value">{stats.leads}</div>
          <Link to="/leads" className="btn btn-ghost-app">
            View leads <ArrowForwardRoundedIcon fontSize="small" />
          </Link>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon" aria-hidden>
            <SchoolOutlinedIcon />
          </div>
          <div className="stat-label">Enrolled Students</div>
          <div className="stat-value">{stats.students}</div>
          <Link to="/students" className="btn btn-ghost-app">
            View students <ArrowForwardRoundedIcon fontSize="small" />
          </Link>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon" aria-hidden>
            <MenuBookOutlinedIcon />
          </div>
          <div className="stat-label">Programs</div>
          <div className="stat-value">{stats.programs}</div>
          <Link to="/programs" className="btn btn-ghost-app">
            View programs <ArrowForwardRoundedIcon fontSize="small" />
          </Link>
        </div>
      </div>

      <section className="section-card">
        <h2 className="section-card-title">Recent Leads</h2>
        {recentLeads.length === 0 ? (
          <EmptyState message="No leads yet." description="New inquiries will appear here.">
            <Link to="/leads" className="btn btn-primary-app">
              View all leads <ArrowForwardRoundedIcon fontSize="small" />
            </Link>
          </EmptyState>
        ) : (
          <DataTable
            rows={recentLeads}
            getRowKey={(lead) => lead._id}
            columns={[
              { key: 'name', header: 'Name', cell: (lead) => `${lead.firstName} ${lead.lastName}` },
              { key: 'email', header: 'Email', cell: (lead) => lead.email },
              {
                key: 'status',
                header: 'Status',
                cell: (lead) => (
                  <span className={`badge badge-${lead.status === 'ENROLLED' ? 'enrolled' : lead.status === 'LOST' ? 'lost' : 'new'}`}>
                    {getLeadStatusLabel(lead.status)}
                  </span>
                )
              },
              { key: 'program', header: 'Program', cell: (lead) => lead.interestedProgram?.name || '—' }
            ]}
          />
        )}
        <div className="section-card-actions">
          <Link to="/leads" className="btn btn-primary-app">
            All leads <ArrowForwardRoundedIcon fontSize="small" />
          </Link>
        </div>
      </section>
    </>
  );
}
