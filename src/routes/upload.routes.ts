import { UploadController } from "@/controllers/upload.controller";
import { UploadService } from "@/services/upload.service";
import { Router } from "express";

const router = Router();
const uploadService = new UploadService();
const uploadController = new UploadController(uploadService);
// router.post("/create", monitoringController.createHero);
router.post("/upload-large", uploadController.uploadFileLarge);
router.post("/upload-large1", uploadController.uploadFileLarge1);

export default router;