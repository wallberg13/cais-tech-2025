// Routes for AccountingCode with prefix 'api/settings/accounting-code'

import { Router } from "express";
import AccountingCodeController from "../controllers/AccountingCodeController";

const router = Router();

/**
 * Route for creating a new AccountingCode
 * POST http(s)://{host}/api/settings/accounting-code
 */
router.post("/", AccountingCodeController.create);

/**
 * Route for getting all AccountingCodes
 * GET http(s)://{host}/api/settings/accounting-code
 */
router.get("/", AccountingCodeController.index);

/**
 * Route for updating a specific AccountingCode by ID
 * PUT http(s)://{host}/api/settings/accounting-code/:id
 */
router.put("/:id", AccountingCodeController.update);

/**
 * Route for deleting a specific AccountingCode by ID
 * PUT http(s)://{host}/api/settings/accounting-code/:id
 */
router.delete("/:id", AccountingCodeController.delete);

export default router;
