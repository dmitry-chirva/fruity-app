import React from 'react';
import { Spin } from 'antd';

import styles from './Spinner.module.scss';

type SpinnerProps = {
    size?: 'small' | 'default' | 'large';
};

const Spinner: React.FC<SpinnerProps> = ({ size = 'default' }) => (
    <div className={`${styles.spinnerContainer} ${styles[size]}`}>
        <Spin size={size} />
    </div>
);

export default Spinner;
