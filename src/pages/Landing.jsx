import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="landing-page">
      <header className="landing-hero">
        <div className="landing-hero-inner container">
          <div className="landing-hero-text">
            <div className="landing-logo">
              <span className="landing-logo-mark" aria-hidden>BRD</span>
              <span className="landing-logo-text">BRD Institute</span>
            </div>
            <h1 className="landing-title">
              From inquiry to enrollment,<br />all in one place.
            </h1>
            <p className="landing-subtitle">
              A modern enrollment workspace for institutes to capture inquiries, follow up with leads,
              and seamlessly convert them into enrolled students.
            </p>
            <div className="landing-cta">
              <Link to="/login" className="btn btn-primary-app">
                Sign in to portal
              </Link>
              <Link to="/lead" className="btn btn-ghost-app">
                Submit inquiry form
              </Link>
            </div>
            <p className="landing-footnote">
              Advisors, management and students all work together in a single, shared system.
            </p>
          </div>
          <div className="landing-hero-visual" aria-hidden>
            <div className="landing-hero-card landing-hero-card-main">
              <div className="landing-hero-stat-label">Active leads</div>
              <div className="landing-hero-stat-value">24</div>
              <div className="landing-hero-stat-pill">Auto-assigned to advisors</div>
            </div>
            <div className="landing-hero-card landing-hero-card-secondary">
              <div className="landing-hero-chip">Student portal</div>
              <div className="landing-hero-chip">Programs &amp; fees</div>
              <div className="landing-hero-chip">Activity timeline</div>
            </div>
          </div>
        </div>
      </header>

      <main className="landing-main">
        <section className="landing-section">
          <div className="container">
            <h2 className="landing-section-title">Why this portal?</h2>
            <p className="landing-section-intro">
              BRD Institute&apos;s enrollment portal gives your team a clear view of every student journey,
              from the first phone call to final enrollment.
            </p>
            <div className="landing-feature-grid">
              <div className="landing-feature">
                <h3 className="landing-feature-title">Centralised lead management</h3>
                <p className="landing-feature-body">
                  Capture all inquiries in one place, assign them to advisors, and track progress with clear, simple statuses.
                </p>
              </div>
              <div className="landing-feature">
                <h3 className="landing-feature-title">Student records that stay in sync</h3>
                <p className="landing-feature-body">
                  When a lead is enrolled, a student profile is created automatically, keeping programs, contacts and history together.
                </p>
              </div>
              <div className="landing-feature">
                <h3 className="landing-feature-title">Programs at a glance</h3>
                <p className="landing-feature-body">
                  View available programs, durations and fees so advisors can recommend the right option during every conversation.
                </p>
              </div>
              <div className="landing-feature">
                <h3 className="landing-feature-title">Roles for every team member</h3>
                <p className="landing-feature-body">
                  Admin, advisor, management and student views are tailored so each person only sees what they need to do their job.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-section landing-section-muted">
          <div className="container landing-two-column">
            <div>
              <h2 className="landing-section-title">How it fits into your day</h2>
              <ul className="landing-list">
                <li><span>Advisors</span> start their day in the leads list, follow up with inquiries, and enrol students in a few clicks.</li>
                <li><span>Management</span> monitors leads and student numbers on the dashboard to understand performance.</li>
                <li><span>Students</span> access the portal to view their program information and stay connected.</li>
              </ul>
            </div>
            <div className="landing-card">
              <h3>Ready to get started?</h3>
              <p>
                If you are part of the BRD Institute team, sign in to manage leads and students.
                New prospects can use the inquiry form to share their details.
              </p>
              <div className="landing-card-actions">
                <Link to="/login" className="btn btn-primary-app">
                  Go to login
                </Link>
                <Link to="/lead" className="btn btn-ghost-app">
                  Open inquiry form
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

