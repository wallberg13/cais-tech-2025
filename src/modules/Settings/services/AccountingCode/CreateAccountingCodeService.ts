import AccountingCodeRepository from "@db/repositories/AccountingCodeRepository";
import { AccountingCode } from "@db/entities/AccountingCode";

export default class CreateAccountingCodeService {
  async execute(data: AccountingCode): Promise<number[]> {
    await AccountingCodeRepository.create([data]);
  }
}
