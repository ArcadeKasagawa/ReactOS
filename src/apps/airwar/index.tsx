import React = require('react');
import { SpriteManager, SpriteKind, Sprite } from './Sprite';
import { Screen } from './Screen';
import { ResType } from './res';

export default () => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = React.useState<CanvasRenderingContext2D | null>(null);
  React.useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = 300;
      canvasRef.current.height = 300;
      setCtx(canvasRef.current.getContext('2d'));
    }
  }, [canvasRef]);

  const draw = () => {
    ctx.clearRect(0, 0, 300, 300);
    ctx.fillStyle = '#f00';
    ctx.fillRect(10, 10, 10, 10);
  };

  React.useEffect(() => {
    if (ctx) {
      draw();
    }
  }, [ctx]);
  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};
