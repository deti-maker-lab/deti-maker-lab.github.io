import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

// Custom inline SVG Icons to keep bundles lightweight and clean
function IconGithub() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function IconBook() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>
  );
}

function IconPlay() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  );
}

function IconCheck() {
  return (
    <svg className={styles.checkIcon} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

function IconX() {
  return (
    <svg className={styles.xIcon} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}

function IconLayers() {
  return (
    <svg className={styles.moduleIcon} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
      <polyline points="2 17 12 22 22 17"></polyline>
      <polyline points="2 12 12 17 22 12"></polyline>
    </svg>
  );
}

function IconShoppingBag() {
  return (
    <svg className={styles.moduleIcon} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
  );
}

function IconSync() {
  return (
    <svg className={styles.moduleIcon} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
  );
}

function IconShield() {
  return (
    <svg className={styles.moduleIcon} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  );
}

function IconHistory() {
  return (
    <svg className={styles.moduleIcon} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
      <path d="M12 2a10 10 0 0 0-9.87 8.2h2.2"></path>
    </svg>
  );
}

function IconSmartphone() {
  return (
    <svg className={styles.moduleIcon} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
      <line x1="12" y1="18" x2="12.01" y2="18"></line>
    </svg>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      {/* Background radial effects */}
      <div className={styles.heroGlowLeft} />
      <div className={styles.heroGlowRight} />
      <div className={styles.gridBg} />

      <div className="container">
        <div className={styles.heroSplit}>
          {/* Left Column: Core Value Proposition */}
          <div className={styles.heroLeft}>
            <div className={styles.badgePill}>
              <span className={styles.pulseDot} />
              DETI Maker Lab Platform
            </div>
            <Heading as="h1" className={styles.heroTitle}>
              Project-based equipment requisitions, <span className={styles.highlightText}>connected to real inventory.</span>
            </Heading>
            <p className={styles.heroSubtitle}>
              A unified system for students, technicians, and supervisors to manage projects, requests, approvals, assignments, and returns.
            </p>
            <div className={styles.buttonsGroup}>
              <a className="button button--primary button--lg" href="#demo-video">
                <IconPlay /> Watch Demo
              </a>
              <Link className="button button--secondary button--lg" to="/docs/intro">
                <IconBook /> Read Documentation
              </Link>
              <a
                className={clsx('button button--secondary button--lg', styles.githubBtn)}
                href="https://github.com/deti-maker-lab"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconGithub /> GitHub
              </a>
            </div>
          </div>

          {/* Right Column: HTML/CSS Mockup of control dashboard */}
          <div className={styles.heroRight}>
            <div className={styles.dashboardMockup}>
              {/* Window Header */}
              <div className={styles.mockupHeader}>
                <div className={styles.mockupDots}>
                  <span className={styles.dotRed} />
                  <span className={styles.dotYellow} />
                  <span className={styles.dotGreen} />
                </div>
                <div className={styles.mockupTitle}>makerlab-dashboard</div>
                <div className={styles.mockupSpacer} />
              </div>

              {/* Realistic App Layout */}
              <div className={styles.mockupContainer}>
                {/* Left Sidebar */}
                <div className={styles.mockupSidebar}>
                  <div className={styles.mockupSidebarLogo}>
                    <span className={styles.logoDeti}>DETI</span>
                    <span className={styles.logoMaker}> Maker Lab</span>
                  </div>
                  <nav className={styles.mockupSidebarNav}>
                    <div className={clsx(styles.sidebarNavItem, styles.sidebarNavItemActive)}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                      <span>Dashboard</span>
                    </div>
                    <div className={styles.sidebarNavItem}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                      <span>Projects</span>
                    </div>
                    <div className={styles.sidebarNavItem}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                      <span>Equipment</span>
                    </div>
                    <div className={styles.sidebarNavItem}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
                      <span>Users</span>
                    </div>
                    <div className={styles.sidebarNavItem}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                      <span>Stats</span>
                    </div>
                    <div className={styles.sidebarNavItem}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                      <span>Ledger</span>
                    </div>
                  </nav>
                </div>

                {/* Right Content Frame */}
                <div className={styles.mockupContent}>
                  {/* Mini Header / Lang Select */}
                  <div className={styles.mockupContentTopbar}>
                    <span className={styles.topbarLang}>EN</span>
                    <span className={styles.topbarLogin}>Login</span>
                  </div>

                  {/* Search Console */}
                  <div className={styles.mockupAppHeader}>
                    <div className={styles.appTitle}>
                      <span className={styles.logoDeti}>DETI</span>
                      <span className={styles.logoMaker}> Maker Lab</span>
                    </div>
                    <p className={styles.appSubtitle}>Your lab management platform. Search anything.</p>

                    <div className={styles.mockupSearchWrapper}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={styles.searchIcon}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                      <span className={styles.searchPlaceholder}>Search projects, equipment...</span>
                    </div>
                  </div>

                  {/* 2x2 Stats Grid */}
                  <div className={styles.mockupDashboardGrid}>
                    <div className={styles.dashboardStatCard}>
                      <span className={styles.dashStatVal}>27</span>
                      <span className={styles.dashStatLabel}>Active Projects</span>
                    </div>
                    <div className={styles.dashboardStatCard}>
                      <span className={styles.dashStatVal}>289</span>
                      <span className={styles.dashStatLabel}>Available Equip.</span>
                    </div>
                    <div className={styles.dashboardStatCard}>
                      <span className={styles.dashStatVal}>120</span>
                      <span className={styles.dashStatLabel}>Lab Members</span>
                    </div>
                    <div className={styles.dashboardStatCard}>
                      <span className={styles.dashStatVal}>9</span>
                      <span className={styles.dashStatLabel}>Checked Out</span>
                    </div>
                  </div>

                  {/* Recent Projects Grid */}
                  <div className={styles.mockupRecentProjects}>
                    <div className={styles.recentProjectsTitle}>Recent Projects</div>
                    <div className={styles.mockupProjectsGrid}>
                      <div className={styles.mockupProjectCard}>
                        <div className={clsx(styles.projectThumb, styles.thumbGradient1)} />
                        <div className={styles.projectInfo}>
                          <span className={styles.mockupProjectTitle}>Smart Irrigation</span>
                          <span className={clsx(styles.projectBadge, styles.badgeActive)}>Active</span>
                        </div>
                      </div>
                      <div className={styles.mockupProjectCard}>
                        <div className={clsx(styles.projectThumb, styles.thumbGradient2)} />
                        <div className={styles.projectInfo}>
                          <span className={styles.mockupProjectTitle}>Delivery Rover</span>
                          <span className={clsx(styles.projectBadge, styles.badgePending)}>Pending</span>
                        </div>
                      </div>
                      <div className={styles.mockupProjectCard}>
                        <div className={clsx(styles.projectThumb, styles.thumbGradient3)} />
                        <div className={styles.projectInfo}>
                          <span className={styles.mockupProjectTitle}>Air Quality</span>
                          <span className={clsx(styles.projectBadge, styles.badgeActive)}>Active</span>
                        </div>
                      </div>
                      <div className={styles.mockupProjectCard}>
                        <div className={clsx(styles.projectThumb, styles.thumbGradient4)} />
                        <div className={styles.projectInfo}>
                          <span className={styles.mockupProjectTitle}>Smart Door Lock</span>
                          <span className={clsx(styles.projectBadge, styles.badgeCompleted)}>Completed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Bottom Tab Menu */}
                <div className={styles.mockupMobileNav}>
                  <div className={clsx(styles.mobileNavItem, styles.mobileNavItemActive)}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                    <span>Home</span>
                  </div>
                  <div className={styles.mobileNavItem}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                    <span>Projects</span>
                  </div>
                  <div className={styles.mobileNavItem}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                    <span>Items</span>
                  </div>
                  <div className={styles.mobileNavItem}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
                    <span>Profile</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function ProblemSolutionSection() {
  return (
    <section className={styles.problemSolutionSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">From scattered workflows to structured lab operations</Heading>
          <p>We replaced manual files and untraceable approvals with a robust digital custody system.</p>
        </div>

        <div className={styles.problemSolutionGrid}>
          {/* BEFORE CARD */}
          <div className={clsx(styles.psCard, styles.beforeCard)}>
            <div className={styles.psCardHeader}>
              <span className={styles.psBadgeBefore}>Outdated process</span>
              <Heading as="h3">The old scattered way</Heading>
            </div>
            <ul className={styles.psList}>
              <li>
                <IconX />
                <div>
                  <strong>Wiki-based process:</strong>
                  <p>Decentralized project documentation with layout inconsistency.</p>
                </div>
              </li>
              <li>
                <IconX />
                <div>
                  <strong>Markdown project creation:</strong>
                  <p>Manually editing markdown files which are prone to format errors.</p>
                </div>
              </li>
              <li>
                <IconX />
                <div>
                  <strong>Hard-to-track equipment:</strong>
                  <p>Spreadsheet logs that quickly fall out of sync with actual hardware.</p>
                </div>
              </li>
              <li>
                <IconX />
                <div>
                  <strong>Cumbersome requisitions:</strong>
                  <p>Inconvenient request trails with unclear approval authority.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* AFTER CARD */}
          <div className={clsx(styles.psCard, styles.afterCard)}>
            <div className={styles.psCardHeader}>
              <span className={styles.psBadgeAfter}>Maker Lab Platform</span>
              <Heading as="h3">The Unified Control System</Heading>
            </div>
            <ul className={styles.psList}>
              <li>
                <IconCheck />
                <div>
                  <strong>Structured project forms:</strong>
                  <p>Direct inputs validate user data and initialize proper database structures.</p>
                </div>
              </li>
              <li>
                <IconCheck />
                <div>
                  <strong>Project-based requisitions:</strong>
                  <p>Tie equipment directly to project timelines, groups, and academic courses.</p>
                </div>
              </li>
              <li>
                <IconCheck />
                <div>
                  <strong>Snipe-IT inventory authority:</strong>
                  <p>Real-time sync to the Snipe-IT API keeps availability accurate.</p>
                </div>
              </li>
              <li>
                <IconCheck />
                <div>
                  <strong>Status history & Traceability:</strong>
                  <p>Full database history records every single check-out, handoff, and return.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  const steps = [
    {
      num: '01',
      title: 'Project created',
      desc: 'Form teams, add supervisors, and state objectives.',
    },
    {
      num: '02',
      title: 'Equipment requested',
      desc: 'Select necessary components synced directly with Snipe-IT.',
    },
    {
      num: '03',
      title: 'Technician approves',
      desc: 'Administrators validate availability and approve request logs.',
    },
    {
      num: '04',
      title: 'Item assigned',
      desc: 'Assets checked out to student and linked to the active project.',
    },
    {
      num: '05',
      title: 'Returned',
      desc: 'Physical item handed back; inventory state automatically updates.',
    },
    {
      num: '06',
      title: 'History saved',
      desc: 'Complete lifecycle state archived in the PostgreSQL database.',
    },
  ];

  return (
    <section className={styles.workflowSection}>
      <div className={styles.workflowGlow} />
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">A complete requisition lifecycle</Heading>
          <p>A transparent and automated path designed to save administrative time and trace assets.</p>
        </div>

        <div className={styles.workflowContainer}>
          {steps.map((step, idx) => (
            <div className={styles.workflowStepCard} key={idx}>
              <div className={styles.workflowNumBadge}>{step.num}</div>
              <Heading as="h4">{step.title}</Heading>
              <p>{step.desc}</p>
              {idx < steps.length - 1 && <div className={styles.workflowConnectorLine} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformModulesSection() {
  const modules = [
    {
      icon: <IconLayers />,
      title: 'Projects & Groups',
      desc: 'Organize student groups, link supervisors, and maintain clear records of development scope.',
    },
    {
      icon: <IconShoppingBag />,
      title: 'Equipment requisitions',
      desc: 'Search, filter, and request sensors, boards, and tools with a simple cart checkout interface.',
    },
    {
      icon: <IconSync />,
      title: 'Inventory Sync',
      desc: 'Synchronized with the Snipe-IT ITAM system, guaranteeing correct serial number assignments.',
    },
    {
      icon: <IconShield />,
      title: 'Authentication & Roles',
      desc: 'Integrated with University SSO to auto-authenticate users as Students, Technicians, or Admins.',
    },
    {
      icon: <IconHistory />,
      title: 'Traceability',
      desc: 'Every state transition is audited and logged, preventing lost lab components.',
    },
    {
      icon: <IconSmartphone />,
      title: 'Mobile Access',
      desc: 'Dedicated companion apps for iOS and Android support remote inventory querying on the go.',
    },
  ];

  return (
    <section className={styles.modulesSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">Everything the lab workflow needs</Heading>
          <p>Our platform handles all components of project tracking and physical resource distribution.</p>
        </div>

        <div className={styles.modulesGrid}>
          {modules.map((m, idx) => (
            <div className={styles.moduleCard} key={idx}>
              <div className={styles.moduleIconContainer}>{m.icon}</div>
              <Heading as="h3">{m.title}</Heading>
              <p>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoVideoSection() {
  return (
    <section className={styles.videoSection} id="demo-video">
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">App demonstration</Heading>
          <p>Watch a quick walkthrough of the DETI Maker Lab system in action.</p>
        </div>

        {/* Browser Showcase Wrapper */}
        <div className={styles.browserShowcase}>
          {/* Top Window Chrome */}
          <div className={styles.browserTopBar}>
            <div className={styles.browserDots}>
              <span className={styles.dotRed} />
              <span className={styles.dotYellow} />
              <span className={styles.dotGreen} />
            </div>
            <div className={styles.browserUrlBar}>deti-maker-lab-demo.mp4</div>
            <div className={styles.browserRightPlaceholder}>
              <span className={styles.badgeShowcase}>SSO Enabled</span>
              <span className={styles.badgeShowcase}>Snipe-IT Synced</span>
            </div>
          </div>

          {/* Video Container */}
          <div className={styles.videoContainer}>
            <div className={styles.videoWrapper}>
              <iframe
                src="https://www.youtube.com/embed/CF30eTuKIjk"
                title="DETI Maker Lab Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          {/* Bottom Badges */}
          <div className={styles.showcaseBadgesRow}>
            <span className={styles.showcaseBadge}>PostgreSQL Backend</span>
            <span className={styles.showcaseBadge}>React Web Console</span>
            <span className={styles.showcaseBadge}>iOS / Android Native Apps</span>
            <span className={styles.showcaseBadge}>Audit Trail Logs</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArchitectureSection() {
  return (
    <section className={styles.architectureSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">Built around clean integrations</Heading>
          <p>The platform aggregates identity, database layers, and active physical asset databases.</p>
        </div>

        <div className={styles.architectureVisual}>
          {/* Node 1: Client Applications */}
          <div className={styles.archNodeCard}>
            <div className={styles.archNodeBadge}>Frontends</div>
            <Heading as="h4">Client applications</Heading>
            <p>React SPA + Native iOS/Android Companion Apps</p>
          </div>

          {/* Connector 1 */}
          <div className={styles.archConnector}>
            <div className={styles.connectorLine} />
            <div className={styles.connectorArrow} />
          </div>

          {/* Node 2: Core Platform API */}
          <div className={clsx(styles.archNodeCard, styles.archNodePrimary)}>
            <div className={clsx(styles.archNodeBadge, styles.primaryNodeBadge)}>Core API Gateway</div>
            <Heading as="h4">MakerLab API</Heading>
            <p>FastAPI backend handling API routes, requisition logic, and SSO/session integration.</p>
          </div>

          {/* Connector 2 */}
          <div className={styles.archConnectorHorizontal}>
            <svg className={styles.connectionSvg} viewBox="0 0 200 120" fill="none">
              <path d="M 0 60 Q 50 60, 100 20 T 200 20" stroke="var(--smart-lab-green)" strokeWidth="2" strokeDasharray="4 4" fill="none" />
              <path d="M 0 60 Q 50 60, 100 60 T 200 60" stroke="var(--smart-lab-accent)" strokeWidth="2" strokeDasharray="4 4" fill="none" />
              <path d="M 0 60 Q 50 60, 100 100 T 200 100" stroke="var(--smart-lab-green)" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            </svg>
          </div>

          {/* Node 3 Group: Systems */}
          <div className={styles.archSystemsColumn}>
            <div className={styles.archSystemItem}>
              <span className={styles.systemDotGreen} />
              <div>
                <strong>PostgreSQL</strong>
                <p>Audits, groups & metadata</p>
              </div>
            </div>
            <div className={styles.archSystemItem}>
              <span className={styles.systemDotCyan} />
              <div>
                <strong>Snipe-IT asset sync</strong>
                <p>Barcoded inventory inventory</p>
              </div>
            </div>
            <div className={styles.archSystemItem}>
              <span className={styles.systemDotGreen} />
              <div>
                <strong>University SSO</strong>
                <p>Identity authority login</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  const milestones = [
    {
      id: 'M1',
      title: 'Inception',
      desc: 'Scope, stakeholders, MVP definition, risks, and initial system architecture drafts.',
      status: 'Completed',
      isActive: false
    },
    {
      id: 'M2',
      title: 'Elaboration',
      desc: 'Feasibility check, functional proof of concept, and SSO authentication tests.',
      status: 'Completed',
      isActive: false
    },
    {
      id: 'M3',
      title: 'Construction',
      desc: 'Functional control panels, full Snipe-IT inventory link, integration tests, and CI/CD pipelines.',
      status: 'Completed',
      isActive: false
    },
    {
      id: 'M4',
      title: 'Transition',
      desc: 'Stabilization, developer documentation, production release preparation, and demonstration.',
      status: 'Active Release',
      isActive: true
    },
  ];

  return (
    <section className={styles.timelineSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">Project evolution</Heading>
          <p>Our milestone checklist to deliver a highly reliable software system.</p>
        </div>

        <div className={styles.progressRail}>
          {milestones.map((m, idx) => (
            <div
              className={clsx(styles.milestoneNode, { [styles.activeMilestoneNode]: m.isActive })}
              key={idx}
            >
              <div className={styles.milestoneHeader}>
                <span className={styles.milestoneId}>{m.id}</span>
                <span className={clsx(styles.statusBadge, { [styles.statusBadgeActive]: m.isActive })}>
                  {m.status}
                </span>
              </div>
              <Heading as="h3">{m.title}</Heading>
              <p>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const team = [
    {
      name: 'Jakub Suliga',
      role: 'Coordinator',
      githubUsername: 'krecikkko',
    },
    {
      name: 'Laura Gabryjańczyk',
      role: 'Tech Lead',
      githubUsername: 'lauragabryjanczyk',
    },
    {
      name: 'João Martins',
      role: 'Backend',
      githubUsername: 'joaodmartins',
    },
    {
      name: 'André Silva',
      role: 'Frontend/UX',
      githubUsername: 'andrecastrosilva',
    },
    {
      name: 'Manuel Mendonça',
      role: 'QA/DevOps',
      githubUsername: 'manu0071212',
    },
    {
      name: 'prof. Diogo Gomes',
      role: 'Supervisor',
      githubUsername: 'dgomes',
    },
  ];

  return (
    <section className={styles.teamSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">Project team</Heading>
          <p>The engineering team behind the DETI Maker Lab system.</p>
        </div>

        <div className={styles.teamGrid}>
          {team.map((member, idx) => {
            const githubUrl = `https://github.com/${member.githubUsername}`;

            return (
              <div className={styles.teamMemberCard} key={idx}>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${member.name}'s GitHub profile`}
                  className={styles.avatarWrapper}
                >
                  <img
                    className={styles.teamAvatar}
                    src={`${githubUrl}.png?size=160`}
                    alt={`${member.name}'s GitHub avatar`}
                    loading="lazy"
                  />
                  <div className={styles.avatarOverlay}>
                    <IconGithub />
                  </div>
                </a>

                <Heading as="h4">{member.name}</Heading>
                <span className={styles.teamRoleBadge}>{member.role}</span>
                <a
                  className={styles.teamGithubLink}
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @{member.githubUsername}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Home"
      description="Information system for managing projects and equipment requisitions at DETI Maker Lab">
      <main className={styles.homeMainContainer}>
        <HomepageHeader />
        <ProblemSolutionSection />
        <WorkflowSection />
        <PlatformModulesSection />
        <DemoVideoSection />
        <ArchitectureSection />
        <TimelineSection />
        <TeamSection />
      </main>
    </Layout>
  );
}
