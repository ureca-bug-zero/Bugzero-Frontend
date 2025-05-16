// hooks/useViewport.ts
import { useEffect, useState } from 'react';

type Viewport = 'mobile' | 'tablet' | 'desktop';

export const useViewport = (): Viewport => {
  const [viewport, setViewport] = useState<Viewport>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 760) {
        setViewport('mobile');
      } else if (width < 1440) {
        setViewport('tablet');
      } else {
        setViewport('desktop');
      }
    };

    handleResize(); // 초기 렌더링 시 감지
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return viewport;
};
