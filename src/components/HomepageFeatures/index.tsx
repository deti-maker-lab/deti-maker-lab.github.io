import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  // Using 'string' for the image source, as we are using PNGs
  imageSrc: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Unified Information System',
    imageSrc: require('@site/static/img/deti-unified-system.png').default,
    description: (
      <>
        Connecting projects, groups, students, and equipment requisitions in one centralized platform, 
        making project creation consistent and database-ready.
      </>
    ),
  },
  {
    title: 'Smart Inventory & Requisitions',
    imageSrc: require('@site/static/img/deti-smart-inventory.png').default,
    description: (
      <>
        Seamlessly integrated with Snipe-IT. Enjoy a simple, repeatable workflow for requesting 
        equipment while keeping the lab's inventory perfectly synced.
      </>
    ),
  },
  {
    title: 'Mobile Accessibility',
    imageSrc: require('@site/static/img/deti-mobile-access.png').default,
    description: (
      <>
        Manage your electronics, telecommunications, and informatics projects on the go with 
        our dedicated iOS and renewed Android applications.
      </>
    ),
  },
];

function Feature({title, imageSrc, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {/* Using an <img> tag for the PNG images */}
        <img src={imageSrc} className={styles.featureSvg} alt={title} />
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