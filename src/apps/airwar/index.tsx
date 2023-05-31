import * as React from 'react';
import * as AssetsManager from './core/assetsmanager';
import * as ScreenManager from './core/screenmanager';
import * as SpriteManager from './core/spritemanager';
import { status } from './core/status';
import { Card } from 'antd';
import './style.css';

export default function App() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = React.useState<CanvasRenderingContext2D | null>(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = 300;
      canvasRef.current.height = 300;
      setCtx(canvasRef.current.getContext('2d'));
    }
  }, [canvasRef]);

  const setup = (screen: ScreenManager.Screen) => {
    screen.clear();

    AssetsManager.AddAsset({
      id: 'player',
      src: '#f00', // if type === pixel then src seting to color by hex
      type: AssetsManager.AssetType.pixel,
    });
    AssetsManager.AddAsset({
      id: 'enemy',
      src: '#fff', // if type === pixel then src seting to color by hex
      type: AssetsManager.AssetType.pixel,
    });
    AssetsManager.AddAsset({
      id: 'bullet',
      src: '#ff0', // if type === pixel then src seting to color by hex
      type: AssetsManager.AssetType.pixel,
    });

    AssetsManager.LoadingAssets((progress) => {
      return screen.drawAssetsLoadingProgress(progress);
    }).then(() => {
      console.log('all assets load ok');
      let player = SpriteManager.makeSprite(
        SpriteManager.SpriteKind.Player,
        'player',
        150,
        280,
        4,
        4,
        5,
        1,
        (sprite: SpriteManager.Sprite) => {},
        (origin: SpriteManager.Sprite, target: SpriteManager.Sprite) => {
          origin.attributes.life.current = 0;
          target.attributes.life.current = 0;
        }
      );

      document.addEventListener('keypress', ({ code }: KeyboardEvent) => {
        if (!status.gameover) {
          switch (code) {
            case 'KeyW':
              player.location.y -= 2;
              break;
            case 'KeyS':
              player.location.y += 2;
              break;
            case 'KeyA':
              player.location.x -= 2;
              break;
            case 'KeyD':
              player.location.x += 2;
              break;
            case 'Space':
              screen.addSprite(
                SpriteManager.makeSprite(
                  SpriteManager.SpriteKind.Bullet,
                  'bullet',
                  player.location.x,
                  player.location.y,
                  2,
                  2,
                  1,
                  1,
                  (sprite: SpriteManager.Sprite) => {
                    sprite.location.y -= 2;
                    if (sprite.location.y <= -2) {
                      sprite.attributes.life.current = 0;
                    }
                  },
                  (
                    origin: SpriteManager.Sprite,
                    target: SpriteManager.Sprite
                  ) => {
                    origin.attributes.life.current = 0;
                    target.attributes.life.current = 0;
                    status.score += 1;
                  }
                )
              );
              break;
          }
        }
        switch (code) {
          case 'KeyR':
            if (status.gameover) {
              player = SpriteManager.makeSprite(
                SpriteManager.SpriteKind.Player,
                'player',
                150,
                280,
                4,
                4,
                5,
                1,
                (sprite: SpriteManager.Sprite) => {},
                (
                  origin: SpriteManager.Sprite,
                  target: SpriteManager.Sprite
                ) => {
                  origin.attributes.life.current = 0;
                  target.attributes.life.current = 0;
                }
              );
              screen.addSprite(player);
              screen.restart();
            }
            break;
        }
      });

      screen.addSprite(player);
      screen.start((time: number) => {
        if (time % 60 == 0) {
          screen.addSprite(
            SpriteManager.makeSprite(
              SpriteManager.SpriteKind.Enemy,
              'enemy',
              Math.floor(Math.random() * (300 - 1)) + 1,
              -20,
              6,
              4,
              1,
              1,
              (sprite: SpriteManager.Sprite) => {
                sprite.location.y += 1;
                if (sprite.location.y >= screen.screenHeight) {
                  sprite.attributes.life.current = 0;
                }
              },
              (origin: SpriteManager.Sprite, target: SpriteManager.Sprite) => {}
            )
          );
        }
      });
    });
  };

  React.useEffect(() => {
    if (ctx) {
      ScreenManager.init(300, 300, ctx).then((screen: ScreenManager.Screen) =>
        setup(screen)
      );
    }
  }, [ctx]);

  return (
    <div id="airwargame">
      <Card title="">
        <canvas ref={canvasRef} />
        <p>WASD Keys over arrows</p>
        <p>Space to attack</p>
        <p>R to restart when GameOver</p>
      </Card>
    </div>
  );
}
