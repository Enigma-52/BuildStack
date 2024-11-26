import React from 'react';
import { X } from 'lucide-react';



const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  className = '',
  size = 'md',
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`
        relative 
        w-full 
        ${sizeClasses[size]} 
        bg-white 
        rounded-lg 
        shadow-xl 
        p-6 
        ${className}
      `}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {title && (
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        )}

        {children}
      </div>
    </div>
  );
};

export default Modal;