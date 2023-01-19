import { Component, OnInit } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { CategoriesService } from "../../core/services/categories.service";
import { Categories } from "../../core/interfaces/categories.interface";
import { TranslatedTitleService } from "../../shared/shared-services/translated-title.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { ToastrMessageService } from '../../core/services/toastr.service';
import { DeleteDialogComponent } from "src/app/shared/delete-dialog/delete-dialog.component";
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class CategoriesComponent implements OnInit {
  private readonly title: string = "dashboard.categories";
  public expanded: { [key: string]: boolean } = {};
  public categoriesData: Categories[];
  public isLoading: boolean = true;

  constructor(
    private readonly translatedTitleService: TranslatedTitleService,
    private categoriesService: CategoriesService,
    private router: Router,
    private dialog: MatDialog,
    private toastrMessageService: ToastrMessageService,
    private translateService: TranslateService,
  ) {
    this.translatedTitleService.setTranslatedTitle(this.title);
  }

  public ngOnInit(): void {
    this.fetchData();
  }

  public fetchData() {
    if (this.categoriesData) {
      this.categoriesData = [];
    }
    this.isLoading = true;
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        this.categoriesData = res;
        this.isLoading = false;
      },
      error: (err) => {
        if (err.error.success === false) {
          this.isLoading = false;
        }
      },
    });
  }

  public addCategory() {
    this.router.navigate(["/system/categories-management"]);
  }

  isRowClickable(rowIndex: number): boolean {
    return (
      this.categoriesData[rowIndex].children &&
      this.categoriesData[rowIndex].children.length > 0
    );
  }

  public editCategory(event: any) {
    this.router.navigate([`/system/categories-management/`], {
      queryParams: { id: event.id },
    });
  }

  public deleteCategory(event: any, isChild: boolean) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {delete_item: this.translateService.instant('category.category'), item_id: event.id, item_title: event.title},
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.isLoading = true;
        this.deleteCategoryFetch(event.id, isChild);
      }
    });
  }

  private deleteCategoryFetch(id: number, isChild: boolean): void {
    this.categoriesService.deleteCategoryById(id).subscribe(
      (res) => {
        if (res.success) {
          this.isLoading = false;
          if (isChild) {
            this.categoriesData.forEach((elem) => {
              elem.children.forEach((element, i) => {
                if (element.id === id) {
                  elem.children.splice(i, 1);
                  this.toastrMessageService.showSuccess(res.message, "Done !");
                }
              });
            });
          }
          if (!isChild) {
            this.categoriesData.forEach((elem, i) => {
              if (elem.id === id) {
                this.categoriesData.splice(i, 1);
                this.toastrMessageService.showSuccess(res.message, "Done !");
              }
            });
          }
        }
      },
      (error) => this.toastrMessageService.showError(error.message, "Failed !")
    );
  }
}
