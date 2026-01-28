import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { TemplesComponent } from './temples/temples.component';
import { EventsComponent } from './events/events.component';
import { GoshalasComponent } from './goshalas/goshalas.component';
import { EditTempleComponent } from './edit-temple/edit-temple.component';
import { EditGoshalaComponent } from './edit-goshala/edit-goshala.component';
import { VillagesComponent } from './villages/villages.component';
import { EditVillageComponent } from './edit-village/edit-village.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { AddtempleComponent } from './addtemple/addtemple.component';
// import { EditEventComponent } from './edit-event/edit-event.component';
import { authGuard } from './auth.guard';
import { AddeventComponent } from './addevent/addevent.component';
import { AddgoshalaComponent } from './addgoshala/addgoshala.component';
import { AddvillageComponent } from './addvillage/addvillage/addvillage.component';
import { HindusworldOrganizationComponent } from './hindusworld-organization/hindusworld-organization.component';
import { AddMoreTempleDataComponent } from './add-more-temple-data/add-more-temple-data.component';
import { VillageAddMoreDataComponent } from './village-add-more-data/village-add-more-data.component';
import { EventAddMoreDataComponent } from './event-add-more-data/event-add-more-data.component';
import { GoshalaAddMoreDataComponent } from './goshala-add-more-data/goshala-add-more-data.component';
export const routes: Routes = [
    {path: '', redirectTo: 'temples', pathMatch: 'full'},
    {path: 'header', component: HeaderComponent},
    {path: 'temples', component: TemplesComponent},
    {path: 'events', component: EventsComponent,canActivate: [authGuard]},
    {path: 'goshalas', component: GoshalasComponent, canActivate: [authGuard],},
    {path: 'edit_temple/:id', component: EditTempleComponent},
    {path: 'villages', component: VillagesComponent,canActivate: [authGuard]},
    {path:'editgoshala/:id',component:EditGoshalaComponent},
    {path: 'edit_village/:id', component: EditVillageComponent},
    {path: 'edit_event/:id', component: EditEventComponent},
    {path: 'addtemple', component: AddtempleComponent},
    {path:'addevent', component: AddeventComponent},
    {path: 'addgoshala', component: AddgoshalaComponent},
    {path: 'addvillage', component: AddvillageComponent},
    {path:'organizations',component:HindusworldOrganizationComponent},
    {path:'Temple-added-data',component:AddMoreTempleDataComponent},
    {path:'village-added-data',component:VillageAddMoreDataComponent},
    {path:'event-added-data',component:EventAddMoreDataComponent},
    {path:'goshala-added-data',component:GoshalaAddMoreDataComponent}
    

];
