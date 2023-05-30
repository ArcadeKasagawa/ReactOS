import React = require('react');

export const loadComponent = (name: string, props: any) => {
  const Component = React.lazy(() => {
    return new Promise((resolve, reject) => {
      switch (name) {
        case 'about':
          import('../apps/about')
            .then((x) => resolve(x as any))
            .catch((x) => console.error);
          break;
        case 'airwar':
          import('../apps/airwar')
            .then((x) => resolve(x as any))
            .catch((x) => console.error);
          break;
        case 'chrome':
          import('../apps/chrome')
            .then((x) => resolve(x as any))
            .catch((x) => console.error);
          break;
        case 'github':
          import('../apps/github')
            .then((x) => resolve(x as any))
            .catch((x) => console.error);
          break;
        case 'settings':
          import('../apps/settings')
            .then((x) => resolve(x as any))
            .catch((x) => console.error);
          break;
        case 'video':
          import('../apps/video')
            .then((x) => resolve(x as any))
            .catch((x) => console.error);
          break;
      }
    });
  });
  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <Component {...props} />
    </React.Suspense>
  );
};
