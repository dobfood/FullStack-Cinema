import express from "express";
import{ googleAuth } from "../controller/auth.js";
const router = express.Router()

router.post('/signup')

router.post('/signin')

router.post('/google',googleAuth)

export default router