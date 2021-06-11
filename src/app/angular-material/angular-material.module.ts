import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, 
  MatCardModule, 
  MatExpansionModule, 
  MatInputModule, 
  MatProgressSpinnerModule,
  MatPaginatorModule, 
  MatToolbarModule, 
  MatDialogModule} from '@angular/material';



@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
  ],

    
})
export class AngularMaterialModule { }
