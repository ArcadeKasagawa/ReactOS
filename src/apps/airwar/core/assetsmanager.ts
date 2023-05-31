const Assets: Asset[] = [];

export enum AssetType {
  image,
  video,
  audio,
  pixel,
  block,
}

export interface Asset {
  id: string;
  src: string;
  type: AssetType;
  assetObject?: any | null;
}

export const getAssetsById = (id: string) => {
  return Assets.filter((obj) => {
    return obj.id === id;
  })[0] as Asset;
};

export const getAssets = () => {
  return Assets;
};

export const ClearAllAssets = () => {};

export const AddAsset = (asset: Asset) => {
  Assets.push(asset);
};

export const LoadingAssets = (cb: (loadingProgress: number) => void) => {
  return new Promise((resolve, reject) => {
    Assets.forEach((asset) => {
      if (asset.type === AssetType.image) {
        const image = new Image();
        image.onload = () => {
          asset.assetObject = image;
          cb(GetAssetsLoadingProgress());
          if (IsAssetsAllReadyLoaded()) {
            resolve(true);
          }
        };
        image.src = asset.src;
      }
      if (asset.type === AssetType.pixel) {
        asset.assetObject = asset.src; // color
        cb(GetAssetsLoadingProgress());
        if (IsAssetsAllReadyLoaded()) {
          resolve(true);
        }
      }
    });
  });
};

const GetAssetsLoadingProgress = (): number => {
  return parseFloat(
    (
      Assets.filter((asset) => asset.assetObject != undefined).length /
      Assets.length
    ).toFixed(2)
  );
};

const IsAssetsAllReadyLoaded = (): boolean => {
  return Assets.filter((res) => res.assetObject != undefined).length ===
    Assets.length
    ? true
    : false;
};
