export interface Voucher {
  id: number;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  expirationDate: string;
  maxUsesPerUser: number;
  status: "Active" | "Expired";
}