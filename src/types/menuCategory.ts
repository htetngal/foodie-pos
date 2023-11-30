import { MenuCategory } from "@prisma/client";

export interface MenuCategorySlice {
  items: MenuCategory[];
  isLoading: boolean;
  error: Error | null;
}
export interface BaseOptions {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface CreateMenuCategoryDataOptions extends BaseOptions {
  name: string;
  locationId: number;
}

export interface UpdateMenuCategoryOptions extends BaseOptions {
  id: number;
  name: string;
  locationId: number;
  isAvailable: boolean;
}

export interface DeleteMenuCategoryOptions extends BaseOptions {
  id: number;
}
