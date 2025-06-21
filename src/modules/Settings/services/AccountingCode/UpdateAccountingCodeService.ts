import AccountingCodeRepository from '@db/repositories/AccountingCodeRepository';
import { AccountingCode } from '@db/entities/AccountingCode';

export default class UpdateAccountingCodeService {
  async execute(id: number, data: Partial<AccountingCode>): Promise<number> {
    return await AccountingCodeRepository.update(id, data);
  }
}
