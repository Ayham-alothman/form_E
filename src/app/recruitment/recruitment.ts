import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

type Category = {
  id: string;
  name: string;
  
};

type Vacancy = {
  id: string;
  category_id: string;
  name: string;
  skills: { id: number; name: string }[];
};

@Component({
  selector: 'app-recruitment',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
  ],
  templateUrl: './recruitment.html',
  styleUrls: ['./recruitment.scss']
})
export class Recruitment implements OnInit {
  // private store = inject(Store);
  // public themeService = inject(ThemeCustomizerService);
  //
  // recruitments$: Observable<any> = this.store.select(RecruitmentState.recruitment);
  // paginator: PaginatorState = new PaginatorState();
  // loading$ = this.store.select(RecruitmentState.loading);

  categories: Category[] = [];
  total_vacancies = 0;
  vacancies: Vacancy[] = [];
  selectedCategoryId: string = ""  
  filteredVacancies: Vacancy[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.recountCategories();
    this.applyFilter();
    this.asigncategoryandvacancies()
  }

  selectCategory(categoryId: string): void {
    this.selectedCategoryId = categoryId;
    this.applyFilter();
  }

  private applyFilter(): void {
    this.filteredVacancies = this.vacancies.filter(
      (v) => v.category_id === this.selectedCategoryId
    );
  }

  private recountCategories(): void {
    const map = new Map<string, number>();
    for (const v of this.vacancies) {
      map.set(v.category_id, (map.get(v.category_id) || 0) + 1);
    }

    this.categories = this.categories.map((c) => ({
      ...c,
      count: map.get(c.id) || 0,
    }));
  }

  private asigncategoryandvacancies(): void { 
   
    axios.get(`http://172.16.101.192:8000/api/ar/vacancies`).then((d) => { console.log(d);console.log(`runssss`)
      this.categories = d.data.data.categories;
      this.vacancies = d.data.data.vacancies
      this.total_vacancies = d.data.data.total_vacancies
    })
      .catch((e) => { console.log(e) })
  }

}


