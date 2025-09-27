import express from 'express'
import { generate_ai_res } from '../controllers/ai.controller.ts'

const router = express.Router()

router.post('/chat', generate_ai_res)

export default router


