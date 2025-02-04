import { useState } from "react";
import { useGiraf } from "../context";

const usePushMessage = () => {
  const {gHead, addGHead} = useGiraf();
  const pushMessage = (message, type) => {
    addGHead("pushMessage", true);
    addGHead('pm', message)
    addGHead('pt', type)
    setTimeout(() => {
      addGHead("pushMessage", false);
      addGHead('pm', '')
      addGHead('pt', '')
    }, 3000);
  };

  return {
    pushMessage,
  };
};

export default usePushMessage;
