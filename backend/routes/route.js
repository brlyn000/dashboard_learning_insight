import express from "express"
import {
    getUsers,
    getUsersById,
    getDeveloperJourneyCompletions,
    getTimeSpentLearning
} from "../controllers/Controller.js"
import { verifyToken } from "../middleware/verifyToken.js"
const router = express.Router()

router.get('/users', getUsers)
router.get('/users/:id', getUsersById)
router.get('/developer-journey-completions', verifyToken, getDeveloperJourneyCompletions)
router.get('/time-spent-learning', getTimeSpentLearning)

export default router