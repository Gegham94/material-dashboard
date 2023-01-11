export interface SidebarElem {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  children?: ChildrenItems[];
  translateKey: string
}
export interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
}