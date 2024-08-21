import React from 'react';
import { Empty, Button } from 'antd';

import styles from './EmptyState.module.scss';

type EmptyStateProps = {
    message: string;
    onRetry?: () => void;
};

const EmptyState: React.FC<EmptyStateProps> = ({ message, onRetry }) => (
    <div className={styles.emptyStateContainer}>
        <Empty description={message} />
        {onRetry && (
            <Button className={styles.retryButton} type="primary" onClick={onRetry}>
                Retry
            </Button>
        )}
    </div>
);

export default EmptyState;
