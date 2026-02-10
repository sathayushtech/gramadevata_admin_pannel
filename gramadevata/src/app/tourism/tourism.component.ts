import { Component } from '@angular/core';
import { TempleService } from '../services/temple.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AuthenticationService } from '../services/authentication.service';
import { GoshalaService } from '../services/goshala.service';
@Component({
  selector: 'app-tourism',
  imports: [CommonModule, NzSelectModule],
  templateUrl: './tourism.component.html',
  styleUrl: './tourism.component.css'
})
export class TourismComponent {


 temples: any;
  selectedTemple: any = null;
  blockId: any;
  templeId: any;
  CategoryOptions: { label: string; value: string }[] = [];
  selectedCategoryId:any;
  isConnected = false;
  templedata: any;
  ConnectionData: any;
  selectedImage: any;
  connectedId: any;
  villageid:any;
  goshaladata:any;

  constructor(private templeservice: TempleService, private router: Router, private authenticationservice: AuthenticationService,
    private goshalaService: GoshalaService,
    private route:ActivatedRoute,
  ){}

  ngOnInit(): void{
    this.fetchagoshals();

  }


  
    fetchagoshals() {
      this.goshalaService.getalltourism().subscribe(
        (data) => {
          console.log("Inactive goshala fetched:", data);
          this.temples = data.results
        },
        (error) => {
          console.error("Error fetching inactive goshala:", error);
        }
      );
    }
 


  fetchgoshalagetbyid(temple:any): void {
    this.templeId = this.route.snapshot.paramMap.get("id");
    this.selectedTemple = temple;

  
    this.goshalaService.getbytourism(this.templeId).subscribe(
      (data: any) => {
        this.goshaladata = data;
      },
      (error: any) => {
        console.error('Error fetching goshala data:', error);
      }
    );
  }
  


  


  editGoshala(id: any): void {
    this.router.navigate(['editgoshala', id]);
  }
  
  

  handleImageError(event: Event){
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/ohm.jpg';
  }


  

  addGoshala(){
    this.router.navigate(['addgoshala'])
  }

}