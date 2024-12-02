// Badge.jsx
const Badge = ({ children, className = '', ...props }) => {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  };
  
  // Input.jsx
  const Input = ({ className = '', ...props }) => {
    return (
      <input
        className={`w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm 
                   placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 
                   focus:border-orange-500 ${className}`}
        {...props}
      />
    );
  };
  
  export { Badge, Input };