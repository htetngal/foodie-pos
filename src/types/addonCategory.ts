import { AddonCategory } from "@prisma/client";

export interface AddonCategorySlice {
  items: AddonCategory[];
  isLoading: boolean;
  error: Error | null;
}
export interface BaseOptions {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface CreateAddonCategoryOptions extends BaseOptions {
  name: string;
  isRequired: boolean;
  menuIds: number[];
}

export interface UpdateAddonCategory extends BaseOptions {
  id: number;
  name: string;
  isRequired: boolean;
  menuIds: number[];
}
