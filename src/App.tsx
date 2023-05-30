import * as React from 'react';
import { Menu } from './UI/menu';
import './style.css';
import { alltasks, addtask, deltask, endTasks } from './core/task';
import Date from './UI/date';
import Soundonbar from './UI/sound';
import LoginScreen from './UI/login';
import Wifi from './UI/wifi';
import PCmanager from './UI/pcmanager';
import { CloseCircleFilled, CloseOutlined } from '@ant-design/icons';

export default function App() {
  const [update, setupdate] = React.useState<number>(0);
  const [showLoginScreen, setShowLoginScreen] = React.useState<boolean>(false);
  return (
    <div>
      {showLoginScreen && (
        <LoginScreen
          onLoginSuccess={() => {
            setShowLoginScreen(false);
          }}
        />
      )}

      <div id="desktop">
        <div id="apps">
          {alltasks().map((task) => {
            return (
              <div key={task.id} className={`app app_${update}`}>
                <div className="title">
                  <span>{task.name}</span>
                </div>
                <div
                  onClick={() => {
                    deltask(task.id, () => {
                      setupdate(update + 1);
                    });
                  }}
                  className="close"
                >
                  <CloseOutlined />
                </div>
                <div className="body">{task.component}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div id="bar">
        <Menu
          addtask={addtask}
          addtaskok={() => {
            setupdate(update + 1);
          }}
          logout={() => {
            setShowLoginScreen(true);
          }}
        />
        <div id="taskbar" className={`taskbar_${update}`}>
          {alltasks().map((task) => {
            return <div className={`taskitem ${update}`}>{task.icon}</div>;
          })}
        </div>
        <PCmanager
          onclean={() => {
            endTasks(() => {
              setupdate(update + 1);
            });
          }}
          appcount={alltasks().length}
        />
        <Wifi />
        <Soundonbar />
        <Date />
      </div>
    </div>
  );
}
