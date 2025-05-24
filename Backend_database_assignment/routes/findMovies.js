import { Router } from "express";
import { findMovies } from "../controller/findMoviesController.js";

const router = Router();

router.get("/movies", findMovies);

export default router;
