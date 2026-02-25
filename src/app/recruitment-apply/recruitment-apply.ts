import { Component, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';      // <-- Import here
import { MatButtonModule } from '@angular/material/button';

import axios from "axios";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-recruitment-apply',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './recruitment-apply.html',
  styleUrls: ['./recruitment-apply.scss']
})
export class RecruitmentApply {
  title = 'form_empolyment';

  parameterId: any;

  form: FormGroup; // declare first

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private toastr: ToastrService
    , private router: Router
  ) {
    this.form = this.fb.group({
      fullname: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\u0600-\u06FF\s]*$/)
        ]
      ],
      mothername: [  // Add mother's name
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\u0600-\u06FF\s]*$/)
        ]
      ],
      isn: [  // Add mother's name
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]*$/)
        ]
      ],
      gender: [
        '10',
        [
          Validators.required,

        ]
      ],
      placebirthday: [  // Add mother's name
        '',
        [
          Validators.required,

        ]
      ], age: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]*$/)  // only numbers
        ]
      ],
      outBorderSyria: ['', Validators.required],
      namecountry: [
        '',
        [
          Validators.required,
        ]
      ],
      curplace: [
        '',
        [
          Validators.required,

        ]
      ],
      numberyear: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]*$/)  // only numbers
        ]
      ],
      Nationilty: ['', Validators.required],
      nameelsenation: [
        '',
        [
          Validators.required,

        ]
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]*$/)  // only numbers
        ]
      ],
      email: ['', Validators.required],
      certification: [  // Add mother's name
        '1',
        [
          Validators.required,

        ]
      ],
      yearstu: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]*$/)  // only numbers
        ]
      ],
      nameuniversity: ['', Validators.required],
      specification: ['', Validators.required],
      yeargardution: ['', Validators.required],
      gpa: ['', Validators.required],



      word: ['', Validators.required],
      excel: ['', Validators.required],
      powerpoinet: ['', Validators.required],

      secandlanguage: ['', Validators.required],
      namesecandlanguage: ['1', [Validators.required,]],
      levellanguage: ['1', [Validators.required,]],

      directwork: ['1', Validators.required],
      filecv: [null, Validators.required],
      filecert: [null, Validators.required],
      filepersionalimage: [null, Validators.required],
      check: [false, Validators.required],
      
      years_expe: ['', Validators.required],
      expe: ['', Validators.required],
      nameenterprice1: ['', [Validators.required,]],
      postion1: ['', [Validators.required,]],
      yearexp1: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      startdate1: ['', [Validators.required,]],
      enddate1: ['', [Validators.required,]],
      descriptiontask1: ['', [Validators.required,]],
      relatiovnwrok1: ['', Validators.required],

      nameenterprice2: ['', [Validators.required,]],
      postion2: ['', [Validators.required,]],
      yearexp2: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      startdate2: ['', [Validators.required,]],
      enddate2: ['', [Validators.required,]],
      descriptiontask2: ['', [Validators.required,]],
      relatiovnwrok2: ['', Validators.required],

      nameenterprice3: ['', [Validators.required,]],
      postion3: ['', [Validators.required,]],
      yearexp3: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      startdate3: ['', [Validators.required,]],
      enddate3: ['', [Validators.required,]],
      descriptiontask3: ['', [Validators.required,]],
      relatiovnwrok3: ['', Validators.required],
    });
  }


  

  ngOnInit(): void { 
    //  window.scrollTo(0,0)
    this.GetDegree();
    ///

     let route: ActivatedRoute = this.route;
     while (route.firstChild) {
    route = route.firstChild;
    }


    route.paramMap.subscribe(pm => {
    console.log('Parameter ID:', pm.get('id')); this.vacancy_id=pm.get(`id`);
    axios.get(`http://172.16.101.192:8000/api/ar/vacancies/${pm.get('id')}`)
    // axios.get(`http://localhost:8000/api/ar/vacancies/${pm.get('id')}`)
      .then((d) => { 
        console.log(d.data.data.job_name); 
        this.vacancies = d.data.data.job_name; 
        this.skills=d.data.data.vacancy_skills;
      })
      .catch((e) => { 
        this.toastr.error(`هناك مشكلة في جلب المسمى الوظيفي`); 
        console.log(e) 
      });
  });




  }

  vacancy_id:string| null ='';

  vacancies: string = ``;
  Degree: any = [];
  languges: any = [];
  copyoflanguges: any = [];
  skills: any = [];

  GetDegree() {


    // axios.get(`http://localhost:8000/api/ar/degrees`).then((d) => { console.log(d.data)
    axios.get(`http://172.16.101.192:8000/api/ar/degrees`).then((d) => { console.log(d.data)
      this.Degree = d.data.data.degrees;
      this.languges=d.data.data.languages;
      this.copyoflanguges=d.data.data.languages;
     })
      .catch((e) => { this.toastr.error(`هناك مشكلة في جلب الشهادات الرجاء المحاولة لاحقآ`); console.log(e) })
  }


  //start language filter
  // Add only this to your component
languagesArray: Array<{id: number, level: number}> = [];


//match languages
 matchlanguage(id: any): string {
    for(let lang of this.copyoflanguges) {
        
        if(lang.id == id) { 
            return lang.name;
        }
    }
    return "خطأ في اللغة"; // This only runs if no match found
}

// Helper methods
addLanguage(langId: string, level: string) {console.log(langId,level)

  if(langId!=`0`&&level!=`0`){
    if (langId && level) { 
        this.languagesArray.push({
            id: parseInt(langId),
            level: parseInt(level)
        });
        this.languges=this.languges.filter((e:any)=>{if(e.id!=langId){return e}})
    }
  }
}

removeLanguage(index: number) {
    this.languagesArray.splice(index, 1);
}

getLanguageName(id: number): string {
    // Just return empty string - you can display ID instead
    return '';
}

getLevelName(level: number): string {
    switch(level) {
        case 1: return 'مبتدئ';
        case 2: return 'متوسط';
        case 3: return 'متقدم';
        default: return '';
    }
}

  //end language filter


  // filter skills

  filterSkills: number[] = []; 

  
  onSkillChange(event: any, skillId: number) {
    if (event.target.checked) {
      // Add to filterSkills if checked
      this.filterSkills.push(skillId);
    } else {
      // Remove from filterSkills if unchecked
      const index = this.filterSkills.indexOf(skillId);
      if (index > -1) {
        this.filterSkills.splice(index, 1);
      }
    }
    console.log('Selected skills:', this.filterSkills);
  }

  
  toggleSkill(skillId: number) {
    const index = this.filterSkills.indexOf(skillId);
    if (index > -1) {
      this.filterSkills.splice(index, 1);
    } else {
      this.filterSkills.push(skillId);
    }
  }

  
  isSkillSelected(skillId: number): boolean {
    return this.filterSkills.includes(skillId);
  }

  // end filter skills

  showFormCountry: boolean = false;
  Naition: boolean = false;

  ShowNumberofyearEducation: boolean = false;
  NumberofYear: string = "";

  ShowExpInput: boolean = false;

  ShowLangage: boolean = false;

  ShowCv: boolean = false;
  NameFileCv: string = ``;


  ShowCert: boolean = false;
  NameFileCert: string = ``;

  ShowPersinalImage: boolean = false;
  NameFilePer: string = ``;


  // binding data
  FullyName: string = "";
  FullyNameV = signal(`1`);


  ChangeFullyName(event: Event) {
    this.FullyName = (event.target as HTMLInputElement).value;
    this.FullyNameV.set(`1`);


  }

  MotherName: string = "";
  MotherNameV = signal(`1`);
  ChangeMotherName(event: Event) {
    this.MotherName = (event.target as HTMLInputElement).value;
    this.MotherNameV.set(`1`)

  }

  Gender: string = "";
  GenderV = signal(`1`);
  ChangeGender(event: any) {
    this.Gender = event.target.value;
    if (event.target.value == "0" || event.target.value == "1") {
      this.Gender = event.target.value;
      this.GenderV.set(`1`)
    }

  }

  PlaceOfBrith: string = "";
  PlaceOfBrithV: string = "1"
  ChangePlaceOfBrith(event: Event) {
    this.PlaceOfBrith = (event.target as HTMLInputElement).value;

  }

  Age: string = "";
  AgeV = signal('1');
  ChangeAge(event: Event) {
    this.Age = (event.target as HTMLInputElement).value;
    this.AgeV.set(`1`)


  }

  OutBorderSyria: string = '';
  OutBorderSyriaV = signal(`1`);
  ChangeOutBorderSyria(event: boolean) {

    //this.OutBorderSyriaV.set(`2`);
    this.OutBorderSyriaV.set(`1`)

    if (event) { this.OutBorderSyria = `1`; }
    else if (!event) { this.OutBorderSyria = `0`; }

  }

  NameCountryOutBorder: string = "";
  NameCountryOutBorderV = signal(`1`);
  ChangeNameCountryOutBorder(event: Event) {
    this.NameCountryOutBorder = (event.target as HTMLInputElement).value;

  }

  NumberOfYearOutBorder: string = "";
  ChangeNumberOfYearOutBorder(event: Event) {
    this.NumberOfYearOutBorder = (event.target as HTMLInputElement).value;

  }


  NaitionElseSyria: string = "";
  NaitionElseSyriaV = signal(`1`);
  ChangeNaitionElseSyria(event: boolean) {

    this.NaitionElseSyriaV.set(`2`)

    if (event) { this.NaitionElseSyria = "1" }
    else if (!event) { this.NaitionElseSyria = "2" }

  }

  NameNaitionElse: string = "";
  ChangeNameNaitionElse(event: Event) {
    this.NameNaitionElse = (event.target as HTMLInputElement).value;

  }

  CurentLocation: string = "";
  CurentLocationV = signal(`1`);
  ChangeCurentLocation(event: Event) {
    this.CurentLocation = (event.target as HTMLInputElement).value;
    this.CurentLocationV.set(`1`);

  }

  CodeCountryphone: string = "+963";
  ChangeCodeCountryphone(event: any) {

    this.CodeCountryphone = event.target.value
  }

  PhoneNumber: string = "";
  PhoneNumberV = signal(`1`);
  ChangePhoneNumber(event: Event) {
    this.PhoneNumber = (event.target as HTMLInputElement).value;
  }

  Certification: string = "";
  CertificationValdition: boolean = true;

  PerviousWork: string = ``;
  PerviousWorkV = signal(`1`)
  ChangePerviousWork(event: boolean) {
    console.log(event)

    this.PerviousWorkV.set(`2`);

    if (event) { this.PerviousWork = "1" }
    else if (!event) { this.PerviousWork = "0" }

  }
  NumberOfYearPriviousWork: string = "";
  ChangeNumberOfYearPriviousWork(event: Event) {
    this.NumberOfYearPriviousWork = (event.target as HTMLInputElement).value;

  }

  NamePriviouswork: string = "";
  ChangeNamePriviouswork(event: Event) {
    this.NamePriviouswork = (event.target as HTMLInputElement).value;
  }

  CurentWork: string = "";
  CurentWorkV = signal(`1`)
  ChangeCurentWork(event: boolean) {

    this.CurentWorkV.set(`2`);

    if (event) { this.CurentWork = "1"; }
    else if (!event) { this.CurentWork = "0"; }
  }

  LevelWord: string = "";
  LevelWordV = signal(`1`);
  Changelevelword(event: string) {
    this.LevelWord = event;
    this.LevelWordV.set(`2`)

  }

  LevelExel: string = "";
  LevelExelV = signal(`1`);
  ChangeLevelExel(event: string) {
    this.LevelExel = event;
    this.LevelExelV.set(`2`)

  }

  levelPowerpoint: string = "";
  levelPowerpointV = signal(`1`)
  ChangelevelPowerpoint(event: string) {
    this.levelPowerpoint = event;
    this.levelPowerpointV.set(`2`)

  }

  SecandLanguage: string = "";
  SecandLanguageV = signal(`1`);
  ChangeSecandLanguage(event: boolean) {

    //this.SecandLanguageV.set(`2`);

    if (event) { this.SecandLanguage = "1"; }
    else if (!event) { this.SecandLanguage = "0"; }
  }

  IfHaveSecandLanguage: string = "";
  ChangeIfHaveSecandLanguage(event: Event) {
    this.IfHaveSecandLanguage = (event.target as HTMLInputElement).value;
    console.log(this.IfHaveSecandLanguage)
  }

  DirectWork: string = "1";
  ChangeDirectWork(event: any) {
    this.DirectWork = event.target.value;

  }






  //logic style show and hidden
  onOptionChange(val: boolean) {
    this.showFormCountry = val;

  }
  onChangeNation(val: boolean) {
    this.Naition = val;
  }

  onChangeNumberofYear(val: any) {

    let numberEducation = val.target.value;
    if (numberEducation == "4" || numberEducation == "5" || numberEducation == "6" || numberEducation == "7") {
      this.ShowNumberofyearEducation = true;
    }
    else if(numberEducation == "1" || numberEducation == "2" || numberEducation == "3" ){
      this.ShowNumberofyearEducation = false;
    }
    else {
      this.ShowNumberofyearEducation = true;
    }

  }



  onChangeLanguage(val: boolean) {
    this.ShowLangage = val;
  }

  FileCv: any;
  FileCvV = signal(`1`);
  FileSizeAboveLimetCV = signal(false);

  onChangFileCv(file: any) {
    file.preventDefault();
    console.log(file.target.value)
    console.log(file.target.files[0])
    console.log(file.target.files[0].size)
    console.log(file.target.files[0].name)
    if (file.target.files[0].size > 2099200) {
      this.FileSizeAboveLimetCV.set(true);
      this.ShowCv = false;
      this.FileCvV.set(`1`);
    }
    else if (file.target.files[0].size > 0 && file.target.files[0].name) {
      this.ShowCv = true;
      this.NameFileCv = file.target.files[0].name;
      this.FileCv = file.target.files[0];
      this.FileCvV.set(`2`);
      this.FileSizeAboveLimetCV.set(false);
    }
  }



  FileCert: any;
  FileCertV = signal(`1`);
  FileSizeAboveLimetCert = signal(false);
  onChangeFileCert(file: any) {
    file.preventDefault();
    console.log(file.target.value)
    console.log(file.target.files[0])
    console.log(file.target.files[0].size)
    console.log(file.target.files[0].name)
    if (file.target.files[0].size > 2099200) {
      this.FileSizeAboveLimetCert.set(true);
      this.ShowCert = false;
      this.FileCertV.set(`1`);
    }
    else if (file.target.files[0].size > 0 && file.target.files[0].name) {
      this.ShowCert = true;
      this.NameFileCert = file.target.files[0].name;
      this.FileCertV.set(`2`);
      this.FileCert = file.target.files[0];
      this.FileSizeAboveLimetCert.set(false);
    }

  }

  FilePersinalImage: any;
  FilePersinalImageV = signal(`1`);
  FileSizeAboveLimetImage = signal(false);
  onChageFilePersinalImage(file: any) {
    console.log(file.target.value)
    console.log(file.target.files[0])
    console.log(file.target.files[0].size)
    console.log(file.target.files[0].name)

    if (file.target.files[0].size > 4198400) {
      console.log(file.target.files[0].size)
      this.FileSizeAboveLimetImage.set(true)
      this.ShowPersinalImage = false;
      this.FilePersinalImageV.set(`1`)
    }
    else if (file.target.files[0].size > 0 && file.target.files[0].name) {
      this.ShowPersinalImage = true; console.log(`run`)
      this.NameFilePer = file.target.files[0].name;
      this.FilePersinalImageV.set(`2`);
      this.FilePersinalImage = file.target.files[0];
      this.FileSizeAboveLimetImage.set(false)

    }
  }

  Checked: boolean = false;
  CheckedV = signal(`0`);
  onCheckboxChange(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.Checked = isChecked;
    this.CheckedV.set(`0`);
    if (isChecked) { this.CheckedV.set(`1`); }
    else if (!isChecked) { this.CheckedV.set(`0`); }
    console.log(this.CheckedV())
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }



  cleardata() {

    // Reset form
    this.form.reset();

    // show
    this.ShowPersinalImage = false;
    this.ShowCert = false;
    this.ShowCv = false

    // Reset all string variables
    this.FullyName = "";
    this.MotherName = "";
    this.Gender = "";
    this.PlaceOfBrith = "";
    this.Age = "";
    this.OutBorderSyria = '';
    this.NameCountryOutBorder = "";
    this.NumberOfYearOutBorder = "";
    this.NaitionElseSyria = "";
    this.NameNaitionElse = "";
    this.CurentLocation = "";
    this.CodeCountryphone = "+963"; // Reset to default
    this.PhoneNumber = "";
    this.Certification = "";
    this.PerviousWork = "";
    this.NumberOfYearPriviousWork = "";
    this.NamePriviouswork = "";
    this.CurentWork = "";
    this.LevelWord = "";
    this.LevelExel = "";
    this.levelPowerpoint = "";
    this.SecandLanguage = "";
    this.IfHaveSecandLanguage = "";
    this.DirectWork = "1"; // Reset to default
    this.NameFileCv = "";
    this.NameFileCert = "";
    this.NameFilePer = "";

    // Reset files
    this.FileCv = null;
    this.FileCert = null;
    this.FilePersinalImage = null;

    // Reset checkbox
    this.Checked = false;

    // Reset all signals to default values (usually "1" for valid/untouched)
    this.FullyNameV.set(`1`);
    this.MotherNameV.set(`1`);
    this.GenderV.set("1");
    this.PlaceOfBrithV = "1";
    this.AgeV.set("1");
    this.OutBorderSyriaV.set("1");
    this.NameCountryOutBorderV.set("1");
    this.NaitionElseSyriaV.set("1");
    this.CurentLocationV.set("1");
    this.PhoneNumberV.set("1");
    this.PerviousWorkV.set("1");
    this.CurentWorkV.set("1");
    this.LevelWordV.set("1");
    this.LevelExelV.set("1");
    this.levelPowerpointV.set("1");
    this.SecandLanguageV.set("1");
    this.FileCvV.set("1");
    this.FileCertV.set("1");
    this.FilePersinalImageV.set("1");
    this.CheckedV.set("0");

  }


  Nexpe: number = 0;
  VNexpe: boolean = false;

  onChangeExpe(val: boolean) {
    this.ShowExpInput = val;
    if (val) { this.Nexpe = 1 }
    else if (!val) { this.Nexpe = 0 }
  }

  addMoreExpe() {
    console.log(`addmorework`)
    if (this.Nexpe == 1) { this.Nexpe = 2 }
    else if (this.Nexpe == 2) { this.Nexpe = 3 }
  }

  cancelExpe() {
    if (this.Nexpe == 3) { this.Nexpe = 2 }
    else if (this.Nexpe == 2) { this.Nexpe = 1 }
  }

  setFieldExpe(num: number) {
    if (num == 1) {
      return [{
        company_name: this.form.get(`nameenterprice1`)?.value,
        position: this.form.get(`postion1`)?.value,
        number_years_experience: this.form.get(`yearexp1`)?.value,
        from_date: this.form.get(`startdate1`)?.value,
        to_date: this.form.get(`enddate1`)?.value,
        description_job: this.form.get(`descriptiontask1`)?.value,
        still_working: this.form.get(`relatiovnwrok1`)?.value == `yes` ? `1` : `0`,
      }]
    }
    else if (num == 2) {
      return [{
        company_name: this.form.get(`nameenterprice1`)?.value,
        position: this.form.get(`postion1`)?.value,
        number_years_experience: this.form.get(`yearexp1`)?.value,
        from_date: this.form.get(`startdate1`)?.value,
        to_date: this.form.get(`enddate1`)?.value,
        description_job: this.form.get(`descriptiontask1`)?.value,
        still_working: this.form.get(`relatiovnwrok1`)?.value == `yes` ? `1` : `0`,
      },
      {
        company_name: this.form.get(`nameenterprice2`)?.value,
        position: this.form.get(`postion2`)?.value,
        number_years_experience: this.form.get(`yearexp2`)?.value,
        from_date: this.form.get(`startdate2`)?.value,
        to_date: this.form.get(`enddate2`)?.value,
        description_job: this.form.get(`descriptiontask2`)?.value,
        still_working: this.form.get(`relatiovnwrok2`)?.value == `yes` ? `1` : `0`,
      }]
    }
    else if (num == 3) {
      return [{
        company_name: this.form.get(`nameenterprice1`)?.value,
        position: this.form.get(`postion1`)?.value,
        number_years_experience: this.form.get(`yearexp1`)?.value,
        from_date: this.form.get(`startdate1`)?.value,
        to_date: this.form.get(`enddate1`)?.value,
        description_job: this.form.get(`descriptiontask1`)?.value,
        still_working: this.form.get(`relatiovnwrok1`)?.value == `yes` ? `1` : `0`,
      },
      {
        company_name: this.form.get(`nameenterprice2`)?.value,
        position: this.form.get(`postion2`)?.value,
        number_years_experience: this.form.get(`yearexp2`)?.value,
        from_date: this.form.get(`startdate2`)?.value,
        to_date: this.form.get(`enddate2`)?.value,
        description_job: this.form.get(`descriptiontask2`)?.value,
        still_working: this.form.get(`relatiovnwrok2`)?.value == `yes` ? `1` : `0`,
      },
      {
        company_name: this.form.get(`nameenterprice3`)?.value,
        position: this.form.get(`postion3`)?.value,
        number_years_experience: this.form.get(`yearexp3`)?.value,
        from_date: this.form.get(`startdate3`)?.value,
        to_date: this.form.get(`enddate3`)?.value,
        description_job: this.form.get(`descriptiontask3`)?.value,
        still_working: this.form.get(`relatiovnwrok3`)?.value == `yes` ? `1` : `0`,
      }]
    }
    else { return [] }
  }




  FullyResgistration() {  console.log(this.CurentLocation)
   console.log(this.languagesArray)

    //valdition Fully name
    if (this.FullyName.length > 3 && this.FullyName != "") { this.FullyNameV.set(`2`) }
    else { this.FullyNameV.set(`3`) }

    if (this.MotherName.length > 3 && this.MotherName != "") { this.MotherNameV.set(`2`); }
    else { this.MotherNameV.set(`3`); }

    if (this.Gender == "0" || this.Gender == "1") { this.GenderV.set(`2`) }
    else { this.GenderV.set(`3`) }

    if (this.form.get(`placebirthday`)?.valid) { this.PlaceOfBrithV = "2"; }
    else { this.form.get(`placebirthday`)?.touched; this.PlaceOfBrithV = "1"; }

    if (this.Age != "" && !isNaN(Number(this.Age))) { this.AgeV.set("2") }
    else { this.AgeV.set("3"); }

    if (this.form.get(`outBorderSyria`)?.value == `1`) {
      if (this.form.get(`namecountry`)?.invalid) { this.form.get(`namecountry`)?.touched; this.OutBorderSyriaV.set(`1`); }
      if (this.form.get(`numberyear`)?.invalid) { this.form.get(`numberyear`)?.touched; this.OutBorderSyriaV.set(`1`); }
      else { this.OutBorderSyriaV.set(`2`); }
    }
    else if (this.form.get(`outBorderSyria`)?.value == `0`) { this.OutBorderSyriaV.set(`2`) }
    else if (this.form.get(`outBorderSyria`)?.value == ``) { this.OutBorderSyriaV.set(`3`); }

    if (this.form.get(`Nationilty`)?.value == `1`) {
      if (this.form.get(`nameelsenation`)?.invalid) { this.form.get(`nameelsenation`)?.touched; this.NaitionElseSyriaV.set(`1`); }
      else { this.NaitionElseSyriaV.set(`2`) }
    }
    else if (this.form.get(`Nationilty`)?.value == `0`) { this.NaitionElseSyriaV.set(`2`) }
    else if (this.form.get(`Nationilty`)?.value == ``) { this.NaitionElseSyriaV.set(`3`); }



    if (this.CurentLocation != "") { this.CurentLocationV.set(`2`) }
    else { this.CurentLocationV.set(`3`); }

    if (!isNaN(Number(this.PhoneNumber))) { this.PhoneNumberV.set(`2`) }
    else { this.PhoneNumberV.set(`3`) }

    ///

    if (this.form.get(`expe`)?.value == `1`) {
      if (this.Nexpe == 1) {
        console.log(`set here`)
        if (this.form.get(`nameenterprice1`)?.valid && this.form.get(`postion1`)?.valid
          && this.form.get(`yearexp1`)?.valid && this.form.get(`startdate1`)?.valid && this.form.get(`enddate1`)?.valid
          && this.form.get(`relatiovnwrok1`)?.valid) { this.VNexpe = true } else { this.VNexpe = false }
      }
      else if (this.Nexpe == 2) {
        console.log(`set two`)
        if (this.form.get(`nameenterprice1`)?.valid && this.form.get(`postion1`)?.valid
          && this.form.get(`yearexp1`)?.valid && this.form.get(`startdate1`)?.valid && this.form.get(`enddate1`)?.valid
          && this.form.get(`relatiovnwrok1`)?.valid && this.form.get(`nameenterprice2`)?.valid && this.form.get(`postion2`)?.valid
          && this.form.get(`yearexp2`)?.valid && this.form.get(`startdate2`)?.valid && this.form.get(`enddate2`)?.valid
          && this.form.get(`relatiovnwrok2`)?.valid) { this.VNexpe = true } else { this.VNexpe = false; console.log(`heere false`) }
      }
      else if (this.Nexpe == 3) {
        if (this.form.get(`nameenterprice1`)?.valid && this.form.get(`postion1`)?.valid
          && this.form.get(`yearexp1`)?.valid && this.form.get(`startdate1`)?.valid && this.form.get(`enddate1`)?.valid
          && this.form.get(`relatiovnwrok1`)?.valid && this.form.get(`nameenterprice2`)?.valid && this.form.get(`postion2`)?.valid
          && this.form.get(`yearexp2`)?.valid && this.form.get(`startdate2`)?.valid && this.form.get(`enddate2`)?.valid
          && this.form.get(`relatiovnwrok3`)?.valid && this.form.get(`nameenterprice3`)?.valid && this.form.get(`postion3`)?.valid
          && this.form.get(`yearexp3`)?.valid && this.form.get(`startdate3`)?.valid && this.form.get(`enddate3`)?.valid
          && this.form.get(`relatiovnwrok3`)?.valid) { this.VNexpe = true } else { this.VNexpe = false }
      }
    }
    else if (this.form.get(`expe`)?.value == `0`) { this.VNexpe = true }
    else if (this.form.get(`expe`)?.value == ``) { this.PerviousWorkV.set(`3`) }

    //

    if (this.PerviousWorkV() == "1") { this.PerviousWorkV.set(`3`) }

    if (this.CurentWorkV() == "1") { this.CurentWorkV.set(`3`) }

    if (this.LevelWordV() == "1") { this.LevelWordV.set(`3`) }

    if (this.LevelExelV() == "1") { this.LevelExelV.set(`3`) }

    if (this.levelPowerpointV() == "1") { this.levelPowerpointV.set(`3`) }

    if (this.form.get(`secandlanguage`)?.value == `1`) {
      if (this.languagesArray.length==0) {this.toastr.error('بما انك تعرف لغة ثانية يجب ادخالها', 'خطأ');  }
      else { this.SecandLanguageV.set(`2`); }
    }
    else if (this.form.get(`secandlanguage`)?.value == `0`) { this.SecandLanguageV.set(`2`) }
    else if (this.form.get(`secandlanguage`)?.value == ``) { this.SecandLanguageV.set(`3`) }



    if (this.FileCvV() == `1`) { this.FileCvV.set(`3`) }

    if (this.FileCertV() == `1`) { this.FileCertV.set(`3`) }

    if (this.FilePersinalImageV() == `1`) { this.FilePersinalImageV.set(`3`) }

    if (this.Checked) { this.CheckedV.set(`2`) }
    else { this.CheckedV.set(`3`) }

    let idDegree = this.form.get(`certification`)?.value;
    if (idDegree == "4" || idDegree == "5" || idDegree == "6" || idDegree == "7") {
      this.CertificationValdition = false;
      if (this.form.get(`yearstu`)?.invalid) { this.form.get(`yearstu`)?.touched; }
      else if (this.form.get(`n[ameuniversity`)?.invalid) { this.form.get(`nameuniversity`)?.touched; }
      else if (this.form.get(`specification`)?.invalid) { this.form.get(`specification`)?.touched; }
      else if (this.form.get(`yeargardution`)?.invalid) { this.form.get(`yeargardution`)?.touched; }
      else if (this.form.get(`gpa`)?.invalid) { this.form.get(`gpa`)?.touched; }
      else if (this.FileCertV() == `2`) { this.CertificationValdition = true }



    }

    console.log(this.VNexpe);
    console.log('Name field:', this.FullyNameV());
    console.log('Checking all conditions for:', this.FullyNameV());

    console.log({
      FullyNameV: this.FullyNameV(),
      MotherNameV: this.MotherNameV(),
      GenderV: this.GenderV(),
      PlaceOfBrithV: this.PlaceOfBrithV,
      AgeV: this.AgeV(),
      OutBorderSyriaV: this.OutBorderSyriaV(),
      NaitionElseSyriaV: this.NaitionElseSyriaV(),
      CurentLocationV: this.CurentLocationV(),
      PhoneNumberV: this.PhoneNumberV(),
      VNexpe: this.VNexpe,
      LevelWordV: this.LevelWordV(),
      LevelExelV: this.LevelExelV(),
      levelPowerpointV: this.levelPowerpointV(),
      SecandLanguageV: this.SecandLanguageV(),
      FileCvV: this.FileCvV(),
      FilePersinalImageV: this.FilePersinalImageV(),
      CheckedV: this.CheckedV(),
      CertificationValdition: this.CertificationValdition
    });
    if (this.FullyNameV() == "2" && this.MotherNameV() == "2" && this.GenderV() == "2" && this.PlaceOfBrithV == "2" &&
      this.AgeV() == "2" && this.OutBorderSyriaV() == "2" && this.NaitionElseSyriaV() == "2" && this.CurentLocationV() == "2"
      && this.PhoneNumberV() == "2" && this.VNexpe && this.LevelWordV() == "2" &&
      this.LevelExelV() == "2" && this.levelPowerpointV() == "2" && this.SecandLanguageV() == "2" && this.FileCvV() == `2`
      && this.FilePersinalImageV() == `2` && this.CheckedV() == `2` && this.CertificationValdition && this.form.get(`isn`)?.valid&&
      this.form.get(`years_expe`)?.valid) {
      this.SendRequestData();
    }
    else if(this.form.get(`secandlanguage`)?.value == `1`&&this.languagesArray.length==0){}
    else {
      this.toastr.error('هناك نقص او خطأ في الحقول المطلوبة', 'خطأ');
      this.markFormGroupTouched(this.form)
    }



  }

  SendRequestData() {
    console.log(`start send data`)

    const formData = new FormData();

    formData.append('full_name', this.FullyName);
    formData.append('mother_name', this.MotherName);
    formData.append('national_number', this.form.get(`isn`)?.value);
    formData.append('gender', this.Gender);
    formData.append('place_of_birth', this.PlaceOfBrith);
    formData.append('age_number', this.Age);


    if (this.OutBorderSyria == `1`) {
      formData.append('residence_syria', `1`);
      formData.append('country_name', this.NameCountryOutBorder);
      formData.append('number_of_years_residence_country', this.NumberOfYearOutBorder);
    }
    else if (this.OutBorderSyria == `0`) {
      formData.append('residence_syria', `0`);
    }



    if (this.NaitionElseSyria == `1`) {
      formData.append('has_other_nationality', `1`);
      formData.append('nationality', this.NameNaitionElse);
    }
    else if (this.NaitionElseSyria == `2`) {
      formData.append('has_other_nationality', `0`);
    }


    formData.append('current_place', this.form.get(`curplace`)?.value);

    formData.append('phone_number', this.CodeCountryphone + this.PhoneNumber);
    if(this.form.get(`email`)?.valid){
      formData.append('email', this.form.get(`email`)?.value);
    }


    let idDegree = this.form.get(`certification`)?.value;
    if (idDegree == "4" || idDegree == "5" || idDegree == "6" || idDegree == "7") {
      formData.append('education_level_id', idDegree);
      formData.append('number_years_study', this.form.get(`yearstu`)?.value);
      formData.append('university_name', this.form.get(`nameuniversity`)?.value);
      formData.append('major_name', this.form.get(`specification`)?.value);
      formData.append('garduation_date', this.form.get(`yeargardution`)?.value);
      formData.append('rate', this.form.get(`gpa`)?.value);
      formData.append('certificate_pdf', this.FileCert);
    }
    else { formData.append('education_level_id', idDegree); }


    if (this.PerviousWork == '1') {
      formData.append('has_experience', `1`);
      const AllExperince = this.setFieldExpe(this.Nexpe);
      formData.append('all_privious_expe', JSON.stringify(AllExperince));


      // formData.append('experience_years', this.NumberOfYearPriviousWork);
      // formData.append('experience_company', this.NamePriviouswork);
    }
    else if (this.PerviousWork == `0`) {
      formData.append('has_experience', `0`);
    }



    //formData.append('currently_working', this.CurentWork);

    formData.append('word', this.LevelWord);
    formData.append('excel', this.LevelExel);
    formData.append('powerpoint', this.levelPowerpoint);


    if (this.SecandLanguage == "1") {
       
      formData.append('language_ids',JSON
        .stringify(this.languagesArray) );
    }
    else { formData.append('has_other_language', this.SecandLanguage); }



    formData.append('skill_ids', JSON.stringify(this.filterSkills));

    formData.append('expected_start_work', this.DirectWork);

   formData.append('vacancy_id', this.vacancy_id ?? '');


    formData.append('cv_pdf', this.FileCv);
    formData.append('id_pdf', this.FilePersinalImage);

    formData.append('confirmation_previous_information', this.Checked ? '1' : '0');

    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    axios.post(`http://172.16.101.192:8000/api/ar/applications/submit`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((d) => {
      console.log(`succ`)
      this.toastr.success(`تم تسليم طلبك`);
      this.cleardata();
    }).catch((error) => {
      if (error.response) {


        console.log("Response Data:", error.response.data);
        console.log("Response Status:", error.response.status);
        console.log("Response Headers:", error.response.headers);


        this.toastr.error(`خطأ ${error.response.status}: ${error.response.data.message || 'هناك مشكلة بالسيرفر'}`);

      } else if (error.request) {

        console.log("Request:", error.request);
        this.toastr.error('لم يتم استلام رد من السيرفر');

      } else {

        console.log('Error:', error.message);
        this.toastr.error('خطأ في إعداد الطلب');
      }

      console.log("Full Error Object:", error);
      console.log("Error Config:", error.config);
    })

  }
}


