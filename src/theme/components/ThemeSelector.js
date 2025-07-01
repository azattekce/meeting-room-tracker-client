import { useContext } from 'react';
import {ThemeContext}  from '../../contexts/ThemeContext';

import lightIcon from '../../assets/light.svg'
import darkIcon from '../../assets/dark.svg'
import './ThemeSelector.css'

const themeColors = ["warning","danger","primary","success"];

const  ThemeSelector=()=> {
    const { changeColor, changeMode, mode } = useContext(ThemeContext);

    const toggleMode = () => {
        changeMode(mode === "light" ?  "dark":"light" )
    }

    return (
        <div className="container-fluid theme-selector text-end">
            <div className="mode-toggle">
                <img src={ mode === "dark" ? darkIcon : lightIcon } 
                alt="dark light mode" 
                onClick={toggleMode} />
            </div>
            <div className="theme-links">
                {
                    themeColors.map(color => (
                        <span
                            key={color}
                            className={`bg-${color}`}
                            onClick={() => changeColor(color)}></span>
                    ))
                }
            </div>
        </div>
    )
}

export default ThemeSelector;