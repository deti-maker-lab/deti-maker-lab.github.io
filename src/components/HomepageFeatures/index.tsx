import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

import UnifiedSystemSvg from '@site/static/img/unified-system.svg';
import SmartInventorySvg from '@site/static/img/smart-inventory.svg';
import MobileAccessSvg from '@site/static/img/mobile-access.svg';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Unified Information System',
    Svg: UnifiedSystemSvg,
    description: (
      <>
        Connecting projects, groups, students, and equipment requisitions in one centralized platform, 
        making project creation consistent and database-ready.
      </>
    ),
  },
  {
    title: 'Smart Inventory & Requisitions',
    Svg: SmartInventorySvg,
    description: (
      <>
        Seamlessly integrated with Snipe-IT. Enjoy a simple, repeatable workflow for requesting 
        equipment while keeping the lab's inventory perfectly synced.
      </>
    ),
  },
  {
    title: 'Mobile Accessibility',
    Svg: MobileAccessSvg,
    description: (
      <>
        Manage your electronics, telecommunications, and informatics projects on the go with 
        our dedicated iOS and renewed Android applications.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {/* Render the SVG Component directly */}
        <Svg className={styles.featureSvg} role="img" aria-label={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}