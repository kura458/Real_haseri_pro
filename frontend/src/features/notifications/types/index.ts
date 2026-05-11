export type Notification = {
  id: number;
  title: string;
  message: string;
  type: string;
  reference_id: number | null;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
};

export type NotificationCount = {
  count: number;
};