import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
   // angular inports Automaticly 

  // imports: [
  //   CommonModule,
  //   MatInputModule,
  //     MatCardModule,
  //     MatButtonModule,
  //     MatToolbarModule,
  //     MatExpansionModule,
  //     MatProgressSpinnerModule,
  //     MatPaginatorModule,
  //     MatFormFieldModule,
  //     MatDialogModule
  // ],
  exports: [
      MatInputModule,
      MatCardModule,
      MatButtonModule,
      MatToolbarModule,
      MatExpansionModule,
      MatProgressSpinnerModule,
      MatPaginatorModule,
      MatFormFieldModule,
      MatDialogModule
  ],
  declarations: []
})
export class AngularMaterialModule { }
