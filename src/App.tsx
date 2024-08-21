import React, { useEffect } from 'react';
import { ConfigProvider, Layout, notification } from 'antd';

import useFetchFruits from './api/fruits/useFetchFruits';
import FruitList from './features/fruit-list/FruitList';
import GroupByFruitAttribute from './features/group-by-fruit-attribute/GroupByFruitAttribute';
import Jar from './features/jar/Jar';
import Spinner from './shared/components/Spinner/Spinner';
import EmptyState from './shared/components/EmptyState/EmptyState';
import useEffectOnce from './shared/hooks/useEffectOnce';

import styles from './App.module.scss';

const { Header, Content } = Layout;

const App: React.FC = () => {
    const { fetchFruits, loading, error } = useFetchFruits();

    useEffectOnce(() => {
        fetchFruits();
    });

    useEffect(() => {
        if (error) {
            notification.error({
                message: 'Error',
                description: 'Failed to fetch fruits. Please try again later.',
            });
        }
    }, [error]);

    const handleRetry = () => {
        fetchFruits();
    }

    const contentEl = loading ? <Spinner/> : (
        <Content className={styles.content}>
            {error ? (
                <EmptyState message="Error loading fruits" onRetry={handleRetry} />
            ) : (
                <div className={styles.leftSection}>
                    <FruitList />
                </div>
            )}
            <div className={styles.rightSection}>
                <Jar />
            </div>
        </Content>
    )

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorText: '#3A4145',
                    colorPrimary: '#10AD65',
                    colorPrimaryActive: '#007841',
                    colorPrimaryHover: '#007841',
                    colorPrimaryTextActive: '#fff',
                    colorPrimaryTextHover: '#fff',
                    colorSuccessBorder: 'rgba(16, 173, 101, 0.32)',
                    colorSuccessBg: 'rgba(16, 173, 101, 0.08)',
                    colorBgLayout: '#F1F3F5',
                    colorBgMask: 'rgba(58, 65, 69, 0.4)',
                    colorTextTertiary: 'rgba(58, 65, 69, 0.6)',
                    colorBgSpotlight: 'rgba(0, 0, 0, 0.9)',
                    colorBorder: 'rgba(58, 65, 69, 0.24)',
                    colorError: '#D10D38',
                    colorSuccess: '#10AD65',
                    colorLink: '#10AD65',
                    colorLinkActive: '#007841',
                    colorLinkHover: '#007841',
                    colorFillSecondary: 'rgba(58, 65, 69, 0.14)',
                    borderRadius: 20,
                },
            }}
        >
            <Layout className={styles.layout}>
                <Header className={styles.header}>
                    <div className={styles.logo}>FRUITY APP</div>
                    <GroupByFruitAttribute />
                </Header>
                {contentEl}
            </Layout>
        </ConfigProvider>
    );
};

export default App;
