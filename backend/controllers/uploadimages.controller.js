import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Resume from "../models/Resume.js";
import upload from "../middleware/upload.middleware.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const uploadResumeImages = async (req, res) => {
    try {
        upload.fields([
            { name: "thumbnail", maxCount: 1 },
            { name: "profileImage", maxCount: 1 },
        ])(req, res, async (err) => {
            if (err) {
                return res.status(400).json({
                    message: "File upload failed",
                    error: err.message,
                });
            }

            const resumeId = req.params.id;

            const resume = await Resume.findOne({
                _id: resumeId,
                userId: req.user._id,
            });

            if (!resume) {
                return res.status(404).json({
                    message: "Resume not found or unauthorized",
                });
            }

            const uploadsFolder = path.join(__dirname, "..", "uploads");
            const baseUrl = `${req.protocol}://${req.get("host")}`;

            const newThumbnail = req.files?.thumbnail?.[0];
            const newProfileImage = req.files?.profileImage?.[0];


            // Handle Thumbnail
            if (newThumbnail) {
                if (resume.thumbnailLink) {
                    const oldThumbnail = path.join(
                        uploadsFolder,
                        path.basename(resume.thumbnailLink)
                    );
                    if (fs.existsSync(oldThumbnail)) {
                        fs.unlinkSync(oldThumbnail);
                    }
                }

                resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
            }

            // Handle Profile Image
            if (newProfileImage) {
                if (resume.profileInfo?.profilePreviewUrl) {
                    const oldProfile = path.join(
                        uploadsFolder,
                        path.basename(resume.profileInfo.profilePreviewUrl)
                    );
                    if (fs.existsSync(oldProfile)) {
                        fs.unlinkSync(oldProfile);
                    }
                }

                resume.profileInfo.profilePreviewUrl =
                    `${baseUrl}/uploads/${newProfileImage.filename}`;
            }

            await resume.save();

            return res.status(200).json({
                message: "Images uploaded successfully",
                thumbnailLink: resume.thumbnailLink,
                profilePreviewUrl: resume.profileInfo.profilePreviewUrl,
            });
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to upload images",
            error: error.message,
        });
    }
};
