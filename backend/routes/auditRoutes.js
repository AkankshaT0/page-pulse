import { Router } from "express";
import { auditPage } from "../controllers/auditController.js";

const router = Router();
router.post("/audit", auditPage);

export default router;
