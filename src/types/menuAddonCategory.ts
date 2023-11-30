import { MenuAddonCategory } from "@prisma/client";

export interface MenuAddonCategorySlice {
  items: MenuAddonCategory[];
  isLoading: boolean;
  error: Error | null;
}
export interface BaseOptions {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface CreateMenuAddonCategoryOptions extends BaseOptions {
  addonCategoryId: number;
  menuAddonCategoryIds: number[];
}

export interface UpdateMenuAddonCategoryOptions extends BaseOptions {
  addonCategoryId: number;
}
