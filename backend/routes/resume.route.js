import express from "express";

import {
    createResume,
    getUserResumes,
    getResumeById,
    updateResume,
    deleteResume,
} from "../controllers/resume.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { uploadResumeImages } from "../controllers/uploadimages.controller.js";

const router = express.Router();


router.post("/", protect, createResume);
router.get("/", protect, getUserResumes);
router.get("/:id", protect, getResumeById);
router.put("/:id", protect, updateResume);
router.put("/:id/upload-images", protect, uploadResumeImages);
router.delete("/:id", protect, deleteResume);

export default router;
