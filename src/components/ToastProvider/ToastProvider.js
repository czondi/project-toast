import React from "react";

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

  React.useEffect(() => {
    function handleKeydown(event) {
      if (event.code === "Escape") setToasts([]);
    }

    addEventListener("keydown", handleKeydown);

    return () => {
      removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
