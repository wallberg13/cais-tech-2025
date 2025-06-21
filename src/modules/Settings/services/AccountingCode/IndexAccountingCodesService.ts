import AccountingCodeRepository from '@db/repositories/AccountingCodeRepository';

export default class IndexAccountingCodesService {
  async execute() {
    return await AccountingCodeRepository.findAll();
  }
}
