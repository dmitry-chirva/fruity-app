import React, { useMemo } from 'react';
import { Button, Card, Tabs } from 'antd';

import { useJarSlice } from '../../store/jar.slice.ts';

import styles from './Jar.module.scss';
import { calculateCalories } from '../../shared/utils/calculate-calories.ts';
import { JarViewMode } from '../../shared/enums/jar.enum.ts';
import JarListView from './views/JarListView.tsx';
import JarPieView from './views/JarPieView.tsx';

const Jar: React.FC = () => {
  const { jar, jarView, setJarView, removeFruit, clearAllFruits } = useJarSlice();

  const totalCalories = useMemo(() => calculateCalories(jar), [jar]);

  return (
    <Card
      className={styles.jar}
      title={
        <header className={styles.jarHeader}>
          <h2>Jar</h2>
          {!!jar.length && (
            <Button danger type="primary" onClick={() => clearAllFruits()}>
              Remove All
            </Button>
          )}
        </header>
      }
    >
      <Tabs
        size="small"
        activeKey={jarView}
        onChange={(groupKey) => setJarView(groupKey as JarViewMode)}
        items={[
          {
            key: JarViewMode.List,
            label: JarViewMode.List,
            children: <JarListView jar={jar} removeFruit={removeFruit} />,
          },
          {
            key: JarViewMode.Pie,
            label: JarViewMode.Pie,
            children: <JarPieView jar={jar} />,
          },
        ]}
      />
      <div className={styles.totalCalories}>Total Calories: {totalCalories}</div>
    </Card>
  );
};

export default Jar;
