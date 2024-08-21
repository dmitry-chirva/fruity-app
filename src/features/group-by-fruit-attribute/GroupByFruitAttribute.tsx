import React from 'react';

import { Select } from 'antd';

import { useFruitsStore } from '../../store/fruitsStore';
import { FRUIT_ATTRIBUTE_TYPES } from '../../shared/constants/fruit-attribute-types';

const GroupByFruitAttribute: React.FC = () => {
    const setSelectedGroup = useFruitsStore((state) => state.setSelectedGroup);

    const handleGroupChange = (selectedValue: string) => {
        setSelectedGroup(selectedValue);
    }

    return (
        <Select defaultValue={FRUIT_ATTRIBUTE_TYPES.NONE} onChange={handleGroupChange} style={{ width: 200 }}>
            {Object.values(FRUIT_ATTRIBUTE_TYPES).map(option => (
                <Select.Option key={option} value={option}>{option}</Select.Option>
            ))}
        </Select>
    )
};

export default GroupByFruitAttribute;
