// Portal 컴포넌트 생성

// import { createPortal } from 'react-dom';
// import { ReactNode, useEffect, useState } from 'react';

// const DropdownPortal = ({ children }: { children: ReactNode }) => {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   const el = document.getElementById('portal-root');
//   return el ? createPortal(children, el) : null;
// };

// export default DropdownPortal;

import { createPortal } from 'react-dom';
import { ReactNode, useEffect, useState, forwardRef } from 'react';

interface Props {
  children: ReactNode;
}

const DropdownPortal = forwardRef<HTMLDivElement, Props>(
  ({ children }, ref) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) return null;

    const el = document.getElementById('portal-root');
    return el ? createPortal(<div ref={ref}>{children}</div>, el) : null;
  },
);

export default DropdownPortal;
