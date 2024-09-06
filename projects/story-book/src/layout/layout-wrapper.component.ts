import { ChangeDetectionStrategy, Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

import { NgxLayoutComponent } from '../../../layout/src/layout.component';
import { NgxSearchContainerComponent, NgxSearchInputDirective } from '../../../search-container/src/search-container.component';
import { NgxStatusService } from '../../../status/src/status.service';

@Component({
    selector: 'storybook-layout-wrapper',
    templateUrl: './layout-wrapper.component.html',
    styleUrls: ['./layout-wrapper.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatIcon,
        MatIconButton,
        MatFabButton,
        MatChipListbox,
        MatChipOption,
        MatTooltip,
        NgxSearchContainerComponent,
        NgxSearchInputDirective,
        NgxLayoutComponent,
        FormsModule // todo: voir comment supprimer ce dernier module
    ]
})
export class StorybookLayoutWrapperComponent {

    @Input()
    public toolbarColor = 'primary';

    protected withBackButton = true;
    protected withCloseButton = true;
    protected search: string | undefined;

    private ngxStatusService = inject(NgxStatusService);

    protected log(msg: string): void {
        this.ngxStatusService.showStatus({
            title: msg,
            type: 'info',
            duration: 1000
        });
    }
}
