import { SpriteKind, Sprite, SpriteManager } from './Sprite';
import { getGameStatus, setGameStatus, StatusType } from './gameStatus';
import {
  ResType,
  ResKind,
  ResGetById,
  ResClearAll,
  ResAdd,
  ResLoading,
  ResIsAllReady,
  ResGetProgress,
} from './res';

let ctx: CanvasRenderingContext2D;
let _w: number;
let _h: number;

const players = [];
const enemys = [];
const bullets = [];
const foods = [];

let score = 0;

const clear = () => {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, _w, _h);
};

const loop = () => {
  if (getGameStatus() == StatusType.playing) {
    clear();

    //collision
    enemys.forEach((enemy: Sprite) => {
      players.forEach((player: Sprite) => {
        if (SpriteManager.checkCollision(player, enemy)) {
          player._collision(enemy);
          enemy._collision(player);
        }
      });
    });

    enemys.forEach((enemy: Sprite) => {
      bullets.forEach((bullet: Sprite) => {
        if (SpriteManager.checkCollision(bullet, enemy)) {
          bullet._collision(enemy);
          enemy._collision(bullet);
        }
      });
    });

    foods.forEach((food: Sprite) => {
      enemys.forEach((enemy: Sprite) => {
        if (SpriteManager.checkCollision(food, enemy)) {
          food._collision(enemy);
          enemy._collision(food);
        }
      });
      players.forEach((player: Sprite) => {
        if (SpriteManager.checkCollision(food, player)) {
          food._collision(player);
          player._collision(food);
        }
      });
    });

    // clear die from sprites

    players.forEach((player: Sprite, index: number) => {
      if (player.life == 0) {
        //gameover
      } else {
        player._update();
      }
    });

    enemys.forEach((enemy: Sprite, index: number) => {
      if (enemy.life == 0) {
        enemys.splice(index, 1);
        score += 1;
      } else {
        enemy._update();
      }
    });

    bullets.forEach((bullet: Sprite, index: number) => {
      if (bullet.life == 0) {
        bullets.splice(index, 1);
      } else {
        bullet._update();
      }
    });

    foods.forEach((food: Sprite, index: number) => {
      if (food.life == 0) {
        foods.splice(index, 1);
      } else {
        food._update();
      }
    });

    //drawing sprites

    players.forEach((player: Sprite) => {
      ctx.fillStyle = '#fff';
      const {
        pos: { x, y },
        size: { w, h },
      } = player;
      ctx.fillRect(x, y, w, h);
    });

    enemys.forEach((enemy: Sprite) => {
      ctx.fillStyle = '#f00';
      const {
        pos: { x, y },
        size: { w, h },
      } = enemy;
      ctx.fillRect(x, y, w, h);
    });

    bullets.forEach((bullet: Sprite) => {
      ctx.fillStyle = '#fff';
      const {
        pos: { x, y },
        size: { w, h },
      } = bullet;
      ctx.fillRect(x, y, w, h);
    });

    foods.forEach((food: Sprite) => {
      ctx.fillStyle = '#fff';
      const {
        pos: { x, y },
        size: { w, h },
      } = food;
      ctx.fillRect(x, y, w, h);
    });

    //score
    ctx.fillStyle = '#fff';
    ctx.font = '20px serif';
    ctx.fillText(score + '', 10, 30);
  }

  window.requestAnimationFrame(loop);
};

export const Screen = {
  init: (w: number, h: number) => {
    _w = w;
    _h = h;
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = _w;
    canvas.height = _h;
    ctx = canvas.getContext('2d');
    return canvas;
  },
  addSprite: (sprite: Sprite) => {
    switch (sprite.kind) {
      case SpriteKind.player:
        players.push(sprite);
        break;
      case SpriteKind.enemy:
        enemys.push(sprite);
        break;
      case SpriteKind.bullet:
        bullets.push(sprite);
      case SpriteKind.food:
        foods.push(sprite);
    }
  },
  load: (assets: ResKind[]) => {
    assets.forEach((asset: ResKind) => {
      ResAdd(asset);
    });
    ResLoading();
    setGameStatus(StatusType.resLoading);
  },
  onResLoadReady: (callback: Function) => {
    const id = setInterval(() => {
      if (ResIsAllReady()) {
        clearInterval(id);
        setGameStatus(StatusType.ready);
        callback();
      } else {
        ctx.fillStyle = '#fff';
        ctx.font = '20px serif';
        ctx.fillText(ResGetProgress() * 100 + '%', 10, 30);
        console.log('Res loading progress:', ResGetProgress() * 100 + '%');
      }
    }, 100);
  },
  start: () => {
    if (getGameStatus() === StatusType.ready) {
      setGameStatus(StatusType.playing);
      loop();
    } else {
      console.log('res loading ... not ready');
    }
  },
  pause: () => {},
};
