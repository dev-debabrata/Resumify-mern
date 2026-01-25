import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Navbar from './Navbar';

const DashboardLayout = ({ children }) => {
    const { user } = useContext(UserContext);

    const activeMenu = "dashboard";

    return (
        <div>
            <Navbar activeMenu={activeMenu} />

            {user && (
                <div className=" max-w-6xl mx-auto pt-4 pb-4">
                    {children}
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;
