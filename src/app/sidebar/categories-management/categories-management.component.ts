import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Categories } from "src/app/core/interfaces/categories.interface";
import { CategoriesService } from "../../core/services/categories.service";
import { ActivatedRoute, Router } from "@angular/router";

type RequestBody = {
  categories: CategoriesBody[];
};
type CategoriesBody = {
  parent_id: number;
  ordering: number;
  category_info: Category[];
};

type Category = {
  title: string;
  language_code: number;
};
@Component({
  selector: "app-categories-management",
  templateUrl: "./categories-management.component.html",
  styleUrls: ["./categories-management.component.css"],
})
export class CategoriesManagementComponent implements OnInit {
  public selectedCategory: any;
  private dataObject: any[] = [];
  public parentCategories: Categories[] = [];
  public allForms: FormGroup[] = [];
  private categoryId: number;
  public isParent: boolean = false;
  public showLoader: boolean = true;
  public categoryForm: FormGroup = new FormGroup({
    armenian: new FormControl("", Validators.required),
    english: new FormControl("", Validators.required),
    ordering: new FormControl("", Validators.required),
    category: new FormControl(""),
  });
  constructor(
    private categoryService: CategoriesService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategoryIdFromQuery();
    // if (this.categoryId)
    this.categoryService.getCategories().subscribe((res) => {
      this.parentCategories = res;
      this.parentCategories.forEach((elem) => {
        if (elem.parent_id === null) {
        const obj = {
          key: elem.id,
          label: elem.title,
          id: elem.id,
          ordering: elem.ordering,
        };
        this.dataObject.push(obj);
      }
      });
    this.parentCategories = this.dataObject;
    this.createDynamicForm();
    this.getCategoryById();
    });
    // if (!this.categoryId) {
    //   this.isParent = true;
    //   this.createDynamicForm();
    // }


  }

  public addCategory(): void {
    const finalObj = {
      categories: [],
    };
    this.allForms.forEach((elem) => {
      const form = elem.getRawValue();
      if (elem.valid) {
        const obj = {
          parent_id: form.category.id ? form.category.id : 0,
          ordering: form.ordering,
          category_info: [],
        };
        if ("armenian" in form) {
          obj.category_info.push({
            title: form.armenian,
            language_code: 1,
          });
        }
        if ("english" in form) {
          obj.category_info.push({
            title: form.english,
            language_code: 2,
          });
        }
        finalObj.categories.push(obj);
      }
    });
    this.saveCategory(finalObj);
  }

  private saveCategory(data: object): void {
    this.categoryService.createCategory(data).subscribe(
      (res) => {
        if(res.success){
          this.toastrService.success('Category saved successfully')
          this.router.navigate(['/system/categories'])
        }else{
          this.toastrService.error(res.errors['categories.0.category_info.0.title'] +'\n'+res.errors['categories.0.category_info.1.title'])

        }
    },
    (error) =>{
      this.toastrService.error(error.message)
    }
    )
  }

  private createDynamicForm(count?: number): void {
    if (!count) count = 1;
    for (let i = 0; i < count; i++) {
      let form = new FormGroup({});
      form.addControl(`armenian`, new FormControl("", Validators.required));
      form.addControl(`english`, new FormControl("", Validators.required));
      form.addControl(`ordering`, new FormControl("", Validators.required));
      form.addControl(`category`, new FormControl(""));
      this.allForms.push(form);
    }
    this.showLoader = false;
  }

  public addNewForm(): void {
    const form = new FormGroup({
      armenian: new FormControl("", Validators.required),
      english: new FormControl("", Validators.required),
      ordering: new FormControl("", Validators.required),
      category: new FormControl(""),
    });
    this.allForms.push(form);
  }

  public deleteForm(event: number): void {
    this.allForms.splice(event, 1);
  }

  public get checkValidation() {
    let valid = false;
    this.allForms.forEach((elem) => {
      valid = elem.valid;
    });
    return valid;
  }

  private getCategoryIdFromQuery(): void {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.categoryId = res.id;
    });
  }

  private getCategoryById(): void {
    if (!this.categoryId) {
      this.isParent = true;
    }
    if (this.categoryId) this.showLoader = true;
    this.categoryService.getCategoryById(this.categoryId).subscribe((res) => {
      const foundCategory = this.parentCategories.find(
        (cat) => cat.id === res.data.parent_id
      );
      const fountParentCategory = this.parentCategories.find(
        (cat) => cat.id === res.data.id
      );

      if (res.data.parent_id) {
        this.isParent = true;
        const obj = {
          armenian: res.data.titles[1],
          english: res.data.titles[2],
          ordering: res.data.ordering,
          category: {
            label: foundCategory.label,
            id: res.data.parent_id,
            ordering: res.data.ordering,
          },
        };
        this.setValue(obj);
      }
      if (!res.data.parent_id) {
        this.isParent = false;
        const obj = {
          armenian: res.data.titles[1],
          english: res.data.titles[2],
          ordering: res.data.ordering,
          category: {
            label: fountParentCategory.label,
          },
        };
        this.setValue(obj);
      }
      this.showLoader = false;
    });
  }

  private setValue(obj: object): void {
    this.allForms[0].patchValue(obj);
  }
}
