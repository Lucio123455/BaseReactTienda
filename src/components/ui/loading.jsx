import React from 'react';
import { cn } from '@/lib/utils';

const Loading = ({ className = '', size = 'lg', overlay = false, text = '' }) => {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const spinner = (
    <div className={cn('relative', sizeClasses[size], className)}>
      <div className="absolute inset-0 rounded-full border-4 border-gray-300 opacity-20" />
      <div className="absolute inset-0 rounded-full border-4 border-t-gray-900 border-b-transparent border-l-transparent border-r-transparent animate-spin-smooth" />
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
        {spinner}
        {text && <p className="text-gray-700 text-sm font-medium">{text}</p>}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3">
      {spinner}
      {text && <span className="text-gray-700 text-sm">{text}</span>}
    </div>
  );
};

export default Loading;

