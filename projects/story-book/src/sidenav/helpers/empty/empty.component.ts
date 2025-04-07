/* eslint-disable @typescript-eslint/member-ordering, @angular-eslint/prefer-on-push-component-change-detection */
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-empty',
    imports: [
        RouterModule
    ],
    template: '<router-outlet/>'
})
export class EmptyComponent {}
