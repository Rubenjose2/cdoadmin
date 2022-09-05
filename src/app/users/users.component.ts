import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Roles, UserModel } from '../helpers/user.model';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

  userList: any[] = [];
  rolesForm = new FormControl();

  displayedColumns: string[] = [
    'Full Name',
    'Email' ,
    'Phone Number',
    'Roles',
    'Status'
  ];

  selectedValue: any;
  
  constructor(
    private userDataService: UsersService,
    private _snackBar: MatSnackBar,

    
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userDataService.getUsersList().subscribe(data => {
      this.userList = data.map((e: any) => {
        let _selectedValues: any[] = [];
        return {
          uid: e.payload.doc.id,
          firstName: e.payload.doc.data().firstName,
          lastName: e.payload.doc.data().lastName,
          email: e.payload.doc.data().email,
          phoneNumber: e.payload.doc.data().phoneNumber,
          status: e.payload.doc.data().status,
          rolesRaw: e.payload.doc.data().roles,
          // This method is needed to convert and massage the response
          roles: Object.entries(e.payload.doc.data().roles).map( role => {
            let newObject:any;
            if(role[1]) {
              _selectedValues.push(role[0]);
            }
            return newObject = {
              level: role[0],
            }
          }),
          selection: _selectedValues
          // ...e.payload.doc.data()
        }
      });
    });
  };

  /**
   * Change the Status of the User
   * @param uid
   * @param index
   */

   changeStatus(uid: UserModel, index:any) {
    let newUserStatus:any = uid;

    if(newUserStatus.status.pending) {
      delete newUserStatus.status.pending;
      newUserStatus.status.active = true;
    }else{
      if(newUserStatus.status.active){
        delete newUserStatus.status.active;
        newUserStatus.status.inactive = true;
      }else{
        delete newUserStatus.status.inactive;
        newUserStatus.status.active = true;
      }
    }
    this.userDataService.updateUser({
      uid:newUserStatus.uid ,
      status: newUserStatus.status
    }).then(() =>
      this.openSnackBar('User updated','ok')
    );

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    })
  }

  roleSelection(row:any, event:any) {
    if(event.isUserInput){
      //Create a new Object to be update base on the selection
      //this.rolesObject = new Roles;
      let _rolesRaw = row.rolesRaw;
      _rolesRaw[event.source.value] = event.source._selected;
      this.userDataService.updateUser( {
        uid: row.uid,
        roles: {... _rolesRaw}
      }).then( () => {
        this.openSnackBar('User updated','ok')
      });
    }
  }
}
