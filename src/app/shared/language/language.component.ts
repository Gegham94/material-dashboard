import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  @Input() isDark : boolean = false;
  private readonly destroyed$: Subject<void> = new Subject<void>();
  public selectedLanguage: string = '';

  constructor(private readonly translateService: TranslateService) {}

  public ngOnInit(): void {
    this.selectedLanguage = this.translateService.getDefaultLang();
    if(this.isDark){
      $('select').css('color','#5c5c5b');
      $('option').css('background','#808080');
    }
    this.translateService.onLangChange.pipe(takeUntil(this.destroyed$)).subscribe((event) => {
      this.selectedLanguage = event.lang;
    });
  }

  public ngDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public changeLanguage(event: Event) {
    const newLang = (event.target as HTMLSelectElement).value;

    this.translateService.use(newLang);
  }

}
