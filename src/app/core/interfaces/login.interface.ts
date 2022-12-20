export interface Login {
  email: string;
  password: string;
  language_code: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at: string;
  role_id: number;
  slug: string;
  company_name: string;
  tax_identity_number: number;
  api_token: string;
  avatar: string;
}