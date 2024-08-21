import React, { useMemo } from 'react';
import { Button, List } from 'antd';

import { useFruitsStore } from '../../store/fruitsStore';

import styles from './Jar.module.scss';

const Jar: React.FC = () => {
    const jar = useFruitsStore((state) => state.jar);
    const removeJarById = useFruitsStore((state) => state.removeJarById);
    const clearJar = useFruitsStore((state) => state.clearJar);

    const totalCalories = useMemo(() => jar.reduce((sum, fruit) => sum + (fruit.nutritions.calories || 0), 0), [jar]);

    return (
        <div className={styles.jar}>
            <header className={styles.jarHeader}>
                <h2>Jar</h2>
                {!!jar.length && (
                    <Button danger
                            type='primary'
                            onClick={() => clearJar()}>
                        Remove All
                    </Button>
                )}
            </header>
            <List
                bordered
                dataSource={jar}
                renderItem={(fruit) => (
                    <List.Item actions={[
                        <Button size='small'
                                type='primary'
                                danger
                                onClick={() => removeJarById(fruit.id)}>
                            Delete
                        </Button>
                    ]}>
                        {fruit.name} ({fruit.nutritions.calories} calories)
                    </List.Item>
                )}
            />
            <div className={styles.totalCalories}>Total Calories: {totalCalories}</div>
        </div>
    );
};

export default Jar;
