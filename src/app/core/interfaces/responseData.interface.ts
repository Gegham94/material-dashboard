export interface ResponseDTO<T = unknown> {
  data: T;
  success: boolean;
  errors?: any;
}
