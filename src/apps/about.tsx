import React = require('react');
import { Descriptions } from 'antd';
export default () => {
  return (
    <div className="paddingbody">
      <Descriptions title="">
        <Descriptions.Item label="stack">React + TypeScript</Descriptions.Item>
        <Descriptions.Item label="UI">antd</Descriptions.Item>
        <Descriptions.Item label="video">video-react</Descriptions.Item>
        <Descriptions.Item label="github">
          https://github.com/ArcadeKasagawa/ReactOS
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};
