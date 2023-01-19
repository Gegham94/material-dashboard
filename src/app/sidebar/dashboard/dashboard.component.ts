import { Component } from "@angular/core";
import { TableData } from "../../md/md-table/md-table.component";
import { TranslatedTitleService } from "../../shared/shared-services/translated-title.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  private readonly title: string = "dashboard.dashboard";
  public isLoading: boolean = true;

  constructor(private readonly translatedTitleService: TranslatedTitleService) {
    this.translatedTitleService.setTranslatedTitle(this.title);
  }
}
