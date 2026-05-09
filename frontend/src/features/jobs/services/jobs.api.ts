import { clientApi } from "@/src/lib/api/client";
import { API_ROUTES } from "@/src/constants/api-routes";
import type { Job, CreateJobInput, JobApplication, JobCategory, JobFilters } from "../types";

export const jobsApi = {
  // Categories
  getCategories: () =>
    clientApi.get<{ success: boolean; data: JobCategory[] }>(API_ROUTES.JOBS.CATEGORIES),

  createCategory: (data: { name: string; description?: string }) =>
    clientApi.post(API_ROUTES.JOBS.CATEGORIES, data),

  updateCategory: (id: number, data: { name?: string; description?: string }) =>
    clientApi.put(API_ROUTES.JOBS.CATEGORIES + `/${id}`, data),

  deleteCategory: (id: number) =>
    clientApi.delete(API_ROUTES.JOBS.CATEGORIES + `/${id}`),

  // Admin Categories
  adminGetCategories: () =>
    clientApi.get<{ success: boolean; data: JobCategory[] }>(API_ROUTES.ADMIN.CATEGORIES),

  adminCreateCategory: (data: { name: string; description?: string }) =>
    clientApi.post(API_ROUTES.ADMIN.CATEGORIES, data),

  adminUpdateCategory: (id: number, data: { name?: string; description?: string }) =>
    clientApi.put(API_ROUTES.ADMIN.CATEGORIES + `/${id}`, data),

  adminDeleteCategory: (id: number) =>
    clientApi.delete(API_ROUTES.ADMIN.CATEGORIES + `/${id}`),

  // Jobs
  getAll: (filters?: JobFilters) =>
    clientApi.get<{ success: boolean; data: Job[] }>(API_ROUTES.JOBS.BASE, { params: filters }),

  adminGetAll: () =>
    clientApi.get<{ success: boolean; data: Job[] }>(API_ROUTES.ADMIN.JOBS),

  adminDelete: (id: string) =>
    clientApi.delete(API_ROUTES.ADMIN.JOBS + `/${id}`),

  getById: (id: string) =>
    clientApi.get<{ success: boolean; data: Job }>(API_ROUTES.JOBS.DETAIL(id)),

  update: (id: string, data: Partial<CreateJobInput>) =>
    clientApi.put<{ success: boolean; data: Job }>(API_ROUTES.JOBS.DETAIL(id), data),

  delete: (id: string) =>
    clientApi.delete(API_ROUTES.JOBS.DETAIL(id)),

  create: (data: CreateJobInput) =>
    clientApi.post<{ success: boolean; data: Job }>(API_ROUTES.JOBS.BASE, data),

  getMine: () =>
    clientApi.get<{ success: boolean; data: Job[] }>(API_ROUTES.JOBS.MINE),

  complete: (id: string) =>
    clientApi.put(API_ROUTES.JOBS.COMPLETE(id)),

  cancel: (id: string) =>
    clientApi.put(API_ROUTES.JOBS.CANCEL(id)),

  // Applications
  apply: (jobId: string, data?: { message?: string; proposed_price?: number }) =>
    clientApi.post(API_ROUTES.JOBS.APPLY(jobId), data),

  getApplications: (jobId: string) =>
    clientApi.get<{ success: boolean; data: JobApplication[] }>(API_ROUTES.JOBS.APPLICATIONS(jobId)),

  getMyApplications: () =>
    clientApi.get<{ success: boolean; data: JobApplication[] }>(API_ROUTES.APPLICATIONS.MINE),

  acceptApplication: (id: string) =>
    clientApi.put(API_ROUTES.APPLICATIONS.ACCEPT(id)),

  rejectApplication: (id: string) =>
    clientApi.put(API_ROUTES.APPLICATIONS.REJECT(id)),

  updateApplication: (id: string, data: { message?: string; proposed_price?: number }) =>
    clientApi.put<{ success: boolean; data: any }>(`/applications/${id}`, data),

  withdrawApplication: (id: string) =>
    clientApi.delete<{ success: boolean; data: any }>(`/applications/${id}`),
};