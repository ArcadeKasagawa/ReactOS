import React = require('react');
import { Avatar, Button, Input, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default ({ onLoginSuccess }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  return (
    <div id="loginScreen">
      <Avatar size={128} icon={<UserOutlined />} />
      <Space>
        <Input.Password style={{ width: '150px' }} placeholder="Password" />
        <Button
          type="primary"
          loading={loading}
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              onLoginSuccess();
            }, 500);
          }}
        >
          Login
        </Button>
      </Space>
    </div>
  );
};
