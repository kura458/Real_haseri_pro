import { clientApi } from "@/src/lib/api/client";
import { API_ROUTES } from "@/src/constants/api-routes";

export const paymentsApi = {
  initiateCustomerVerification: () =>
    clientApi.post(API_ROUTES.CUSTOMER.VERIFY),
};