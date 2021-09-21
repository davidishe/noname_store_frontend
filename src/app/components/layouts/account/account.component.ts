import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DisplayService } from 'src/app/services/display.service';
 
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountComponent implements OnInit, AfterViewInit {

  tabIndex$: Observable<number>;
  code: string;

  constructor(
    public displayService: DisplayService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,


  ) {  }

  ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.queryParams.code;
    const returnUrl = this.activatedRoute.snapshot.queryParams.code;
    console.log(returnUrl);

    this.tabIndex$ = this.displayService.tabIndex$;
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }




}
