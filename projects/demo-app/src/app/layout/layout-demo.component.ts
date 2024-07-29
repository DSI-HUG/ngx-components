import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { NgxLayoutComponent } from '@hug/ngx-layout';
import { NgxSearchContainerComponent, NgxSearchInputDirective } from '@hug/ngx-search-container';
import { NgxStatusService } from '@hug/ngx-status';

@Component({
    selector: 'app-layout-demo',
    templateUrl: './layout-demo.component.html',
    styleUrls: ['./layout-demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        NgxSearchContainerComponent,
        NgxSearchInputDirective,
        NgxLayoutComponent
    ]
})
export class LayoutDemoComponent {

    protected withBackButton = true;
    protected withCloseButton = true;
    protected search: string | undefined;

    public constructor(
        private ngxStatusService: NgxStatusService
    ) {
    }

    protected log(msg: string, event?: Event): void {
        console.log(msg, event);
        this.ngxStatusService.showStatus({
            title: msg,
            type: 'info'
        });
    }
}
