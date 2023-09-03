import React from "react";
import useEscapeKey from "../../hooks/useEscapeKey";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const createToast = (message, variant = "notice") => {
    const toast = {
      id: crypto.randomUUID(),
      variant,
      message,
    };

    setToasts([...toasts, toast]);
  };

  const dismissToast = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  useEscapeKey(
    React.useCallback(() => {
      setToasts([]);
    }, [])
  );

  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
