import { Location } from "@prisma/client";

export interface LocationSlice {
  items: Location[];
  isLoading: boolean;
  error: Error | null;
}
export interface BaseOptions {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface CreateLocationOptions extends BaseOptions {
  name: string;
  address: string;
  companyId: number;
}

export interface UpdateLocationOptions extends BaseOptions {
  id: number;
  name: string;
  address: string;
}

export interface DeleteLocationOptions extends BaseOptions {
  id: number;
}
