import { Request, Response } from "express";
import CreateAccountingCodeService from "../services/AccountingCode/CreateAccountingCodeService";
import UpdateAccountingCodeService from "../services/AccountingCode/UpdateAccountingCodeService";
import DeleteAccountingCodeService from "../services/AccountingCode/DeleteAccountingCodeService";
import IndexAccountingCodesService from "../services/AccountingCode/IndexAccountingCodesService";

class AccountingCodeController {
  async create(req: Request, res: Response) {
    const service = new CreateAccountingCodeService();
    const result = await service.execute(req.body);
    res.status(201).json(result);
  }

  async update(req: Request, res: Response) {
    const service = new UpdateAccountingCodeService();
    const result = await service.execute(Number(req.params.id), req.body);
    res.status(200).json(result);
  }

  async delete(req: Request, res: Response) {
    const service = new DeleteAccountingCodeService();
    await service.execute(Number(req.params.id));
    res.status(204).send();
  }

  async index(req: Request, res: Response) {
    const service = new IndexAccountingCodesService();
    const result = await service.execute();
    res.status(200).json(result);
  }
}

export default new AccountingCodeController();
