import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-section-view-modal',
  templateUrl: './section-view-modal.component.html',
  styleUrls: ['./section-view-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionViewModalComponent implements OnInit {
  public sectionsData: any;

  constructor(
      public readonly dialogRef: MatDialogRef<SectionViewModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data,
      private readonly sanitizer: DomSanitizer
  ) { }

  public ngOnInit(): void {
    this.sectionsData = this.data.sections;
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public embedVideo(url: string) {
    let youtubeRegExp =
        /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    let yt = url.match(youtubeRegExp);
    if (yt) return 'https://www.youtube-nocookie.com/embed/' + yt[1];
    return '';
  }
}
