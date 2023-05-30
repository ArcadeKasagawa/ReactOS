const ResObjs: ResKind[] = [];

export enum ResType {
  image,
  video,
  audio,
  pixel,
  block,
}

export interface ResKind {
  id: string;
  src: string;
  type: ResType;
  resObj?: any | null;
}

export const ResGetById = (id: string) => {
  return ResObjs.filter((obj) => {
    obj.id === id;
  })[0] as ResKind;
};

export const ResClearAll = () => {};

export const ResAdd = (asset: ResKind) => {
  ResObjs.push(asset);
};

export const ResLoading = () => {
  console.log('res loading......');
  ResObjs.forEach((res) => {
    if (res.type === ResType.image) {
      const image = new Image();
      image.onload = () => {
        res.resObj = image;
        console.log(res.resObj);
      };
      image.src = res.src;
    }
    console.log(res.src, res.resObj);
  });
};

export const ResGetProgress = (): number => {
  return parseFloat(
    (
      ResObjs.filter((res) => res.resObj != undefined).length / ResObjs.length
    ).toFixed(2)
  );
};

export const ResIsAllReady = (): boolean => {
  return ResObjs.filter((res) => res.resObj != undefined).length ===
    ResObjs.length
    ? true
    : false;
};
