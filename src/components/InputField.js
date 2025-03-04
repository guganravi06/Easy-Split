import React, { useState } from 'react';
import styles from './InputField.module.css';

const InputField = ({label,type,value,onChange,placeholder,required=false}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = ()=>{
        setShowPassword(!showPassword);
    }

    const inputType = type === 'password'?(showPassword?'text':'password'):type;
  return (
    <div className={styles.inputContainer}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={styles.inputWrapper}>
            <input 
                className={styles.input}
                type={inputType}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
            {type === "password" && <button onClick={handleShowPassword} className={styles.showPasswordBtn}>{showPassword? "Hide" : "Show"}</button>}
        </div>
    </div>
  )
}

export default InputField