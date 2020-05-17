import { MessagesResolver } from './_reslover/messages-resolver';
import {ListResolver } from './_reslover/list-resolver';
import { MemberEditComponent } from './member-list/member-edit/member-edit.component';
import { MerberDetailsResolver } from './_reslover/merber-details-resolver';
import { MemberDetailComponent } from './member-list/member-detail/member-detail.component';
import { MemberListComponent } from './member-list/member-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { HomeComponent } from './home/home.component';
import { Routes, CanActivate } from '@angular/router';
import { MerberListsResolver } from './_reslover/merber-lists-resolver';
import { MerberEditResolver } from './_reslover/merber-edit-resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
export const appRoutes: Routes = [

  { path: '', component: HomeComponent },

  {
    path: '',//localhost:4200/
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'lists', component: ListsComponent ,
      resolve : {users :ListResolver}
    },
      {
        path: 'members', component: MemberListComponent,
        resolve: { users: MerberListsResolver }
      },
      {
        path: 'members/:id', component: MemberDetailComponent,
        resolve: { user: MerberDetailsResolver }
      },
      {
        path: 'member/edit', component: MemberEditComponent,
        resolve: { useredit: MerberEditResolver },canDeactivate:[PreventUnsavedChanges]
      },

      { path: 'messages', component: MessagesComponent,
      resolve: { messages: MessagesResolver} }
    ]
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },

];
