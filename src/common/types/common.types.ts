type FieldErrorType = {
  error: string;
  field: string;
};

export type ResponseApiType<D = {}> = {
  resultCode: number;
  messages: string[];
  data: D;
  fieldsErrors: FieldErrorType[];
};