import { createContext } from "react";

export const PopupContext = createContext({
    popupInfo: {
        isDisplaying: false,
        type: "",
    },
    setIsPopupDisplaying: (popupInfo) => {},
});
