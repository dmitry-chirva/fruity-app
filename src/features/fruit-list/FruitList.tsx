import React from 'react';

import { List, Button, Collapse } from 'antd';
import { useFruitsStore } from '../../store/fruitsStore';
import { groupBy } from '../../shared/utils/group-by';
import { Fruit } from '../../shared/types/fruit.type';

import styles from './FruitList.module.scss';
import { FRUIT_ATTRIBUTE_TYPES } from '../../shared/constants/fruit-attribute-types';

const FruitList: React.FC = () => {
    const fruits = useFruitsStore((state) => state.fruits);
    const selectedGroup = useFruitsStore((state) => state.selectedGroup);
    const addAllToJar = useFruitsStore((state) => state.addAllToJar);
    const addToJar = useFruitsStore((state) => state.addToJar);

    const groupedFruits = selectedGroup === FRUIT_ATTRIBUTE_TYPES.NONE
        ? {
            [FRUIT_ATTRIBUTE_TYPES.NONE]: fruits
          }
        : groupBy(fruits, selectedGroup.toLowerCase() as keyof Fruit);

    return (
        <List
            className={styles.fruitList}
            header={<h1>Fruits</h1>}
            bordered
            dataSource={Object.entries(groupedFruits)}
            renderItem={([key, fruits]) => (
                <Collapse className={styles.collapsePanel}>
                    <Collapse.Panel header={key} key={key} extra={
                        <Button type="primary" size="small" onClick={(e) => {
                            e.stopPropagation();
                            addAllToJar(fruits);
                        }}>Add All</Button>
                    }>
                        {fruits.map((fruit) => (
                            <List.Item key={fruit.name}>
                                <div className={styles.fruitItem}>
                                    {fruit.name} ({fruit.nutritions.calories} calories)
                                    <Button type="primary" onClick={() => addToJar(fruit)}>Add</Button>
                                </div>
                            </List.Item>
                        ))}
                    </Collapse.Panel>
                </Collapse>
            )}
        />
    );
};

export default FruitList;
