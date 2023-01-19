import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DeclineModalComponent} from "../decline-modal/decline-modal.component";
import {ApproveService} from "../../core/services/approve.service";
import {ToastrMessageService} from "../../core/services/toastr.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {SweetAlertOptions} from "sweetalert2";
import * as $ from 'jquery';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {SectionViewModalComponent} from '../section-view-modal/section-view-modal.component';
import {DescriptionViewModalComponent} from "../description-view-modal/description-view-modal.component";

@Component({
  selector: "app-verification",
  templateUrl: "./verification.component.html",
  styleUrls: ["./verification.component.css"],
})
export class VerificationComponent implements OnInit {
  public courseId;
  public oldData;
  public newData;
  public isLoading: boolean = true;
  public approvedKeys: {[p: string]: boolean | string} = {};

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private approve: ApproveService,
    private sanitizer: DomSanitizer,
    private toastrMessageService: ToastrMessageService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.courseId = +params["id"];
      }
    });
    this.getApprovalCurses();
  }
  openDecline() {
    this.dialog.open(DeclineModalComponent, {
      data: {
        id: this.courseId,
        text: Object.keys(this.approvedKeys).filter((key) => typeof this.approvedKeys[key] === 'string').map(key => (this.changeKeys(key) + ': ' + this.approvedKeys[key] + '\n')).join(''),
        json: this.approvedKeys
      },
    });
  }

  public getApprovalCurses() {
    this.isLoading = true;
    this.approve.getCourse(this.courseId).subscribe((res) => {
      if (res.success) {
        this.oldData = res.data.old_value;
        this.newData = res.data.new_value;

        // TODO: Move 58-75 lines to new method and use for 75-89 too
        if (this.oldData['promo_video']) {
          this.oldData['promo_video'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.embedVideo(this.oldData['promo_video']));
        }

        if (this.oldData['sections'] && this.oldData['sections'].length > 0) {
          this.oldData['sections'].forEach(section => {
            if (section.lessons?.length > 0) {
              section.lessons.forEach(lesson => {
                if (lesson.type === 'video' && lesson.video_url) {
                  lesson.video_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.embedVideo(lesson.video_url));
                }
              })
            }
          })
        }

        if (this.newData['promo_video']) {
          this.newData['promo_video'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.embedVideo(this.newData['promo_video']));
        }

        if (this.newData['sections'] && this.newData['sections'].length > 0) {
          this.newData['sections'].forEach(section => {
            if (section.lessons?.length > 0) {
              section.lessons.forEach(lesson => {
                if (lesson.type === 'video' && lesson.video_url) {
                  lesson.video_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.embedVideo(lesson.video_url));
                }
              })
            }
          })
        }

        this.isLoading = false;
      }
    });
  }
  public approveCourse() {
    this.approve.approveCourse(this.courseId, 3).subscribe((res) => {
      if (res.success) {
        this.toastrMessageService.showSuccess(res.message, "Done !");
      }
    });
  }

  changeKeys(key) {
    return key.replace('_', ' ')
  }

  approveField(key) {
    this.approvedKeys[key] = true;
  }

  declineField(key) {
    Swal.fire({
      icon: "warning",
      title: 'Input decline reason',
      html: (
        '<label class="form-group w-100">' +
          '<span class="w-100 text_align-left">Reason of declining(can be empty):</span>' +
          '<textarea id="input-field" placeholder="Reason" type="text" class="form-control"></textarea>' +
        '</label>'
      ),
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Decline',
      buttonsStyling: false
    } as SweetAlertOptions).then((result) => {
      if (result.isConfirmed) {
        const field = $('#input-field');
        this.approvedKeys[key] = !!field.val() ? String(field.val()) : false;

        Swal.fire({
          icon: "success",
          type: 'success',
          timer: 1500,
          timerProgressBar: true,
          html: !!field.val() ? 'Reason has saved as:\n' + field.val() : 'Reason has saved',
          showConfirmButton: false,
        } as SweetAlertOptions)
        field.remove();
      }
    }).catch(() => {
      Swal.fire({
        icon: "error",
        type: 'error',
        html: 'There is a problem with this action. Please, try again.',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      } as SweetAlertOptions)
    })
  }

  checkTypeOf(value, expectedResult) {
    return typeof value === expectedResult;
  }

  public embedVideo(url: string) {
    let youtubeRegExp =
        /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    let yt = url.match(youtubeRegExp);
    if (yt) return 'https://www.youtube-nocookie.com/embed/' + yt[1];
    return '';
  }

  public getSafeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public openSectionsViewPopup(): void {
    this.dialog.open(SectionViewModalComponent, {
      data: {
        sections: this.newData.sections,
      }
    });
  }

  public openDescriptionViewModal(description: string): void {
    this.dialog.open(DescriptionViewModalComponent, {
      data: {
        description,
      }
    });
  }

  get hasOldValue() {
    return this.newData.status === 2 && this.oldData && Object.keys(this.oldData).length > 0;
  }
}
