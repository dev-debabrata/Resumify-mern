import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layout/DashboardLayout";

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

    return <DashboardLayout>Dashboard</DashboardLayout>;
};

export default Dashboard;
