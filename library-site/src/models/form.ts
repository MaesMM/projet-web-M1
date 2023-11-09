export type DataCreateForm = {
  label: string;
  name: string;
  multiple?: boolean;
  selectOptions?: (value: string[]) => void;
  type: 'select' | 'text' | 'number' | 'listInput';
  defaultValue?: string | number;
  defaultValues?: string[];
  options?: { value: string; label: string }[];
};
