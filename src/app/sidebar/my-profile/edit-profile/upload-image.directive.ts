import { Directive, ElementRef, HostListener } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Directive({
  selector: "input[type=file][formControlName]",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UploadImageDirective,
      multi: true,
    },
  ],
})
export class UploadImageDirective implements ControlValueAccessor {
  private onChange: Function;

  @HostListener("change", ["$event.target.files"]) emitFiles(event: FileList) {
    const file = event && event.item(0);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.onChange(reader.result as string);
    };
  }

  constructor(private host: ElementRef<HTMLInputElement>) {}

  writeValue(value: null) {
    this.host.nativeElement.value = "";
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {}
}
