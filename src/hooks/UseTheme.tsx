import { useEffect, useState } from "react";
import {
  getUserColorScheme,
  saveUserColorScheme,
} from "../utilities/UserColorScheme";

export default function UseTheme() {
  const [theme, setTheme] = useState(getUserColorScheme());
  const _body = document.querySelector("body");

  useEffect(() => {
    _body?.removeAttribute("class");
    if (theme === "dark") {
      _body?.classList.add("dark");
    }
    saveUserColorScheme(theme);
  }, [theme]);

  return { setTheme, theme };
}
