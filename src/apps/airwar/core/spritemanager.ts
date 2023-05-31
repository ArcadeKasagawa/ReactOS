export enum SpriteKind {
  Player,
  Enemy,
  Bullet,
  Food,
}

type OnUpdateFunction = (sprite: Sprite) => void;
type OnCollisionFunction = (spriteOrigin: Sprite, spriteTarget: Sprite) => void;

export interface Sprite {
  kind: SpriteKind;
  assetId: string;
  location: {
    x: number;
    y: number;
  };
  body: {
    w: number;
    h: number;
  };
  attributes: {
    life: {
      max: number;
      current: number;
    };
    blood: {
      max: number;
      current: number;
    };
  };
  events: {
    system: {
      update: () => void;
    };
    custom: {
      onUpdate: OnUpdateFunction;
      onCollision: OnCollisionFunction;
    };
  };
}

type MakeSprite = (
  kind: SpriteKind,
  assetId: string,
  x: number,
  y: number,
  w: number,
  h: number,
  maxLife: number,
  maxBlood: number,
  onUpdate: OnUpdateFunction,
  onCollisionFunction: OnCollisionFunction
) => Sprite;

export const checkCollision = (origin: Sprite, target: Sprite) => {
  if (
    origin.location.x < target.location.x + target.body.w &&
    origin.location.x + origin.body.w > target.location.x &&
    origin.location.y < target.location.y + target.body.h &&
    origin.body.h + origin.location.y > target.location.y
  ) {
    return true;
  } else {
    return false;
  }
};

export const makeSprite: MakeSprite = (
  kind,
  assetId,
  x,
  y,
  w,
  h,
  maxLife,
  maxBlood,
  onUpdate,
  onCollisionFunction
) => {
  const sprite: Sprite = {
    kind: kind,
    assetId: assetId,
    location: {
      x: x,
      y: y,
    },
    body: {
      w: w,
      h: h,
    },
    attributes: {
      life: {
        max: maxLife,
        current: maxLife,
      },
      blood: {
        max: maxBlood,
        current: maxBlood,
      },
    },
    events: {
      system: {
        update: function (): void {
          throw new Error('Function not implemented.');
        },
      },
      custom: {
        onUpdate: onUpdate,
        onCollision: onCollisionFunction,
      },
    },
  };
  sprite.events.system.update = () => {
    sprite.events.custom.onUpdate(sprite);
  };
  return sprite;
};
