import React, { Children, useContext } from 'react'
import { UserContext } from '../../context/UserContext';
import Navbar from './Navbar';

const DashboardLayout = () => {
    const { user } = useContext(UserContext);
    return (
        <div>
            <Navbar activeManu={activeManu} />

            {user && <div className="container mx-auto pt-4 pb-4">{Children}</div>}
        </div>
    )
}

export default DashboardLayout