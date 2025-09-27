import express from 'express';
import { get_analytics } from '../controllers/analytics.controller.ts';

const router = express.Router();

router.get("/analytics", get_analytics)

export default router;