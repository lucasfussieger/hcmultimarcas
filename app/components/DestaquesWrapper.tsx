'use client';

import { useEffect, useState } from 'react';
import Destaques from './destaques';

export default function DestaquesWrapper() {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setKey(prev => prev + 1);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return <Destaques key={key} />;
}
