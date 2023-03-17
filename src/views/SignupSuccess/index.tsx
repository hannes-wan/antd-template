import { Result } from 'antd';
import React from 'react';

const View: React.FC = () => {

    return <Result
        status="success"
        title="The account has been successfully created!"
        subTitle="Please find the email we just sent to you to activate the account."
    />
}

export default View;
