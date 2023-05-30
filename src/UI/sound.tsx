import React = require('react');
import { Slider } from 'antd';
import { SoundTwoTone } from '@ant-design/icons';
export default () => {
  const [showWindow, setShowWindow] = React.useState<boolean>(false);
  return (
    <div id="soundonbar">
      {showWindow && (
        <div id="soundsetting">
          <SoundTwoTone twoToneColor="#fff" />
          <Slider style={{ width: '225px' }} defaultValue={30} />
        </div>
      )}
      <SoundTwoTone
        onClick={() => {
          setShowWindow(!showWindow);
        }}
        twoToneColor="#fff"
      />
    </div>
  );
};
