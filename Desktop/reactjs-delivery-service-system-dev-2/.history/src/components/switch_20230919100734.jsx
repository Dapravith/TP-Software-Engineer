import React, { useState } from "react";
import "../styles/Switch-mode/Switch.css";

function Switch({ toggleTheme, isDarkTheme }) {
  const [isToggled, setIsToggled] = useState(isDarkTheme);

 const onToggle = () => {
    if (typeof toggleTheme === 'function') {
        toggleTheme();
    }
    setIsToggled(!isToggled);
};

  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="switch" />
    </label>
  );
}
export default Switch;
