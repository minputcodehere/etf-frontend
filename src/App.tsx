import React from 'react';
import { ConfigProvider } from 'antd';
import zhTW from 'antd/locale/zh_TW';
import { Dashboard } from './components/Dashboard';
import 'antd/dist/reset.css';

function App() {
  return (
    <ConfigProvider locale={zhTW}>
      <Dashboard />
    </ConfigProvider>
  );
}

export default App;
