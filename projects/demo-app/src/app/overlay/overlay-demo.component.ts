import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OverlayComponent } from '@hug/ngx-overlay';


@Component({
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-overlay-demo',
    styleUrls: ['./overlay-demo.component.scss'],
    templateUrl: './overlay-demo.component.html',
    standalone: true,
    imports: [
        CommonModule,
        OverlayComponent,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatTabsModule,
        MatToolbarModule
    ]
})
export class OverlayDemoComponent {
    @ViewChild('contextMenu')
    private contextMenu?: OverlayComponent;

    public selected = '';
    public items = [
        { text: 'Refresh' },
        { text: 'Settings' },
        { text: 'Help', disabled: true },
        { text: 'Sign Out' }
    ];

    public tabIndex = 1;

    public select(text: string): void {
        this.selected = text;
    }

    public onContextMenu(event: MouseEvent): boolean {
        const parent = event.currentTarget as HTMLElement;
        const parentRect = parent.getBoundingClientRect();
        this.contextMenu?.show(event.pageX - parentRect.left, event.pageY - parentRect.top);
        event.preventDefault();
        return false;
    }
}
