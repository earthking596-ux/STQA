export interface PracticalSummary {
  id: string;
  practical_number: string;
  practical_name: string;
  display_order: number;
  created_at: string;
}

export interface PracticalRecord extends PracticalSummary {
  source_code: string;
}
