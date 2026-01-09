import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import { UserContext } from '../../context/userContext';
import axiosInstance from '../../utils/axios';
import { API_PATHS } from '../../utils/apiPaths';
import uploadImage from '../../utils/uploadImage';

const SignUp = ({ setCurrentPage }) => {

    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");   // ✅ FIXED
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!fullName.trim()) {
            setError("Please enter your full name.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter the password.");
            return;
        }

        setError("");

        console.log({
            fullName,
            email,
            password,
            profilePic,
        });

        // Signup API Call
        try {
            let profileImageUrl = "";

            // Upload image if present
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
            navigate("/dashboard");
        } catch (error) {
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-black">
                Create an Account
            </h3>

            <p className="text-xs text-slate-700 mt-[5px] mb-6">
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
                    placeholder="Debabrata Das"
                    onChange={({ target }) => setFullName(target.value)}
                />

                <Input
                    type="text"
                    value={email}
                    label="Email Address"
                    placeholder="dev-debabrata@gmail.com"
                    onChange={({ target }) => setEmail(target.value)}
                />

                <Input
                    type="password"  // ✅ FIXED
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
                    Sign Up
                </button>

                <p className="text-[13px] text-slate-800 mt-3">
                    Already have an account?{" "}
                    <button
                        type="button"   // ✅ CRITICAL FIX
                        onClick={() => setCurrentPage("login")}
                        className="font-medium text-primary underline cursor-pointer"
                    >
                        Login
                    </button>
                </p>
            </form>
        </div>
    );
};

export default SignUp;
