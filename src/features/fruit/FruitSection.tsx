import { useEffect } from 'react';
import { Card, Tabs, App as AntdApp } from 'antd';
import { useFruitSlice } from '../../store/fruit.slice.ts';
import { FruitViewMode } from '../../shared/enums/fruit.enum.ts';
import FruitListView from './views/FruitListView';
import FruitTableView from './views/FruitTableView';
import styles from './FruitSection.module.scss';
import { FRUIT_ATTRIBUTE_TYPES } from '../../shared/constants/fruit-attribute-types.ts';
import { groupBy } from '../../shared/utils/group-by.ts';
import { Fruit } from '../../shared/types/fruit.type.ts';
import GroupByFruitAttribute from '../group-by-fruit-attribute/GroupByFruitAttribute.tsx';
import { useJarSlice } from '../../store/jar.slice.ts';
import useFetchFruits from '../../api/fruits/useFetchFruits.ts';
import useEffectOnce from '../../shared/hooks/useEffectOnce.ts';
import Spinner from '../../shared/components/Spinner/Spinner.tsx';
import EmptyState from '../../shared/components/EmptyState/EmptyState.tsx';

export default function FruitSection() {
  const { message } = AntdApp.useApp();
  const { fetchFruits, loading, error } = useFetchFruits();
  const { fruits, selectedGroup, fruitView, setFruitView } = useFruitSlice();
  const { addFruit, addAllFruits } = useJarSlice();

  useEffectOnce(() => {
    fetchFruits();
  });

  useEffect(() => {
    if (error) {
      message.error('Failed to fetch fruits. Please try again later.');
    }
  }, [error, message]);

  const handleRetry = () => {
    fetchFruits();
  };

  const grouped =
    selectedGroup === FRUIT_ATTRIBUTE_TYPES.NONE
      ? { ['All fruits']: fruits }
      : groupBy(fruits, selectedGroup.toLowerCase() as keyof Fruit);

  const fruitsContent = (
    <Tabs
      size="small"
      activeKey={fruitView}
      onChange={(groupKey) => setFruitView(groupKey as FruitViewMode)}
      items={[
        {
          key: FruitViewMode.List,
          label: FruitViewMode.List,
          children: (
            <FruitListView
              className={styles.fruitListContainer}
              fruitData={grouped}
              onAdd={addFruit}
              onAddAll={addAllFruits}
            />
          ),
        },
        {
          key: FruitViewMode.Table,
          label: FruitViewMode.Table,
          children: (
            <FruitTableView
              className={styles.fruitListContainer}
              fruitData={grouped}
              onAdd={addFruit}
              onAddAll={addAllFruits}
            />
          ),
        },
      ]}
    />
  );

  return (
    <Card
      className={styles.fruitSection}
      title={
        <header className={styles.fruitHeader}>
          <h2>Fruits</h2>
          {!!fruits.length && <GroupByFruitAttribute />}
        </header>
      }
    >
      {loading ? (
        <Spinner size="small" />
      ) : error ? (
        <EmptyState message="Something whent wrong until fetching fruits" onRetry={handleRetry} />
      ) : (
        fruitsContent
      )}
    </Card>
  );
}
