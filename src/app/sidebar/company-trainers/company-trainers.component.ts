import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { TranslatedTitleService } from '../../shared/services/translated-title.service';
import { TrainersService } from 'src/app/core/services/trainers.service';
import { Trainers } from 'src/app/core/interfaces/trainers';
import { debounceTime, distinctUntilChanged, filter, fromEvent, pluck } from 'rxjs';
import { Pagination } from 'src/app/core/interfaces/pagination';

@Component({
  selector: 'app-company-trainers',
  templateUrl: './company-trainers.component.html',
  styleUrls: ['./company-trainers.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CompanyTrainersComponent implements OnInit, AfterViewInit {
  @ViewChild('search') searchInput: ElementRef

  private readonly title: string = "dashboard.company-trainers";
  public expanded: {[key: string]: boolean} = {};
  public trainersData: Trainers[];
  public filteredData: Trainers[];
  public isLoading = true;
  public trainersCount: number = 0;
  private pageParams = {
    page: 1,
    limit: 10
  } as Pagination
  constructor(
    private trainerService: TrainersService,
    private readonly translatedTitleService: TranslatedTitleService,
  ) {
    this.translatedTitleService.setTranslatedTitle(this.title);
  }

  ngOnInit(): void {
    this.fetchTrainers();
  }

  ngAfterViewInit(): void {
    this.searchAutocomplete()
  }

  public fetchTrainers(): void {
    this.isLoading = true;
    this.trainerService.getTrainers(this.pageParams).subscribe(res => {
      this.trainersData = res.data;
      this.filteredData = res.data;
      this.trainersCount = res.count;
      this.isLoading = false;
    })
  }

  public searchAutocomplete(): void {
    fromEvent(this.searchInput.nativeElement,'keyup').pipe(
      pluck('target','value'),
      filter(letter => letter !== undefined),
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((letter: string) => this.filterTrainers(letter))
  }

  private filterTrainers(letter: string): void {
    letter = letter.toLocaleLowerCase();
    this.filteredData = this.trainersData.filter(
      trainer =>
      trainer.first_name.toLocaleLowerCase().includes(letter) ||
      trainer.last_name.toLocaleLowerCase().includes(letter) ||
      trainer.company_name.toLocaleLowerCase().includes(letter))
  }

  public pageChange(event: any): void {
    event.pageIndex += 1
    this.pageParams.page = event.pageIndex
    this.fetchTrainers()
  }

}
