import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UserComponent } from '../user/user.component';
import { FormUserComponent } from '../form-user/form-user.component';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [UserComponent, FormUserComponent],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent implements OnInit {

  title: string =  "Aplicacion usuarios"

  users: User[] = [];
  userSelected: User;

  constructor(private service: UserService){

    this.userSelected = new User();
  }
  ngOnInit(): void {

    this.service.findAll().subscribe (users => this.users = users );
  }

  addUser(user: User): void{
    this.users=[...this.users,{...user}];
  }

  removeUser(id: number): void {
    this.users = this.users.filter(user => user.id != id);
  }

  setSelectedUser(userRow: User): void{
    this.userSelected = {... userRow}

  }

}
