export interface AccountingCode {
  id?: number;

  code: string;
  name: string;
  anual_depreciation_rate: number;
  residual: number;

  deleted?: boolean;
  active?: boolean;

  created_at?: Date;
  updated_at?: Date;

  created_by?: number;
  created_name?: number;
  updated_by?: number;
  updated_name?: number;
}
