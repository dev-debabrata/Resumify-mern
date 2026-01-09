import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Resume from "../models/Resume.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export const createResume = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Resume title is required",
            });
        }

        // Default resume structure
        const defaultResumeData = {
            template: {
                theme: "modern",
                colorPalette: ["#111827", "#4f46e5"],
            },

            profileInfo: {
                profilePreviewUrl: "",
                fullName: "",
                designation: "",
                summary: "",
            },

            contactInfo: {
                email: "",
                phone: "",
                location: "",
                linkedin: "",
                github: "",
                website: "",
            },

            workExperience: [
                {
                    company: "",
                    role: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                },
            ],

            education: [
                {
                    degree: "",
                    institution: "",
                    startDate: "",
                    endDate: "",
                },
            ],

            skills: [
                {
                    name: "",
                    progress: 0,
                },
            ],

            projects: [
                {
                    title: "",
                    description: "",
                    github: "",
                    liveDemo: "",
                },
            ],

            certifications: [
                {
                    title: "",
                    issuer: "",
                    year: "",
                },
            ],

            languages: [
                {
                    name: "",
                    progress: 0,
                },
            ],

            interests: [""],
        };

        const newResume = await Resume.create({
            userId: req.user._id,
            title,
            ...defaultResumeData,
        });

        return res.status(201).json(newResume);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to create resume",
            error: error.message,
        });
    }
};


export const getUserResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({
            userId: req.user._id,
        }).sort({ updatedAt: -1 });

        return res.json(resumes);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch resumes",
            error: error.message,
        });
    }
};

export const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found",
            });
        }

        return res.json(resume);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch resume",
            error: error.message,
        });
    }
};


export const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found or unauthorized",
            });
        }

        // Merge updates
        Object.assign(resume, req.body);

        const savedResume = await resume.save();

        return res.json(savedResume);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to update resume",
            error: error.message,
        });
    }
};


export const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found or unauthorized",
            });
        }

        const uploadsFolder = path.join(__dirname, "..", "uploads");

        // Delete thumbnail
        if (resume.thumbnailLink) {
            const oldThumbnail = path.join(
                uploadsFolder,
                path.basename(resume.thumbnailLink)
            );
            if (fs.existsSync(oldThumbnail)) {
                fs.unlinkSync(oldThumbnail);
            }
        }

        // Delete profile image
        if (resume.profileInfo?.profilePreviewUrl) {
            const oldProfile = path.join(
                uploadsFolder,
                path.basename(resume.profileInfo.profilePreviewUrl)
            );
            if (fs.existsSync(oldProfile)) {
                fs.unlinkSync(oldProfile);
            }
        }

        await Resume.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        });

        return res.json({
            message: "Resume deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete resume",
            error: error.message,
        });
    }
};
