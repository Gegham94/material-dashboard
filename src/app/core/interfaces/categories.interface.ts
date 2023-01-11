export interface Categories {
  id: number,
  parent_id: number,
  ordering: number,
  icon: string,
  title: string,
  title_am: string;
  children?: Categories[],
  titles?: object;
  label?: string;
}