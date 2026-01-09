import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const ProfileInfoCard = () => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        clearUser();
        navigate("/");
    };

    if (!user) return null;

    return (
        <div className="flex items-center">
            <img
                src={user.profileImageUrl || "/default-avatar.png"}
                alt="Profile"
                className="w-11 h-11 rounded-full object-cover mr-3"
            />

            <div>
                <div className="text-[15px] font-bold leading-3">
                    {user.name || "User"}
                </div>

                <button
                    className="text-purple-500 text-sm font-semibold cursor-pointer hover:underline"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfileInfoCard;
