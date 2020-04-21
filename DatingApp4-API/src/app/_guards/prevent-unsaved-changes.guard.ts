import { MemberEditComponent } from './../member-list/member-edit/member-edit.component';
import { Injectable } from "@angular/core";
import { CanDeactivate } from '@angular/router';

@Injectable()

export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent>
{
  canDeactivate(component: MemberEditComponent) {
    if (component.editForm.dirty) {
      return confirm('Are oyu sure you want continue ? any unsaves changes will be lost ')
    }
    return true;


  }




}
