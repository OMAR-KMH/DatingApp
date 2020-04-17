import { AuthGuard } from './_guards/auth.guard';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { HomeComponent } from './home/home.component';
import { Routes, CanActivate } from '@angular/router';
import { MembersComponent } from './members/members.component';
export const appRoutes: Routes = [

  { path: '', component: HomeComponent },

  {
    path: '',//localhost:4200/
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'lists', component: ListsComponent, },
      { path: 'members', component: MembersComponent, },
      { path: 'messages', component: MessagesComponent, }
    ]
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },

];
