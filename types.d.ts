declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.ComponentProps<'svg'> & { title?: string }
  >;
  export default ReactComponent;
}

import 'react';

declare module 'react' {
  interface ImgHTMLAttributes<T> {
    fetchPriority?: 'high' | 'low' | 'auto';
  }
}
