export interface Notification {
  success: any;
  data:{
    id: number;
    title: string;
    message: string;
    type: string;
    status: number;
    created_at: string;
  }

}
