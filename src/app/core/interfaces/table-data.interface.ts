export interface CourseTableData {
  dataRows: [{
    id: number,
    title: string,
    price: number,
    type: number,
    status: number,
    currency: string,
  }];
}

export interface UserTableData {
  dataRows: [{
    id: number,
    avatar: string,
    first_name: string,
    last_name: string,
    email: string,
    role_id: number,
  }];
}