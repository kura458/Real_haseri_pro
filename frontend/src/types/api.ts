export type ID = string;

export type Timestamp = string;

export type ApiSuccess<T> = {
  success: true;
  message?: string;
  data: T;
};

export type ApiFailure = {
  success: false;
  message: string;
  errorCode?: string;
  details?: unknown;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PaginatedResponse<T> = ApiSuccess<{
  items: T[];
  meta: PaginationMeta;
}>;

export type BaseEntity = {
  id: ID;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};