import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // track loading state

    useEffect(() => {
        const fetchUser = async () => {
            const accessToken = localStorage.getItem("token");

            // No token → stop loading
            if (!accessToken) {
                setLoading(false);
                return;
            }

            try {
                const response = await axiosInstance.get(
                    API_PATHS.AUTH.GET_PROFILE
                );
                setUser(response.data);
            } catch (error) {
                console.error("User not authenticated", error);
                clearUser();
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // Save user after login/signup
    const updateUser = (userData) => {
        setUser(userData);

        if (userData?.token) {
            localStorage.setItem("token", userData.token);
        }

        setLoading(false);
    };

    // Clear user on logout
    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("token");
        setLoading(false);
    };

    return (
        <UserContext.Provider
            value={{
                user,
                loading,
                updateUser,
                clearUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;



// import React, { createContext, useState, useEffect } from "react";
// import axiosInstance from "../utils/axios";
// import { API_PATHS } from "../utils/apiPaths";

// // Create Context
// export const UserContext = createContext(null);

// // Provider Component
// const UserProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // 🔥 Restore user on page refresh
//     useEffect(() => {
//         const token = localStorage.getItem("token");

//         if (!token) {
//             setLoading(false);
//             return;
//         }

//         const fetchUser = async () => {
//             try {
//                 const response = await axiosInstance.get(
//                     API_PATHS.AUTH.GET_PROFILE
//                 );
//                 setUser(response.data);
//             } catch (error) {
//                 console.error("User not authenticated", error);
//                 localStorage.removeItem("token");
//                 setUser(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUser();
//     }, []);

//     // Update user after login/signup
//     const updateUser = (userData) => {
//         setUser(userData);
//         if (userData?.token) {
//             localStorage.setItem("token", userData.token);
//         }
//     };

//     // Clear user on logout
//     const clearUser = () => {
//         setUser(null);
//         localStorage.removeItem("token");
//     };

//     return (
//         <UserContext.Provider
//             value={{
//                 user,
//                 loading,
//                 updateUser,
//                 clearUser,
//             }}
//         >
//             {children}
//         </UserContext.Provider>
//     );
// };

// export default UserProvider;


// import React, { createContext, useState, useEffect } from "react";
// import axiosInstance from "../utils/axios";
// import { API_PATHS } from "../utils/apiPaths";

// // Create Context
// export const UserContext = createContext(null);

// // Provider Component
// const UserProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // Fetch logged-in user
//     useEffect(() => {
//         if (user) return;

//         const accessToken = localStorage.getItem("token");
//         if (!accessToken) {
//             setLoading(false);
//             return;
//         }

//         const fetchUser = async () => {
//             const accessToken = localStorage.getItem("token");

//             if (!accessToken) {
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 const response = await axiosInstance.get(
//                     API_PATHS.AUTH.GET_PROFILE
//                 );
//                 setUser(response.data);
//             } catch (error) {
//                 console.error("User not authenticated", error);
//                 clearUser();
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUser();
//     }, []);

//     // Update user after login/signup
//     const updateUser = (userData) => {
//         setUser(userData);
//         if (userData?.token) {
//             localStorage.setItem("token", userData.token);
//         }
//         setLoading(false);
//     };

//     // Clear user on logout
//     const clearUser = () => {
//         setUser(null);
//         localStorage.removeItem("token");
//         setLoading(false);
//     };

//     return (
//         <UserContext.Provider
//             value={{
//                 user,
//                 loading,
//                 updateUser,
//                 clearUser,
//             }}
//         >
//             {children}
//         </UserContext.Provider>
//     );
// };

// export default UserProvider;
