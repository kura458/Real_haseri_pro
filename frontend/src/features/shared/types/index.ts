export type ID = string;
export type Timestamp = string;
export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiFailure = {
  success: false;
  error: string;
  errors?: Record<string, string>;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PaginatedResponse<T> = {
  success: true;
  data: {
    items: T[];
    meta: PaginationMeta;
  };
};

export type BaseEntity = {
  id: ID;
  created_at: Timestamp;
  updated_at: Timestamp;
};