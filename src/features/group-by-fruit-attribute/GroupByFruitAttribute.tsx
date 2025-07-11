import React from 'react';

import { Form, Select } from 'antd';

import { useFruitSlice } from '../../store/fruit.slice.ts';
import { FRUIT_ATTRIBUTE_TYPES } from '../../shared/constants/fruit-attribute-types';

import styles from './GroupByFruitAttribute.module.scss';

const GroupByFruitAttribute: React.FC = () => {
  const setSelectedGroup = useFruitSlice((state) => state.setGroup);

  const handleGroupChange = (selectedValue: string) => {
    setSelectedGroup(selectedValue);
  };

  return (
    <Form layout="horizontal">
      <Form.Item className={styles.formItem} label="Group by">
        <Select
          defaultValue={FRUIT_ATTRIBUTE_TYPES.NONE}
          onChange={handleGroupChange}
          style={{ width: 200 }}
        >
          {Object.values(FRUIT_ATTRIBUTE_TYPES).map((option) => (
            <Select.Option key={option} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default GroupByFruitAttribute;
