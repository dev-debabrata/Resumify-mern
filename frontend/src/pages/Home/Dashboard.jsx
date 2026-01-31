import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CirclePlus } from 'lucide-react';
import moment from "moment";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/apiPaths";

import DashboardLayout from "../../components/layout/DashboardLayout";

import Modal from "../../components/Modal";
import CreateResumeForm from "./CreateResumeForm";
import ResumeSummaryCard from "../../components/cards/ResumeSummaryCard";

const Dashboard = () => {
    const navigate = useNavigate();

    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [allResumes, setAllResumes] = useState(null);

    const fetchAllResumes = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
            setAllResumes(response.data);
        } catch (error) {
            console.error("Error fetching resumes:", error);
        }
    };

    useEffect(() => {
        fetchAllResumes();
    }, []);

    return (
        <DashboardLayout>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">

                {/* Add New Resume Card */}
                <div
                    onClick={() => setOpenCreateModal(true)}
                    className="h-[300px] flex flex-col gap-5 items-center justify-center bg-white rounded-lg border border-purple-100 hover:border-purple-300 hover:bg-purple-50/5 cursor-pointer transition"
                >
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-200/40">
                        <CirclePlus className="text-xl text-purple-500" />
                    </div>

                    <h3 className="font-medium text-gray-800">
                        Add New Resume
                    </h3>
                </div>

                {/* Resume Cards */}
                {allResumes?.map((resume) => (
                    <ResumeSummaryCard
                        key={resume?._id}
                        imgUrl={resume?.thumbnailLink || null}
                        title={resume?.title}
                        lastUpdated={
                            resume?.updatedAt
                                ? moment(resume.updatedAt).format("Do MMM YYYY")
                                : ""
                        }
                        onSelect={() => navigate(`/resume/${resume?._id}`)}
                    />
                ))}
            </div>

            {/* Create Resume Modal */}
            <Modal
                isOpen={openCreateModal}
                hideHeader
                onClose={() => setOpenCreateModal(false)}
            >
                <CreateResumeForm
                    onSuccess={(id) => navigate(`/resume/${id}`)}
                    onCancel={() => setOpenCreateModal(false)}
                />
            </Modal>
        </DashboardLayout>
    );
};

export default Dashboard;
