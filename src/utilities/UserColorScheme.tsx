type Theme = "dark" | "light";

const isValidTheme = (value: any): value is Theme => {
  return value === "dark" || value === "light";
};

const getUserColorScheme = (): Theme => {
  //Obtener desde el localStorage primero
  const storedTheme: string | null = localStorage.getItem("theme");

  let theme: Theme = "light";

  if (isValidTheme(storedTheme)) {
    theme = storedTheme;
    return theme;
  }

  //Ver si el sistema esta en modo oscuro
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  } else {
    return "light";
  }
};

const saveUserColorScheme = (value: Theme) => {
  //Almacenar tema en el localStorage
  localStorage.setItem("theme", value);
};

export { getUserColorScheme, saveUserColorScheme };
