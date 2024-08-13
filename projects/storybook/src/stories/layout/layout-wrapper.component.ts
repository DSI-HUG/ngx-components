import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxLayoutComponent } from '../../../../layout/src/layout.component';
import { NgxSearchContainerComponent, NgxSearchInputDirective } from '../../../../search-container/src/search-container.component';
import { NgxStatusService } from '../../../../status/src/status.service';

@Component({
    selector: 'storybook-layout-wrapper',
    templateUrl: './layout-wrapper.component.html',
    styleUrls: ['./layout-wrapper.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatChipsModule,
        NgxSearchContainerComponent,
        NgxSearchInputDirective,
        NgxLayoutComponent
    ]
})
export class StorybookLayoutWrapperComponent {

    @Input()
    public toolbarColor = 'primary';

    protected withBackButton = true;
    protected withCloseButton = true;
    protected search: string | undefined;

    private ngxStatusService = inject(NgxStatusService);

    protected log(msg: string, event?: Event): void {
        console.log(msg, event);
        this.ngxStatusService.showStatus({
            title: msg,
            type: 'info',
            duration: 1000
        });
    }
}
