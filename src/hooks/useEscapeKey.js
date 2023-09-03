import React from "react";

function useEscapeKey(callback) {
  React.useEffect(() => {
    function handleKeydown(event) {
      if (event.code === "Escape") callback(event);
    }

    addEventListener("keydown", handleKeydown);

    return () => {
      removeEventListener("keydown", handleKeydown);
    };
  }, [callback]);
}

export default useEscapeKey;
