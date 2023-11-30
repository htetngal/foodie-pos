import { DisabledLocationMenuCategory } from "@prisma/client";

export interface DisabledLocationMenuCategorySlice {
  items: DisabledLocationMenuCategory[];
  isLoading: boolean;
  error: Error | null;
}
export interface BaseOptions {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface CreateDisabledLocationMenuCategoryOptions extends BaseOptions {
  locationId: number;
  menuCategoryId: number;
  isArchived?: Boolean;
}
