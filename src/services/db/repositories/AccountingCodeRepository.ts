import { AccountingCode } from "../entities/AccountingCode";
import BaseRepository from "./BaseRepository";

class AccountingCodeRepository extends BaseRepository<AccountingCode> {
  constructor() {
    super("accounting_codes");
  }
}

export default new AccountingCodeRepository();
