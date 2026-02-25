import { Routes } from '@angular/router';

import {RecruitmentApply} from "./recruitment-apply/recruitment-apply";
import {Recruitment} from "./recruitment/recruitment";

export const routes: Routes = [
      
  { path: 'recruitment/:id', component: RecruitmentApply }  ,
  { path: 'recruitment', component: Recruitment }  ,
  { path: '', component: Recruitment }  ,

];



// full_name:string
// mother_name:string
// gender  "0" || "1"
// place_of_birth:string
// age_number:string

// residence_syria "0" || "1"
//   if "1"
//      country_name:string
//      number_of_years_residence_country:string

// has_other_nationality "0" || "1"
//   if "1"
//     nationality_name:string


// current_place:string
// phone_number:string

// degree_id  "1"=>"7"
//   if "4"=>"7"
//     years_of_study:string
//     certificate_pdf:file


// has_experience "1"||"0"
//   if "1"
//      experience_years:string
//      experience_company:string

// currently_working "1"||"0"    "1"=> work

// word: "1"||"2"||"3"
// excel: "1"||"2"||"3"
// powerpoint: "1"||"2"||"3"


// has_other_language "1"||"0"
//   if "1"
//      language_name:string


// expected_start_work "1"=>"7"

// cv_pdf:file
// id_pdf:file

// confirmation_previous_information "0" || "1"









