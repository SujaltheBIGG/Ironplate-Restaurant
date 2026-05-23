import React from 'react';
import { cn } from '@/lib/utils';

export const MenuToggleIcon = ({
  open,
  className,
  duration = 300,
}: {
  open: boolean;
  className?: string;
  duration?: number;
}) => {
  return (
    <div
      className={cn('relative flex flex-col justify-center items-center', className)}
      style={{ width: '20px', height: '20px' }}
    >
      <span
        className="absolute w-full h-[2px] bg-current transition-all ease-out"
        style={{
          transform: open ? 'rotate(45deg)' : 'translateY(-6px)',
          transitionDuration: `${duration}ms`,
        }}
      />
      <span
        className="absolute w-full h-[2px] bg-current transition-all ease-out"
        style={{
          opacity: open ? 0 : 1,
          transitionDuration: `${duration}ms`,
        }}
      />
      <span
        className="absolute w-full h-[2px] bg-current transition-all ease-out"
        style={{
          transform: open ? 'rotate(-45deg)' : 'translateY(6px)',
          transitionDuration: `${duration}ms`,
        }}
      />
    </div>
  );
};
