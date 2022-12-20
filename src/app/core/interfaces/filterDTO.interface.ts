export interface FilterDTO<T> {
  data: {
    data: T;
    current_page?: number;
    per_page?: number;
    total?: number;
  };
  success: boolean;
}
