import { Router } from "express";
import { deleteShowtime, getAllShowTime, insertShowtime, updateShowtime } from "../controller/showTimeController.js";

const router = Router();

router.post("/show_time", getAllShowTime);
router.post("/insert-showtime", insertShowtime);
router.post("/update-showtime", updateShowtime);
router.delete("/delete-showtime/:showtime_id", deleteShowtime);

export default router;
