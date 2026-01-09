import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import { validateEmail } from '../../utils/helper';

const Login = ({ setCurrentPage }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateEmail(email.trim())) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter the password.");
            return;
        }

        try {
            console.log({ email, password });
            // API call here
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-black">
                Welcome Back
            </h3>

            <p className="text-xs text-slate-700 mt-[5px] mb-6">
                Please enter your details to log in
            </p>

            <form onSubmit={handleLogin}>

                <Input
                    type="text"
                    value={email}
                    label="Email Address"
                    placeholder="dev-debabrata@gmail.com"
                    onChange={({ target }) => setEmail(target.value)}
                />

                <Input
                    type="password"
                    value={password}
                    label="Password"
                    placeholder="Min 8 Characters"
                    onChange={({ target }) => setPassword(target.value)}
                />

                {error && (
                    <p className="text-red-500 text-xs pb-2.5">
                        {error}
                    </p>
                )}

                <button type="submit" className="btn-primary">
                    Login
                </button>

                <p className="text-[13px] text-slate-800 mt-3">
                    Don&apos;t have an account?{" "}
                    <button
                        type="button"
                        onClick={() => setCurrentPage("signup")}
                        className="font-medium text-primary underline cursor-pointer"
                    >
                        Sign Up
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Login;
