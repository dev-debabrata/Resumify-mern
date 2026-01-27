import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ProfileInfoCard from "../cards/ProfileInfoCard";
import { UserContext } from "../../context/UserContext";

const Navbar = ({ setOpenAuthModal }) => {
    const { user } = useContext(UserContext);

    return (
        <nav className="w-full bg-white border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">

                <Link to="">
                    <h2 className="text-3xl font-bold text-black">
                        Resumify
                    </h2>
                </Link>

                {user ? (
                    <ProfileInfoCard />
                ) : (
                    <button
                        onClick={() => setOpenAuthModal(true)}
                        className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                        Login / Sign up
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

