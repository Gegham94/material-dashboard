import { Observable } from 'rxjs';
import { TranslateLoader } from '@ngx-translate/core';

import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export class TranslateBrowserLoader implements TranslateLoader {
  constructor(private http: HttpClient, private transferState: TransferState) {}

  public getTranslation(lang: string) {
    return new TranslateHttpLoader(this.http).getTranslation(lang);
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,
    './assets/i18n/',
    '.json');
}