import { NotificationsInterface } from "./notifications";

export interface ResponseDTO<T = unknown> {
  data: T;
  success: boolean;
  errors?: any;
  notifications?: NotificationsInterface[];
  count?: number;
}
