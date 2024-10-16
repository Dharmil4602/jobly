import express from 'express'
import userInput from '../controller/UserInput.ts'
const router = express.Router()

router.post('/analyze', userInput)

export default router