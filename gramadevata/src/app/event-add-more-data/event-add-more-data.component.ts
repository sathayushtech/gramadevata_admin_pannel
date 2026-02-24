import { Component } from '@angular/core';
import { TempleService } from '../services/temple.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-event-add-more-data',
  imports: [CommonModule],
  templateUrl: './event-add-more-data.component.html',
  styleUrl: './event-add-more-data.component.css'
})
export class EventAddMoreDataComponent {


 templeData: any[] = [];
  isLoading = false;

  constructor(private templeservice: TempleService,private router: Router) {}

  ngOnInit(): void {
    this.loadAddMoreeventsData();
  }

  loadAddMoreeventsData() {
    this.isLoading = true;

    this.templeservice.eventaddmoredata().subscribe(
      (res) => {
        this.templeData = res || [];
        this.isLoading = false;
      },
      (err) => {
        console.error('Error fetching add more temple data', err);
        this.isLoading = false;
      }
    );
  }


mergeevents(templeId: string): void {
  this.templeservice.Mergeeventdata(templeId, {}).subscribe({
    next: () => {
      console.log('Merge endpoint hit successfully');
    },
    error: (err) => {
      console.error('Error hitting merge endpoint:', err);
    }
  });
}

      addEvent(){
  this.router.navigate(['addevent'])
}

}