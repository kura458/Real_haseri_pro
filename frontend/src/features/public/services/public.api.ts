import { clientApi } from "@/src/lib/api/client";
import { API_ROUTES } from "@/src/constants/api-routes";

export const publicApi = {
  getTopTechnicians: () =>
    clientApi.get(API_ROUTES.PUBLIC.TOP_TECHNICIANS),

  getRecentJobs: () =>
    clientApi.get(API_ROUTES.PUBLIC.RECENT_JOBS),

  getHighPriceJobs: () =>
    clientApi.get(API_ROUTES.PUBLIC.HIGH_PRICE_JOBS),

  getStats: () =>
    clientApi.get(API_ROUTES.PUBLIC.STATS),

  getTechnician: (id: string) =>
    clientApi.get(API_ROUTES.PUBLIC.TECHNICIAN(id)),
};