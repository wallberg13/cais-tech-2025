import AccountingCodeRepository from '@db/repositories/AccountingCodeRepository';

export default class DeleteAccountingCodeService {
  async execute(id: number): Promise<number> {
    return await AccountingCodeRepository.delete(id);
  }
}
