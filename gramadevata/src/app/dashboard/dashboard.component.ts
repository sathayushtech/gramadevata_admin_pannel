import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {


    users: any[] = [];
  userCount: any = null;
  isLoading: boolean = false;
  selectedUser: any = null;
  isLoadingProfile = false;
  isProfileLoading = false;
searchControl = new FormControl<string>('');

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadAllUsers();

  this.searchControl.valueChanges
    .pipe(
      debounceTime(400),
      distinctUntilChanged()
    )
    .subscribe(value => {
      console.log('Search value:', value); // 🔴 IMPORTANT
      this.loadAllUsers(value ?? '');
    });
  }


  // loadAllUsers(): void {
  //   this.isLoading = true;

  //   this.userService.getallusers().subscribe({
  //     next: (res: any) => {
  //       this.userCount = res?.user_count || null;
  //       this.users = res?.profiles || [];
  //       this.isLoading = false;
  //     },
  //     error: (err) => {
  //       console.error('Failed to load users', err);
  //       this.isLoading = false;
  //     }
  //   });
  // }

loadAllUsers(search: string = ''): void {
  this.isLoading = true;

  this.userService.getallusers(search).subscribe({
    next: (res: any) => {
      this.userCount = res?.user_count ?? 0;
      this.users = res?.profiles ?? [];
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Failed to load users', err);
      this.users = [];
      this.userCount = 0;
      this.isLoading = false;
    }
  });
}




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


