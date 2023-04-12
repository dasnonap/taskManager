import { createContext } from "react";

export const PopupContext = createContext({
    isPopupDisplaying: false,
    setIsPopupDisplaying: (isDisplaying) => {},
});
