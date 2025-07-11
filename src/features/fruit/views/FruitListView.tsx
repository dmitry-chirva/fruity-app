import { Collapse, List, Button, Badge } from 'antd';
import { Fruit } from '../../../shared/types/fruit.type';

import styles from '../FruitSection.module.scss';
import { calculateCalories } from '../../../shared/utils/calculate-calories.ts';

type Props = {
  fruitData: Record<string, Fruit[]>;
  onAdd: (f: Fruit) => void;
  onAddAll: (fs: Fruit[]) => void;
  className?: string;
};

export default function FruitListView({ fruitData, onAdd, onAddAll, className }: Props) {
  return (
    <List
      className={className}
      dataSource={Object.entries(fruitData)}
      renderItem={([groupName, fruits]) => (
        <Collapse className={styles.collapsePanel}>
          <Collapse.Panel
            header={
              <div className={styles.collapsePanelHeader}>
                {groupName}
                <Badge count={`${calculateCalories(fruits)} calories`} color="#10AD65" />
              </div>
            }
            key={groupName}
            extra={
              <Button
                type="primary"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddAll(fruits);
                }}
              >
                Add All
              </Button>
            }
          >
            {fruits.map((fruit) => (
              <List.Item key={fruit.name}>
                <div className={styles.fruitListItem}>
                  {fruit.name} ({fruit.nutritions.calories} calories)
                  <Button type="primary" onClick={() => onAdd(fruit)}>
                    Add
                  </Button>
                </div>
              </List.Item>
            ))}
          </Collapse.Panel>
        </Collapse>
      )}
    />
  );
}
