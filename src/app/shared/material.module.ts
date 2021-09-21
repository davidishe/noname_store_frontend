import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule, MatTextareaAutosize } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CdkStepperModule } from '@angular/cdk/stepper';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';






const MaterialComponents = [
  MatButtonModule,
  MatInputModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatIconModule,
  MatBadgeModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatCardModule,
  MatDividerModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatMenuModule,
  MatTableModule,
  MatSortModule,
  MatListModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatTabsModule,
  MatChipsModule,
  MatProgressBarModule,
  MatExpansionModule,
  CdkStepperModule,
  MatStepperModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatAutocompleteModule

];

@NgModule({
   imports: [
      MaterialComponents
   ],
   exports: [
      MaterialComponents
   ],
   declarations: [
   ]
})

export class MaterialModule {}
