import { List, Button } from 'antd';
import { Fruit } from '../../../shared/types/fruit.type';

import styles from '../Jar.module.scss';

type Props = {
  jar: Fruit[];
  removeFruit: (uid: string) => void;
  className?: string;
};

export default function JarListView({ jar, removeFruit, className }: Props) {
  return (
    <div className={styles.jarList}>
      <List
        className={className}
        bordered
        dataSource={jar}
        renderItem={(fruit) => (
          <List.Item
            className={styles.jarListItem}
            actions={[
              <Button size="small" type="primary" danger onClick={() => removeFruit(fruit.uid!)}>
                Delete
              </Button>,
            ]}
          >
            {fruit.name} ({fruit.nutritions.calories} calories)
          </List.Item>
        )}
      />
    </div>
  );
}
