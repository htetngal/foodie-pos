export type SnackbarSeverity = "success" | "error";

export interface SnackbarSlice {
  open: boolean;
  message: string | null;
  autohideDuration: number;
  severity: SnackbarSeverity;
}
