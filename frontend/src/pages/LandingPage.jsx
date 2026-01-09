import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeroImg from "../assets/hero-img.png";
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Modal from '../components/Modal';
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../components/cards/ProfileInfoCard';

const LandingPage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [currentPage, setCurrentPage] = useState("login");

    const handleCTA = () => { };

    return (
        <div className=" w-[85%] min-h-full bg-white px-4 py-6 mx-auto">
            <div className="container mx-auto px-4">
                {/* Header */}
                <header className="flex justify-between items-center mb-16">
                    <div className="text-xl font-bold">
                        Resumify
                    </div>
                    {user ? <ProfileInfoCard /> :
                        <button onClick={() => setOpenAuthModal(true)} className="bg-purple-100 text-sm font-semibold text-black px-7 py-2.5 rounded-lg hover:bg-gray-800 hover:text-white transition-colors cursor-pointer">
                            Login / Sign up
                        </button>
                    }
                </header>

                {/* Hero Content */}
                <div className=" flex flex-col md:flex-row items-center">
                    <div className=' w-full md:w-1/2 pr-4 mb-8 md:mb-0'>
                        <h1 className=' text-5xl font-bold mb-6 leading-tight'>
                            Build Your{" "}
                            <span className=' text-transparent bg-clip-text bg-[ra]'>
                                Resume Effortlessly
                            </span>
                        </h1>
                        <p className=' text-lg text-gray-700 mb-8'>
                            Craft a job-winning, ATS-friendly resume in minutes with our smart AI-powered resume builder. Choose from modern templates and download your professional CV instantly.
                        </p>
                        <button className=' bg-black text-sm font-semibold text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer'>
                            Get Started
                        </button>
                    </div>
                    <div className=' w-full md:w-1/2'>
                        <img src={HeroImg} alt="Hero Image" className=' w-full rounded-lg' />
                    </div>
                </div>

                <section className=' mt-5'>
                    <h2 className=' text-2xl font-bold text-center mb-12'>
                        Features that make you shine
                    </h2>
                    <div className=' grid grid-cols-1 md:grid-cols-3 gap-8'>
                        <div className=' bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition'>
                            <h3 className=' text-lg font-semibold mb-3'>
                                Easy Editing
                            </h3>
                            <p className=' text-gray-600'>
                                Update your resume sections with live preview and instant formatting.
                            </p>
                        </div>

                        <div className=' bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition'>
                            <h3 className=' text-lg font-semibold mb-3'>
                                Beautiful Templates
                            </h3>
                            <p className=' text-gray-600'>
                                Choose from modern, professional templates that are easy to customize.
                            </p>
                        </div>

                        <div className=' bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition'>
                            <h3 className=' text-lg font-semibold mb-3'>
                                AI Resume Analysis
                            </h3>
                            <p className=' text-gray-600'>
                                Get an instant ATS score and detailed feedback to improve your resume's impact.
                            </p>
                        </div>
                    </div>
                </section>
            </div>


            <Modal
                isOpen={openAuthModal}
                onClose={() => {
                    setOpenAuthModal(false);
                    setCurrentPage("login");
                }}
                hideHeader
            >
                <div>
                    {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
                    {currentPage === "signup" && (
                        <SignUp setCurrentPage={setCurrentPage} />
                    )}
                </div>
            </Modal>
        </div>
    )
}

export default LandingPage