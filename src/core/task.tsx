import React = require('react');
import {
  ChromeFilled,
  GithubFilled,
  SettingFilled,
  PaperClipOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { loadComponent } from './loadComponent';
import { Avatar } from 'antd';
let taskid = 0;
const tasks = [];
export const addtask = (name: string, cb: Function) => {
  let icon = (
    <Avatar style={{ verticalAlign: 'middle' }} size={25}>
      {name[0]}
    </Avatar>
  );
  switch (name) {
    case 'chrome':
      icon = <ChromeFilled />;
      break;
    case 'github':
      icon = <GithubFilled />;
      break;
    case 'airwar':
      icon = <div>✈</div>;
      break;
    case 'settings':
      icon = <SettingFilled />;
      break;
    case 'about':
      icon = <PaperClipOutlined />;
      break;
    case 'video':
      icon = <PlayCircleOutlined />;
      break;
  }
  taskid += 1;
  const id = taskid;
  tasks.push({
    id,
    name,
    icon,
    component: loadComponent(name, {}),
  });
  console.log('add', tasks.length);
  cb(id);
};

export const deltask = (id: number, cb: Function) => {
  console.log(tasks.length);
  tasks.map((t, i) => {
    console.log(t.id, id, t.id == id);
    if (t.id === id) {
      tasks.splice(i, 1);
      cb();
    }
  });
};

export const alltasks = () => {
  return tasks;
};

export const endTasks = (cb) => {
  tasks.splice(0);
  cb();
};
