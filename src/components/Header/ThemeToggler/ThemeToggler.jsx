import React, {useEffect} from 'react';
import {useTheme} from "../../../hooks/use-theme";
import s from "./ThemeToggler.module.scss"
import img from "./../../../assets/images/daynight.png"

const ThemeToggler = () => {

  const {theme, setTheme} = useTheme()

  const toggle = () => {
    const handleLightThemeClick = () => {
      setTheme('light')
    }
    const handleDarkThemeClick = () => {
      setTheme('dark')
    }

    if (theme === 'light') {
      handleDarkThemeClick()
    } else {
      handleLightThemeClick()
    }
  }

  useEffect(() => {
  }, [theme, setTheme])

  return (
    <div className={s.toggleWidget}>
      <div>
          <img onClick={toggle} className={s.toggleImage} src={img} alt="toggleImage"/>
      </div>
    </div>
  );
};

export default ThemeToggler;