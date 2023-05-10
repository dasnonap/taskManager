import { createContext } from "react";

export const PopupContext = createContext({
    popupInfo: {
        isDisplaying: false,
        type: "",
        popupId: 0,
    },
    setIsPopupDisplaying: (popupInfo) => {},
});
