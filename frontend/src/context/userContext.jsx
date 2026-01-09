import { createContext, useState, useEffect, useCallback } from "react";
import axiosInstance from "../utils/axios";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Clear user on logout or auth failure
    const clearUser = useCallback(() => {
        setUser(null);
        localStorage.removeItem("token");
        setLoading(false);
    }, []);

    // Save user after login/signup
    const updateUser = useCallback((userData) => {
        setUser(userData);

        if (userData?.token) {
            localStorage.setItem("token", userData.token);
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const accessToken = localStorage.getItem("token");

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
    }, [clearUser]);

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

// export const UserContext = createContext(null);

// const UserProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // ✅ Clear user safely
//     const clearUser = () => {
//         localStorage.removeItem("token");
//         setUser(null);
//     };

//     // ✅ Restore user on refresh
//     useEffect(() => {
//         let isMounted = true;

//         const fetchUser = async () => {
//             const token = localStorage.getItem("token");

//             if (!token) {
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 const response = await axiosInstance.get(
//                     API_PATHS.AUTH.GET_PROFILE
//                 );

//                 if (isMounted) {
//                     setUser(response.data);
//                 }
//             } catch (error) {
//                 console.error("User not authenticated", error);
//                 clearUser();
//             } finally {
//                 if (isMounted) {
//                     setLoading(false);
//                 }
//             }
//         };

//         fetchUser();

//         return () => {
//             isMounted = false;
//         };
//     }, []);

//     // ✅ Update user after login/signup
//     const updateUser = (userData) => {
//         if (userData?.token) {
//             localStorage.setItem("token", userData.token);
//         }

//         // only store user profile, not token
//         setUser({
//             _id: userData._id,
//             name: userData.name,
//             email: userData.email,
//             profileImageUrl: userData.profileImageUrl,
//         });
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
