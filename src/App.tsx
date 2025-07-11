import React from 'react';
import { ConfigProvider, Layout, App as AntdApp } from 'antd';

import Jar from './features/jar/Jar';

import styles from './App.module.scss';
import FruitSection from './features/fruit/FruitSection.tsx';

const { Header, Content } = Layout;

const App: React.FC = () => {
  const contentEl = (
    <Content className={styles.content}>
      <div className={styles.leftSection}>
        <FruitSection />
      </div>
      <div className={styles.rightSection}>
        <Jar />
      </div>
    </Content>
  );

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
      <AntdApp>
      <Layout className={styles.layout}>
        <Header className={styles.header}>
          <div className={styles.logo}>FRUITY APP</div>
        </Header>
        {contentEl}
      </Layout>
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;
