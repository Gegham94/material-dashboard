import { Component, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TranslatedTitleService } from '../../../shared/services/translated-title.service';
import { PublicUser } from './../../../core/interfaces/public-user.interface';
import { ResponseDTO } from '../../../core/interfaces/responseData.interface';
import { ToastrMessageService } from '../../../core/services/toastr.service';

declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html',
		styleUrls: ['./login.component.css']
})

export class LoginComponent implements AfterViewInit, OnDestroy {
	private readonly title: string = 'auth.login.title';

	loading = false;
  loginForm: FormGroup;
	test: Date = new Date();
	private toggleButton: any;
	private sidebarVisible: boolean;
	private nativeElement: Node;

	constructor(
		private readonly translatedTitleService: TranslatedTitleService,
		private element: ElementRef,
    public authService: AuthService,
    private router: Router,
		private toastrMessageService: ToastrMessageService
	) {
		this.nativeElement = element.nativeElement;
		this.sidebarVisible = false;
		this.translatedTitleService.setTranslatedTitle(this.title);
		this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
	}

	ngAfterViewInit() {
		var navbar : HTMLElement = this.element.nativeElement;
		this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
		const body = document.getElementsByTagName('body')[0];
		body.classList.add('login-page');
		body.classList.add('off-canvas-sidebar');
		const card = document.getElementsByClassName('card-login')[0];
		setTimeout(function() {
			// after 1000 ms adding the class animated to the login/register card
			card.classList.remove('card-hidden');
		}, 300);
	}

	sidebarToggle() {
		var toggleButton = this.toggleButton;
		var body = document.getElementsByTagName('body')[0];
		var sidebar = document.getElementsByClassName('navbar-collapse')[0];
		if (this.sidebarVisible == false) {
			setTimeout(function() {
				toggleButton.classList.add('toggled');
			}, 500);
			body.classList.add('nav-open');
			this.sidebarVisible = true;
		} else {
			this.toggleButton.classList.remove('toggled');
			this.sidebarVisible = false;
			body.classList.remove('nav-open');
		}
	}

	submitForm() {
		this.loading = true;
    const values = this.loginForm.getRawValue();
		let lang = localStorage.getItem("lang");
		values.language_code = lang;
    this.authService.login(values).subscribe(
      (response: ResponseDTO<PublicUser>) => {
        if (response.success === true) {
          // user successfully logged in
          this.router.navigate(['system/dashboard']);
					this.loading = false;
        } else {
          // incorrect email or password
					this.toastrMessageService.showError(response.errors, '');
          setTimeout(() => (this.loading = false), 300);
        }
      },
			(err) => {
				if(err.error.success === false){
					if(err.error.errors) {
						this.toastrMessageService.showError(err.error.errors.email, '');
					} else {
						this.toastrMessageService.showError(err.error.message, '');
					}
					this.loading = false;
				}
      },
    );
	}

	ngOnDestroy(){
		const body = document.getElementsByTagName('body')[0];
		body.classList.remove('login-page');
		body.classList.remove('off-canvas-sidebar');
	}
}
