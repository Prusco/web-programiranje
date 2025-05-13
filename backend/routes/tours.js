import express from "express";

import { createTour, updateTour, deleteTour, getAllTours, getSingleTour, getTourBySearch, getFeaturedTours, getTourCount } from "../controllers/tourController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router()

router.post('/', verifyAdmin, createTour)
router.put('/:id', verifyAdmin, updateTour)
router.delete('/:id', verifyAdmin, deleteTour)
router.get('/:id', getSingleTour)
router.get('/', getAllTours)
router.get('/search/getTourBySearch', getTourBySearch)
router.get('/search/getFeaturedTours', getFeaturedTours)
router.get('/search/getTourCount', getTourCount)

export default router;
