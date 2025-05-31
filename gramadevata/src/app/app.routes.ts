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
export const routes: Routes = [
    {path: '', redirectTo: 'temples', pathMatch: 'full'},
    {path: 'header', component: HeaderComponent},
    {path: 'temples', component: TemplesComponent,canActivate: [authGuard],},
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
    {path: 'addvillage', component: AddvillageComponent}
    

];
