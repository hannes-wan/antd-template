import React from 'react';
import { Result } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const View: React.FC = () => (
    <Result
        icon={<LoadingOutlined />}
        title="Loading..."
    />
);

export default View;