import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class PagesModule { }
