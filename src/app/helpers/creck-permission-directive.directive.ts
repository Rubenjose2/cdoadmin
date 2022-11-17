import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { PermissionService } from '../services/permission.service';

@Directive({
  selector: '[appCheckPermission]'
})
export class CreckPermissionDirectiveDirective implements OnInit, OnDestroy {

  @Input() appCheckPermission!: string[];

  constructor(
    private permissionService : PermissionService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
    ) { }

ngOnInit(): void {
  this.permissionService.checkPermission(this.appCheckPermission).subscribe(role => {
      (role)?this.viewContainer.createEmbeddedView(this.templateRef) : this.viewContainer.clear();
    }
    )
}
ngOnDestroy(): void {
}

}
