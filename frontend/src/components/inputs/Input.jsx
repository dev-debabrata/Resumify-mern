import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'

const Input = ({ value, onChange, label, placeholder, type }) => {

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <label className=' text-md text-slate-800'>
                {label}
            </label>
            <div className=' input-box'>
                <input
                    type={type == "password" ? (showPassword ? "text" : "password") : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e)}
                    className=' w-full bg-transparent outline-none'
                    required
                />

                {type === "password" && (
                    <>
                        {showPassword ? (
                            <Eye
                                size={20}
                                onClick={() => toggleShowPassword()}
                                className=' text-primary cursor-pointer' />
                        ) : (
                            <EyeOff
                                size={20}
                                onClick={() => toggleShowPassword()}
                                className=' text-slate-400 cursor-pointer' />
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Input