import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Home/Dashboard";
import LandingPage from "./pages/LandingPage";
import EditResume from "./pages/ResumeUpdate/EditResume";
import UserProvider from "./context/UserContext";


function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume/:resumeId" element={<EditResume />} />
      </Routes>

      <Toaster
        toastOptions={{
          style: { fontSize: "13px" },
        }}
      />
    </UserProvider>
  );
}

export default App;

// function App() {
//   return (
//     <UserProvider>
//       <div>

//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/resume/:resumeId" element={<EditResume />} />
//         </Routes>

//       </div>

//       <Toaster toastOptions={{
//         className: "",
//         style: {
//           fontSize: "13px"
//         },
//       }} />
//     </UserProvider>
//   );
// }