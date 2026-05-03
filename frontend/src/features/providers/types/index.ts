export type ProviderVerificationStatus = {
  status: string;
  rejection_reason: string | null;
};

export type ProviderSkill = {
  id: number;
  user_id: number;
  skill_name: string;
};

export type ProviderProfile = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  cover_image: string | null;
  role: string;
  address: {
    city: string;
    sub_city: string | null;
    specific_location: string | null;
  } | null;
  skills: ProviderSkill[];
  technician_verification: ProviderVerificationStatus | null;
};