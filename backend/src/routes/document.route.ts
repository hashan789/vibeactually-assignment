import express from 'express'
import { upload } from '../lib/multer.ts'
import { upload_doc } from '../controllers/document.controller.ts'

const router = express.Router()

router.post('/upload', upload.single('document'), upload_doc)

export default router

