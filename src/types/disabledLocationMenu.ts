import { DisabledLocationMenu } from "@prisma/client";

export interface DisabledLocationMenuSlice {
  items: DisabledLocationMenu[];
  isLoading: boolean;
  error: Error | null;
}
export interface BaseOptions {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}
