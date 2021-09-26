import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IUser } from 'src/app/shared/models/user/user';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})


export class UserCardComponent implements OnInit {

  user: IUser;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log(params.id);
      this.getUser(params.id);
    });
  }

  getUser(id: number) {
    this.adminService.getUser(id).subscribe((user: IUser) => {
      this.user = user;
    },
    error => {
      console.log(error);
    });
  }



}
