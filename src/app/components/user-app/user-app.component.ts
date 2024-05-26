import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UserComponent } from '../user/user.component';
import { FormUserComponent } from '../form-user/form-user.component';
import Swal from 'sweetalert2';

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

  open: boolean = false;

  constructor(private service: UserService){

    this.userSelected = new User();
  }
  ngOnInit(): void {

    this.service.findAll().subscribe (users => this.users = users );
  }

  addUser(user: User): void{
    if(user.id > 0){
      this.users = this.users.map(u=> (u.id == user.id)?{ ...user } : u);
    }else {
      this.users=[...this.users,{...user,id: new Date().getTime()}];
    }

  Swal.fire({
    title: "Guardado",
    text: "Se ha guardado correctamente",
    icon: "success"
  });
    this.userSelected = new User();
  }

  removeUser(id: number): void {

    Swal.fire({
      title: "Seguro que quiere eliminar?",
      text: "Cuidado el usuario sera eliminado del sistema",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si"
    }).then((result) => {
      if (result.isConfirmed) {
        this.users = this.users.filter(user => user.id != id);
        Swal.fire({
          title: "Eliminado!",
          text: "Usuario eliminado con exito",
          icon: "success"
        });
      }
    });


  }

  setSelectedUser(userRow: User): void{
    this.userSelected = {... userRow}
    this.open=true;

  }

  setOpen(): void {
    this.open = !this.open;
  }

}
