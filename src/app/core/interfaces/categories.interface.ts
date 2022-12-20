export interface CategoriesDto {
  id: number,
  parent_id: number,
  ordering: number,
  icon: string,
  title: string,
  children: Categories[],
}

export interface Categories {
  id: number,
  parent_id: number,
  ordering: number,
  icon: string,
  title: string,
  children: CategoriesDto[],
}