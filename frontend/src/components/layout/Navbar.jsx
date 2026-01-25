import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ProfileInfoCard from "../cards/ProfileInfoCard";
import { UserContext } from "../../context/UserContext";

const Navbar = ({ setOpenAuthModal }) => {
    const { user } = useContext(UserContext);

    return (
        <nav className="w-full bg-white border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">

                <Link to="/">
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



// import React from "react";
// import ProfileInfoCard from "../Cards/ProfileInfoCard";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//     return (
//         <div className="w-[85%] min-h-full bg-white px-4 pt-6 mx-auto">
//             <div className="container mx-auto px-4 flex justify-between items-center mb-16">
//                 <Link to="/dashboard">
//                     <h2 className="text-3xl font-bold text-black leading-5">
//                         Resumify
//                     </h2>
//                 </Link>

//                 <ProfileInfoCard />
//             </div>
//         </div>
//     );
// };

// export default Navbar;
