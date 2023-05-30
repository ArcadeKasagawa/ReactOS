import React = require('react');
import {
  ThunderboltOutlined,
  CloseOutlined,
  ClearOutlined,
  AppstoreOutlined,
  RocketOutlined,
} from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { Card, Progress, Descriptions, Tooltip } from 'antd';

const CanvasButton = ({ onclean }) => {
  const [text, setText] = useState<string>('Boost');
  const [showCanvas, setShowCanvas] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let ctx: CanvasRenderingContext2D;

  const img = new Image();
  img.src =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAALlJREFUSEvdltsOgCAMQ+H/PxqjMBJuurWaBX3FcuxYcTE4PdGJG7YCp1Il6qOt4pRS5sZ4Sa36erJWYQWz8D3BjGvKsSsYhWsdS4SQ+2bKUIMlRlbyKnYNuMlKzqqs90tqvgp8sxsMXvXA56UWM73zCl5ZKuWmHM9c+zt+6BbYsVSs/6H8t6vpOKmDO75I3Vyy3fSskaFA29VLMAJFRpfBsQsYhdKOXcAMFHF8alzmaiLOrdQap9fAB0rsZR88C4rIAAAAAElFTkSuQmCC';

  let x = -30;
  let y = 5;
  let toy = 5;
  let t = 0;

  const stars = [];

  const draw = () => {
    t += 1;
    ctx!.clearRect(0, 0, 300, 40);
    ctx!.fillStyle = '#fff';

    if (x <= 120) {
      x += 2;
    }
    if (x >= 120 && x <= 150) {
      x += 0.5;
      y = Math.abs((x % 15) - 5);
    }
    if (x >= 150 && x <= 350) {
      y = 5;
      x += 3;
    }

    if (t % 5 == 0) {
      stars.push({
        x: 300,
        y: Math.floor(Math.random() * 41),
        w: Math.floor(Math.random() * 10 + 5),
        h: 1,
        s: Math.floor(Math.random() * 10 + 5),
      });
    }

    stars.forEach((star) => {
      ctx!.fillRect(star.x, star.y, star.w, star.h);
      star.x -= star.s;
    });

    ctx!.drawImage(img, x, y, 30, 30);

    if (x > 300) {
      setShowCanvas(false);
      setText('Performance boosted √');
      onclean();
      setTimeout(() => {
        setText('Boost');
      }, 500);
    }
  };

  const loop = () => {
    if (canvasRef.current) {
      draw();
      window.requestAnimationFrame(loop);
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = 300;
      canvasRef.current.height = 40;
      ctx = canvasRef.current.getContext('2d');
      loop();
    }
  }, [showCanvas]);

  return (
    <div
      onClick={() => {
        setShowCanvas(true);
      }}
      className="canvasButton"
    >
      {showCanvas ? <canvas ref={canvasRef}></canvas> : <span>{text}</span>}
    </div>
  );
};

export default ({ appcount, onclean }) => {
  const [showWindow, setShowWindow] = React.useState<boolean>(false);
  return (
    <div id="pcmanager">
      {showWindow && (
        <div class="app">
          <div className="title">PC Manager</div>
          <div className="body">
            <Card
              title={
                <div>
                  <RocketOutlined /> <span>PC boost</span>
                </div>
              }
            >
              <div className="smialtitle">Free up your PC's resources</div>
              {/* <Progress type="dashboard" percent={75} /> */}
              <CanvasButton onclean={onclean} />
            </Card>
            <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
              <Card
                style={{ flex: 1 }}
                title={
                  <div>
                    <ClearOutlined /> Deep cleanup
                  </div>
                }
              >
                <div className="smialtitle">Local Disk (C:)</div>
                <div className="blueText">100.2GB/150.0GB</div>
              </Card>
              <Card
                style={{ flex: 1 }}
                title={
                  <div>
                    <AppstoreOutlined /> Process
                  </div>
                }
              >
                <div className="smialtitle">In progress</div>
                <div className="blueText">{appcount} Apps</div>
              </Card>
            </div>
          </div>
          <div
            className="close"
            onClick={() => {
              setShowWindow(false);
            }}
          >
            <CloseOutlined />
          </div>
        </div>
      )}
      <Tooltip placement="top" title={'PC manager'}>
        <RocketOutlined
          onClick={() => {
            setShowWindow(!showWindow);
          }}
        />
      </Tooltip>
    </div>
  );
};
