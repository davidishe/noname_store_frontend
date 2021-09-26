import { Component, OnInit, AfterContentInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { SideNavService } from 'src/app/services/side-nav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements AfterViewChecked{


  constructor(
    public sideNavService: SideNavService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

}
