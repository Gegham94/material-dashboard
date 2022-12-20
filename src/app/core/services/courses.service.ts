import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { PublicCourse } from "../interfaces/public-course.interface";
import { FilterDTO } from "../interfaces/filterDTO.interface";
import { map } from "rxjs";
import { CourseStatus } from "../enums/course-status.enum";
import { DeleteCourse } from "../interfaces/delete.interface";
import { Filter } from "../interfaces/filter.interface";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  // GET FILTERED COURSES
  public getCourses(
    selectedItemsArray: Filter[],
    currentPage: number = 1
  ) {

    let params = new HttpParams().set("page", currentPage!);
    let typeIdList = [];
    let statusIdList = [];
    if (selectedItemsArray.length !== 0) {
      selectedItemsArray.forEach((elem) => {
        if (elem.key === 'search_text' && elem.value !== '') params = params.append(elem.key, elem.value.trim());
        if (elem.key === 'status') statusIdList.push(elem.value);
        if (elem.key === 'type') typeIdList.push(elem.value);
      });
      if (statusIdList.length > 0) params = params.append('status', statusIdList.join(','));
      if (typeIdList.length > 0) params = params.append('type', typeIdList.join(','));
    }
    return this.http
      .get<FilterDTO<PublicCourse[]>>(`${this.API_URL}/course/list`, { params })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  // CHANGE COURSE STATUS
  public deleteCourse(courseId: number) {
    return this.http
      .post<DeleteCourse<PublicCourse>>(
        `${this.API_URL}/course/${courseId}/change-status?status_code=${CourseStatus.DELETED}`,
        {}
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
