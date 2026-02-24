import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          DETI Maker Lab
        </Heading>
        <p className={styles.heroSubtitle}>
          The central information system for projects, groups, and equipment requisitions at DETI.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/intro">
            Explore the Documentation
          </Link>
        </div>
      </div>
    </header>
  );
}

function AboutSection() {
  return (
    <section className={styles.aboutSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">About the Project</Heading>
          <p>From Markdown chaos to a structured database.</p>
        </div>
        <div className="row">
          <div className="col col--8 col--offset-2 text--center">
            <p className={styles.aboutDescription}>
              DETI Maker Lab streamlines how students and lab staff manage their initiatives. 
              The main goal is to replace inconvenient requisitions and the outdated Markdown-based system with a modern, unified environment. 
              With Snipe-IT inventory system integration and mobile app support (Android and iOS), 
              equipment requisition becomes seamless and fully controlled at every stage of the project lifecycle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  const milestones = [
    { id: 'M1', title: 'Inception', desc: 'Scope, stakeholders, MVP, risks, and initial architecture.' },
    { id: 'M2', title: 'Elaboration', desc: 'Feasibility check, proof of concept, and SSO + Snipe-IT integration.' },
    { id: 'M3', title: 'Construction', desc: 'Working system, full integration, tests, and Continuous Integration (CI).' },
    { id: 'M4', title: 'Transition', desc: 'Stabilization, documentation, production deployment, and demo presentation.' },
  ];

  return (
    <section className={styles.timelineSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">Project Timeline</Heading>
          <p>Our path to the goal following the OpenUP methodology.</p>
        </div>
        <div className={styles.timelineGrid}>
          {milestones.map((m, idx) => (
            <div className={styles.timelineCard} key={idx}>
              <div className={styles.timelineId}>{m.id}</div>
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
    { name: 'Andre Silva', role: 'Frontend/UX' },
    { name: 'Manuel Mendonça', role: 'QA/DevOps' },
    { name: 'Joao Martins', role: 'Backend' },
    { name: 'Jakub Suliga', role: 'Coordinator' },
    { name: 'Laura Gabryjańczyk', role: 'Tech Lead' },
];
  
  return (
    <section className={styles.teamSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">Project Team</Heading>
          <p>The people behind the platform development.</p>
        </div>
        <div className={styles.teamGrid}>
          {team.map((member, idx) => (
            <div className={styles.teamMember} key={idx}>
              <div className={styles.avatarPlaceholder}>
                {member.name.charAt(0)}
              </div>
              <Heading as="h4">{member.name}</Heading>
              <p className={styles.teamRole}>{member.role}</p>
            </div>
          ))}
        </div>
        <div className="text--center margin-top--lg">
          <p><strong>Supervisor:</strong> prof. Diogo Gomes</p>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Home"
      description="Information system for managing projects at DETI Maker Lab">
      <HomepageHeader />
      <main>
        <AboutSection />
        <HomepageFeatures />
        <TimelineSection />
        <TeamSection />
      </main>
    </Layout>
  );
}