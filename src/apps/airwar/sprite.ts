import { ResGetById, ResKind } from './res';

export const SpriteManager = {
  New: ({
    resid,
    pos: { x, y },
    size: { w, h },
    blood,
    life,
    kind,
    onUpdate,
    onCollision,
  }: {
    resid: string;
    pos: {
      x: number;
      y: number;
    };
    size: {
      w: number;
      h: number;
    };
    blood: number;
    life: number;
    kind: SpriteKind;
    onUpdate: Function;
    onCollision: Function;
  }) => {
    const sprite: Sprite = {
      pos: {
        x,
        y,
      },
      size: {
        w,
        h,
      },
      res: ResGetById(resid),
      kind: kind,
      blood: blood || 100,
      life: life || 1,
      data: {},
      _update: () => {
        onUpdate(sprite);
      },
      _collision: (target: Sprite) => {
        onCollision(sprite, target);
      },
    };
    return sprite;
  },
  checkCollision: (sprite1: Sprite, sprite2: Sprite) => {
    if (
      sprite1.pos.x < sprite2.pos.x + sprite2.size.w &&
      sprite1.pos.x + sprite1.size.w > sprite2.pos.x &&
      sprite1.pos.y < sprite2.pos.y + sprite2.size.h &&
      sprite1.size.h + sprite1.pos.y > sprite2.pos.y
    ) {
      return true;
    } else {
      return false;
    }
  },
};
export interface Sprite {
  pos: {
    x: number;
    y: number;
  };
  size: {
    w: number;
    h: number;
  };
  res: ResKind;
  blood: number;
  life: number;
  data: any;
  kind: SpriteKind;
  _update: Function;
  _collision: Function;
}
export enum SpriteKind {
  player,
  enemy,
  bullet,
  food,
}
