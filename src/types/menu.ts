import { Menu } from "@prisma/client";

export interface MenuSlice {
  items: Menu[];
  isLoading: boolean;
  error: Error | "";
}

export interface BaseOptions {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface GetMenuOptions extends BaseOptions {
  locationId: string;
}

export interface CreateNewMenuOptions extends BaseOptions {
  name: string;
  price: number;
  description?: string;
  assetUrl?: string;
  menuCategoryIds: number[];
}

export interface UpdateMenuOptions extends BaseOptions {
  id: number;
  name: string;
  price: number;
  description?: string | null;
  assetUrl?: string | null;
  menuCategoryIds: number[];
  isAvailable: boolean;
  locationId: number;
}
