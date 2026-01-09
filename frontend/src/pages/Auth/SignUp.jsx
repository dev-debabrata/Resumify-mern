import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '../../components/inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import { UserContext } from '../../context/UserContext';
import axiosInstance from '../../utils/axios';
import { API_PATHS } from '../../utils/apiPaths';
import uploadImage from '../../utils/uploadImage';

const SignUp = ({ setCurrentPage }) => {

    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");

        if (!fullName.trim()) {
            const msg = "Please enter your full name.";
            setError(msg);
            toast.error(msg);
            return;
        }

        if (!validateEmail(email)) {
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
            let profileImageUrl = "";

            if (profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
                profileImageUrl = imgUploadRes?.imageUrl || "";
            }

            const response = await axiosInstance.post(
                API_PATHS.AUTH.REGISTER,
                {
                    name: fullName,
                    email,
                    password,
                    profileImageUrl,
                }
            );

            const { token } = response.data;

            if (token) {
                localStorage.setItem("token", token);
            }

            updateUser(response.data);
            toast.success("Account created successfully 🎉");
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
            <h3 className="text-lg font-semibold text-black text-center">
                Create an Account
            </h3>

            <p className="text-xs text-center text-slate-700 mt-[5px] mb-4">
                Join us today by entering your details below.
            </p>

            <form onSubmit={handleSignUp}>

                <ProfilePhotoSelector
                    image={profilePic}
                    setImage={setProfilePic}
                />

                <Input
                    type="text"
                    value={fullName}
                    label="Full Name"
                    placeholder="Enter your name"
                    onChange={({ target }) => setFullName(target.value)}
                />

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
                    Sign Up
                </button>

                <p className="text-[13px] text-center text-slate-800 mt-3">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => setCurrentPage("login")}
                        className="font-medium text-primary underline cursor-pointer hover:text-blue-800"
                    >
                        Login
                    </button>
                </p>
            </form>
        </div>
    );
};

export default SignUp;
