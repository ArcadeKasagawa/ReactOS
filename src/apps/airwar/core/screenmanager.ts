import { Asset, AssetType, getAssets, getAssetsById } from './assetsmanager';
import { checkCollision, Sprite, SpriteKind } from './spritemanager';
import { status } from './status';

const players = [];
const enemys = [];
const bullets = [];
const foods = [];

let screenWidth = 0;
let screenHeight = 0;
let ctx: CanvasRenderingContext2D | null;

const clear = () => {
  ctx.clearRect(0, 0, 300, 300);
};

const drawAssetsLoadingProgress = (progress: number) => {
  ctx.clearRect(0, 0, 300, 300);
  ctx.fillStyle = '#f00';
  ctx.font = '40px serif';
  ctx.fillText(`loading ${progress * 100} %`, 30, 160);
};

const addSprite = (sprite: Sprite) => {
  switch (sprite.kind) {
    case SpriteKind.Player:
      players.push(sprite);
      break;
    case SpriteKind.Enemy:
      enemys.push(sprite);
      break;
    case SpriteKind.Bullet:
      bullets.push(sprite);
      break;
    case SpriteKind.Food:
      foods.push(sprite);
      break;
  }
};

const update = () => {
  [players, enemys, bullets, foods].forEach((sprites) => {
    sprites.forEach((sprite: Sprite) => {
      sprite.events.system.update();
    });
  });
};

const collision = () => {
  bullets.forEach((bullet: Sprite) => {
    enemys.forEach((enemy: Sprite) => {
      if (checkCollision(bullet, enemy)) {
        bullet.events.custom.onCollision(bullet, enemy);
        enemy.events.custom.onCollision(enemy, bullet);
      }
    });
  });

  players.forEach((player: Sprite) => {
    enemys.forEach((enemy: Sprite) => {
      if (checkCollision(player, enemy)) {
        player.events.custom.onCollision(player, enemy);
        enemy.events.custom.onCollision(enemy, player);
      }
    });
  });
};

const drawSprites = () => {
  [players, enemys, bullets, foods].forEach((sprites) => {
    sprites.forEach((sprite: Sprite) => {
      ctx.fillStyle = '#f00';
      ctx.font = '40px serif';

      const asset = getAssetsById(sprite.assetId);

      if (asset.type === AssetType.pixel) {
        ctx.fillStyle = asset.assetObject;
        ctx.fillRect(
          sprite.location.x,
          sprite.location.y,
          sprite.body.w,
          sprite.body.h
        );
      }
    });
  });
};

const removeDeadSprite = () => {
  [players, enemys, bullets, foods].forEach((sprites) => {
    sprites.forEach((sprite: Sprite, index: number) => {
      if (sprite.attributes.life.current === 0) {
        sprites.splice(index, 1);
      } else {
        if (sprite.attributes.blood.current === 0) {
          sprite.attributes.blood.current = sprite.attributes.blood.max;
          sprite.attributes.life.current -= 1;
        }
      }
    });
  });
};

const drawscore = () => {
  ctx.fillStyle = '#fff';
  ctx.font = '20px serif';
  ctx.fillText(`${status.score}`, 10, 25);
};

const isover = () => {
  if (players.length === 0) {
    status.gameover = true;
  }
};

const restart = () => {
  bullets.splice(0);
  enemys.splice(0);
  // players.forEach((player: Sprite) => {
  //   player.attributes.life.current = 1;
  // });
  status.gameover = false;
};

const start = (fn: (time: number) => void) => {
  let time = 0;
  const loop = () => {
    clear();

    drawSprites();
    drawscore();

    if (status.gameover) {
      ctx.fillStyle = '#f00';
      ctx.font = '30px serif';
      ctx.fillText(`game over`, 80, 150);
    } else {
      removeDeadSprite();
      update();
      collision();
      isover();
      time += 1;
      fn(time);
    }

    window.requestAnimationFrame(loop);
  };
  loop();
};

export interface Screen {
  clear: () => void;
  drawAssetsLoadingProgress: (progress: number) => void;
  addSprite: (sprite: Sprite) => void;
  start: (fn: (time: number) => void) => void;
  restart: () => void;
  screenWidth: number;
  screenHeight: number;
}

export const init = (
  w: number,
  h: number,
  initctx: CanvasRenderingContext2D
) => {
  screenWidth = w;
  screenHeight = h;
  ctx = initctx;
  return new Promise((resolve, reject) => {
    const obj: Screen = {
      clear,
      drawAssetsLoadingProgress,
      addSprite,
      start,
      restart,
      screenWidth,
      screenHeight,
    };
    resolve(obj);
  });
};
