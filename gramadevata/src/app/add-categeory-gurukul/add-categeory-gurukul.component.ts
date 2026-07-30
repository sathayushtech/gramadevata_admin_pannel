import { Component } from '@angular/core';
import { VillagesService } from '../services/villages.service';
import { FormBuilder, FormGroup ,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NzUploadChangeParam, NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzFormModule } from 'ng-zorro-antd/form';



@Component({
  selector: 'app-add-categeory-gurukul',
  imports: [CommonModule, ReactiveFormsModule,NzFormModule,NzUploadModule],
  templateUrl: './add-categeory-gurukul.component.html',
  styleUrl: './add-categeory-gurukul.component.css'
})
export class AddCategeoryGurukulComponent {

  subCategoryForm!: FormGroup;

  categoryOptions: any[] = [];

  loading = false;


  constructor(
    private fb: FormBuilder,
    private vedapatashalaService: VillagesService
  ) {}


  ngOnInit(): void {

    this.createForm();

    this.fetchCategories();

  }


  createForm(): void {

    this.subCategoryForm = this.fb.group({

      name: [
        '',
        Validators.required
      ],

      desc: [
        ''
      ],

      // The sub-category API accepts one image, encoded as a base64 string.
      image_location: ['', Validators.required],

      category: [
        '',
        Validators.required
      ]

    });

  }



  fetchCategories(): void {

    this.vedapatashalaService
      .vedapatshalacategeories()
      .subscribe({

        next: (res:any)=>{

          this.categoryOptions = res;

          console.log(
            this.categoryOptions,
            "Categories"
          );

        },

        error:(err)=>{

          console.error(err);

        }

      });

  }




submit(): void {
  if (this.subCategoryForm.invalid) {
    this.subCategoryForm.markAllAsTouched();
    return;
  }

  this.loading = true;
  const payload = this.subCategoryForm.getRawValue();

  this.vedapatashalaService.addvedapatasalasubcategeory(payload).subscribe({
    next: (response) => {
      console.log('Sub Category added successfully:', response);
      this.subCategoryForm.reset({ name: '', desc: '', image_location: '', category: '' });
      this.bannerFileList = [];
      this.loading = false;
    },
    error: (error) => {
      console.error('Unable to add sub category:', error);
      this.loading = false;
    }
  });
}


 Uploadbllodbankimage(info:NzUploadChangeParam):void {
  this.adddbloodbanktimage(info, 'image_location');
 }

adddbloodbanktimage(info: NzUploadChangeParam, formControlName: string): void {
  const file = info.fileList.at(-1);

  if (info.type === 'removed' || !file) {
    this.bannerFileList = [];
    this.subCategoryForm.patchValue({ [formControlName]: '' });
    return;
  }

  if (!file.originFileObj) {
    return;
  }

  this.getBase64(file.originFileObj, (base64Image: string) => {
    this.bannerFileList = [file];
    // Keep the data-URI header: it lets the API determine the image MIME type.
    this.subCategoryForm.patchValue({ [formControlName]: base64Image });
  });
}

getBase64(file: File, callback: (base64Image: string) => void): void {
  const reader = new FileReader();
  reader.onload = () => callback(reader.result as string);
  reader.onerror = () => this.subCategoryForm.get('image_location')?.setErrors({ imageRead: true });
  reader.readAsDataURL(file);
}
    bannerFileList: NzUploadFile[] = [];

}
