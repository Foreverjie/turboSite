import express, { Router } from 'express'
import {
  getAllUsersHandler,
  getMeHandler,
} from '../controllers/user.controller'
import { deserializeUser } from '../middlewares/deserializeUser'
import { requireUser } from '../middlewares/requireUser'
import { restrictTo } from '../middlewares/restrictTo'

const router: Router = express.Router()
router.use(deserializeUser, requireUser)

// Admin Get Users route
router.get('/', restrictTo('admin'), getAllUsersHandler)

// Get my info route
router.get('/me', getMeHandler)

export default router
