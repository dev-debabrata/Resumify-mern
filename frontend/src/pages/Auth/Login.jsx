import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '../../components/inputs/Input';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/UserContext';
import axiosInstance from '../../utils/axios';
import { API_PATHS } from '../../utils/apiPaths';

const Login = ({ setCurrentPage }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateEmail(email.trim())) {
            const msg = "Please enter a valid email address.";
            setError(msg);
            toast.error(msg);
            return;
        }

        if (!password) {
            const msg = "Please enter the password.";
            setError(msg);
            toast.error(msg);
            return;
        }

        try {
            const response = await axiosInstance.post(
                API_PATHS.AUTH.LOGIN,
                { email, password }
            );

            const { token } = response.data;

            if (token) {
                localStorage.setItem("token", token);
            }

            updateUser(response.data);
            toast.success("Login successful 🎉");
            navigate("/dashboard");

        } catch (err) {
            const msg =
                err.response?.data?.message ||
                "Something went wrong. Please try again.";

            setError(msg);
            toast.error(msg);
        }
    };


    return (
        <div className="w-[90vw] md:w-[30vw] p-7 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-center text-black">
                Welcome Back
            </h3>

            <p className="text-xs text-slate-700 text-center mt-[5px] mb-6">
                Please enter your details to log in
            </p>

            <form onSubmit={handleLogin}>

                <Input
                    type="email"
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

                <button
                    type="submit"
                    className="btn-primary">
                    Login
                </button>

                <p className="text-[13px] text-slate-800 mt-3 text-center">
                    Don&apos;t have an account?{" "}
                    <button
                        type="button"
                        onClick={() => setCurrentPage("signup")}
                        className="font-medium text-primary underline cursor-pointer hover:text-blue-800"
                    >
                        Sign Up
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Login;



// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Input from '../../components/inputs/Input';
// import { validateEmail } from '../../utils/helper';
// import { UserContext } from '../../context/userContext';
// import axiosInstance from '../../utils/axios';
// import { API_PATHS } from '../../utils/apiPaths';

// const Login = ({ setCurrentPage }) => {

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");

//     const { updateUser } = useContext(UserContext);
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError("");

//         if (!validateEmail(email.trim())) {
//             setError("Please enter a valid email address.");
//             return;
//         }

//         if (!password) {
//             setError("Please enter the password.");
//             return;
//         }

//         // Login API Call
//         try {
//             const response = await axiosInstance.post(
//                 API_PATHS.AUTH.LOGIN,
//                 {
//                     email,
//                     password,
//                 }
//             );

//             const { token } = response.data;

//             if (token) {
//                 localStorage.setItem("token", token);
//             }

//             updateUser(response.data);
//             navigate("/dashboard");
//         } catch (error) {
//             if (error.response?.data?.message) {
//                 setError(error.response.data.message);
//             } else {
//                 setError("Something went wrong. Please try again.");
//             }
//         }

//     };