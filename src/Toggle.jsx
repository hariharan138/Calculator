import React, { useRef, useState } from 'react';
import tstyle from './Togglestyle.module.css';

const Toggle = ({ checktoggle }) => {
    const [isChecked, setIsChecked] = useState(true);
    const handleref = useRef(null);

    const handleToggle = () => {
        setIsChecked(handleref.current.checked);
        checktoggle(handleref.current.checked); 
    };
    return (
        <div>
            <label className={tstyle.switch}>
                <input
                    type="checkbox"
                    onChange={handleToggle}
                    ref={handleref}
                    checked={isChecked}
                />
                <span className={tstyle.slider}></span>
            </label>
        </div>
    );
};

export default Toggle;
