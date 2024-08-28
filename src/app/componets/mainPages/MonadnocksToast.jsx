import React, { useEffect } from "react";

const Toast = ({ message, onClose, position = "top-right" }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed z-50 p-4 bg-green-900 text-white rounded-lg shadow-lg transition-opacity duration-300 ease-in-out ${position === "top-right" ? "top- right-" : " right-4"}`}
    >
      <span className="text-sm">{message}</span>
    </div>
  );
};

export default Toast;
