import { Router } from "express";
import { getAllTransaction } from "../controller/showTransactionController.js";

const router = Router();

router.get("/transaction", getAllTransaction);

export default router;
