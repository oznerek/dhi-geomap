import { ReactElement } from "react";

export interface MenuListType {
  icon: ReactElement;
  title: string;
  description: string;
  onClick?: () => void;
}
