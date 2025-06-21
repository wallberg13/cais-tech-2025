import { Router } from "express";

import UserRoutes from "./routes/UserRoutes";
import AccountingCodeRoutes from "./routes/AccountingCodeRoutes";

const router = Router();

router.use("/user", UserRoutes);
router.use("/accounting-code", AccountingCodeRoutes);

export default router;
