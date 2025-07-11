import { Card, Tabs } from 'antd';
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

export default function FruitSection() {
  const { fruits, selectedGroup, fruitView, setFruitView } = useFruitSlice();
  const { addFruit, addAllFruits } = useJarSlice();

  const grouped =
    selectedGroup === FRUIT_ATTRIBUTE_TYPES.NONE
      ? { ['All fruits']: fruits }
      : groupBy(fruits, selectedGroup.toLowerCase() as keyof Fruit);

  return (
    <Card
      className={styles.fruitSection}
      title={
        <header className={styles.fruitHeader}>
          <h2>Fruits</h2>
          <GroupByFruitAttribute />
        </header>
      }
    >
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
    </Card>
  );
}
