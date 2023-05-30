import {
  ChromeFilled,
  GithubFilled,
  PoweroffOutlined,
  PaperClipOutlined,
  LockOutlined,
  SettingFilled,
  WindowsFilled,
  SendOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import React = require('react');

export const Menu = ({ addtask, addtaskok, logout }: any) => {
  const [actived, setActived] = React.useState<boolean>(false);
  return (
    <div
      onClick={() => {
        setActived(!actived);
      }}
      id="startmenu"
    >
      <WindowsFilled
        style={{ color: '#fff', fontSize: '20px', lineHeight: '45px' }}
      />
      {actived && (
        <ul id="selectmenuarea">
          <li
            onClick={() => {
              addtask('about', addtaskok);
            }}
          >
            <span>
              <PaperClipOutlined /> about
            </span>
          </li>
          <li
            onClick={() => {
              addtask('airwar', addtaskok);
            }}
          >
            <span>
              <SendOutlined /> airwar
            </span>
          </li>

          <li
            onClick={() => {
              addtask('chrome', addtaskok);
            }}
          >
            <span>
              <ChromeFilled /> chrome
            </span>
          </li>

          <li
            onClick={() => {
              addtask('github', addtaskok);
            }}
          >
            <span>
              <GithubFilled /> github
            </span>
          </li>

          <li
            onClick={() => {
              addtask('video', addtaskok);
            }}
          >
            <span>
              <PlayCircleOutlined /> Video
            </span>
          </li>
          <li
            onClick={() => {
              addtask('settings', addtaskok);
            }}
          >
            <span>
              <SettingFilled /> settings
            </span>
          </li>

          <li
            onClick={() => {
              logout();
            }}
          >
            <span>
              <LockOutlined /> Log Out
            </span>
          </li>
        </ul>
      )}
    </div>
  );
};
