import React, { useState } from "react";
import styled from "styled-components";
import {ThemeProvider } from "styled-components";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";
import "../styles/Switch-mode/Switch.css";

function Switch({ toggleTheme, isDarkTheme }) {
  const [isToggled, setIsToggled] = useState(isDarkTheme);


 const onToggle = () => {
    if (typeof toggleTheme === 'function') {
        toggleTheme();
    }
    setIsToggled(!isToggled);
};

const StyleApp = styled.div`
  min-height: 100vh;
  text-align: center;
  padding-top: 10rem;
  background-color: ${(props) => props.theme.body};
  transition: all 0.25s ease;
`;


const darkTheme = {
  body: "#1c1c1c",
  title: "#fff",
  subtitle: "#b6b6b6",
  icon: "#b6b6b6",
};

const lightTheme = {
  body: "#fff",
  title: "#1c1c1c",
  icon: "#1c1c1c",
  subtitle: "#333",
};

  function SwitchApp() {
    const [theme, setTheme] = useState("dark");
    const isDarkTheme = theme === "dark";

    const toggleTheme = () => {
      setTheme(isDarkTheme ? "light" : "dark");
    }
    return (
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <StyleApp>
          <SunIcon />
          <Switch toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
          <MoonIcon />
        </StyleApp>
      </ThemeProvider>
    )
  }
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="switch" />
    </label>
  );
}
export default Switch;
