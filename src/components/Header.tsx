import UseTheme from "../hooks/UseTheme";
import iconSun from "../assets/images/icon-sun.svg";
import iconMoon from "../assets/images/icon-moon.svg";

export default function Header() {
  const { theme, setTheme } = UseTheme();
  return (
    <header className="flex justify-between items-center">
      <h1 className="text-white text-4xl font-bold tracking-[15px]  max-h-[30px] ">
        TODO
      </h1>
      <button
        aria-label="toggle dark mode"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <img
          src={theme === "dark" ? iconSun : iconMoon}
          alt={`Icon theme ${theme === "dark" ? "light" : "dark"}`}
        />
      </button>
    </header>
  );
}
