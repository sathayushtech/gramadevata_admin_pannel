// import { Component } from '@angular/core';
// import { UserService } from '../services/user.service';
// import { CommonModule } from '@angular/common';
// import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
// import { FormControl } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';


// @Component({
//   selector: 'app-dashboard',
//   imports: [CommonModule,ReactiveFormsModule],
//   templateUrl: './dashboard.component.html',
//   styleUrl: './dashboard.component.css'
// })
// export class DashboardComponent {


//     users: any[] = [];
//   userCount: any = null;
//   isLoading: boolean = false;
//   selectedUser: any = null;
//   isLoadingProfile = false;
//   isProfileLoading = false;
// searchControl = new FormControl<string>('');

//   constructor(private userService: UserService) {}

//   ngOnInit(): void {
//     this.loadAllUsers();

//   this.searchControl.valueChanges
//     .pipe(
//       debounceTime(400),
//       distinctUntilChanged()
//     )
//     .subscribe(value => {
//       console.log('Search value:', value); // 🔴 IMPORTANT
//       this.loadAllUsers(value ?? '');
//     });
//   }


//   // loadAllUsers(): void {
//   //   this.isLoading = true;

//   //   this.userService.getallusers().subscribe({
//   //     next: (res: any) => {
//   //       this.userCount = res?.user_count || null;
//   //       this.users = res?.profiles || [];
//   //       this.isLoading = false;
//   //     },
//   //     error: (err) => {
//   //       console.error('Failed to load users', err);
//   //       this.isLoading = false;
//   //     }
//   //   });
//   // }

// loadAllUsers(search: string = ''): void {
//   this.isLoading = true;
//    this.currentFilter = 'all';

//   this.userService.getallusers(search).subscribe({
//     next: (res: any) => {
//       this.userCount = res?.user_count ?? 0;
//       this.users = res?.profiles ?? [];
//       this.isLoading = false;
//     },
//     error: (err) => {
//       console.error('Failed to load users', err);
//       this.users = [];
//       this.userCount = 0;
//       this.isLoading = false;
//     }
//   });
// }




//     viewProfile(user: any): void {
//     this.isProfileLoading = true;
//     this.selectedUser = null;

//     this.userService.profiledatabyid(user.id).subscribe({
//       next: (res) => {
//         this.selectedUser = res;
//         this.isProfileLoading = false;
//       },
//       error: () => {
//         this.isProfileLoading = false;
//       }
//     });
//   }

// inactive_users:any;
// active_users:any;

// usersactiveorinactive(type: 'all' | 'active' | 'inactive'): void {
//   this.isLoading = true;
//   this.currentFilter = type;
//   this.selectedUser = null; // clear profile

//   this.userService.usersactiveorinactive().subscribe({
//     next: (res: any) => {

//       if (type === 'active') {
//         this.users = res?.active_users ?? [];
//       } 
//       else if (type === 'inactive') {
//         this.users = res?.inactive_users ?? [];
//       } 
//       else {
//         // 🔥 ALL users = active + inactive
//         const active = res?.active_users ?? [];
//         const inactive = res?.inactive_users ?? [];
//         this.users = [...active, ...inactive];
//       }

//       this.isLoading = false;
//     },
//     error: (err) => {
//       console.error('Failed to load users', err);
//       this.users = [];
//       this.isLoading = false;
//     }
//   });
// }


// currentFilter: 'all' | 'active' | 'inactive' = 'all';


// }





import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  users: any[] = [];
  userCount: any = {};
  selectedUser: any = null;
  isLoading: boolean = false;
  isProfileLoading: boolean = false;

  currentFilter: 'all' | 'active' | 'inactive' = 'all';

  searchControl = new FormControl<string>('');

  // ✅ STRONGLY TYPED CARDS
  cards: {
    label: string;
    value: number | undefined;
    type?: 'all' | 'active' | 'inactive';
  }[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadAllUsers();

    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(value => {
        this.loadAllUsers(value ?? '');
      });
  }

  // ✅ LOAD ALL USERS
  loadAllUsers(search: string = ''): void {
    this.isLoading = true;
    this.currentFilter = 'all';
    this.selectedUser = null;

    this.userService.getallusers(search).subscribe({
      next: (res: any) => {

        this.userCount = res?.user_count ?? {};
        this.users = res?.profiles ?? [];

        // ✅ Create cards here (correct typing)
        this.cards = [
          { label: 'Total', value: this.userCount?.total, type: 'all' },
          { label: 'Members', value: this.userCount?.members },
          { label: 'Non Members', value: this.userCount?.non_members },
          { label: 'Active', value: this.userCount?.active, type: 'active' },
          { label: 'Inactive', value: this.userCount?.inactive, type: 'inactive' }
        ];

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load users', err);
        this.users = [];
        this.isLoading = false;
      }
    });
  }

  // ✅ ACTIVE / INACTIVE FILTER
  usersactiveorinactive(type: 'all' | 'active' | 'inactive'): void {
    this.isLoading = true;
    this.currentFilter = type;
    this.selectedUser = null;

    this.userService.usersactiveorinactive().subscribe({
      next: (res: any) => {

        if (type === 'active') {
          this.users = res?.active_users ?? [];
        } 
        else if (type === 'inactive') {
          this.users = res?.inactive_users ?? [];
        } 
        else {
          const active = res?.active_users ?? [];
          const inactive = res?.inactive_users ?? [];
          this.users = [...active, ...inactive];
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load users', err);
        this.users = [];
        this.isLoading = false;
      }
    });
  }

  // ✅ VIEW PROFILE
  viewProfile(user: any): void {
    this.isProfileLoading = true;
    this.selectedUser = null;

    this.userService.profiledatabyid(user.id).subscribe({
      next: (res) => {
        this.selectedUser = res;
        this.isProfileLoading = false;
      },
      error: () => {
        this.isProfileLoading = false;
      }
    });
  }
}