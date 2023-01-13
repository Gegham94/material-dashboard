import { UserType } from '../enums/user-type.enum';
export interface PublicUser {
  id: number;
  first_name: string;
  last_name: string;
  company_name: string;
  tax_identity_number: string;
  email: string;
  email_verified_at: string;
  role_id: UserType;
  avatar: string;
  slug: string;
  phone: string;
  api_token: string;
}