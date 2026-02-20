import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

import { NgxLayoutComponent } from '../../../layout/m2/layout.component';
import { NgxMessageBoxDialogService } from '../../../message-box-dialog/src/message-box-dialog.service';
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
    private ngxMessageBoxService = inject(NgxMessageBoxDialogService);
    private destroyRef = inject(DestroyRef);

    protected log(msg: string): void {
        this.ngxStatusService.showStatus({
            title: msg,
            type: 'info',
            duration: 1000
        });
    }

    protected msg(msg: string): void {
        this.ngxMessageBoxService.openConfirmation$(msg).pipe(
            takeUntilDestroyed(this.destroyRef)
        ).subscribe();
    }
}
