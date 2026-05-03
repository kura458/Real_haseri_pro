export type CustomerVerificationStatus = {
  verified: boolean;
  verified_at: string | null;
};

export type CustomerVerificationResponse = {
  checkout_url: string;
  message: string;
};