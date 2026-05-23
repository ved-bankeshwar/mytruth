'use client';

import * as React from 'react';
import * as runtime from 'react/jsx-runtime';

export function Mdx({ code }: { code: string }) {
  const Component = React.useMemo(() => {
    const fn = new Function(code);
    return fn({ ...runtime }).default;
  }, [code]);

  return <Component components={{}} />;
}
