import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, HostBinding, Input, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MediaService } from '@hug/ngx-core';
import { SidenavService } from '@hug/ngx-sidenav';

@Component({
    selector: 'layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatToolbarModule,
        MatTooltipModule
    ]
})
export class LayoutComponent {
    @Input() public toolbarColor = 'primary';
    @Input() public editorToolbarId = 'editor-toolbar';

    @Input() public closeButtonLabel = 'Fermer';
    @Input() public backButtonLabel = 'Retour';

    @Input() public layoutToolbarExternal?: TemplateRef<unknown>;
    @Input() public layoutPrimaryActionExternal?: TemplateRef<unknown>;
    @Input() public layoutActionsExternal?: TemplateRef<unknown>;
    @Input() public layoutInfoBoxesExternal?: TemplateRef<unknown>;
    @Input() public layoutRightExternal?: TemplateRef<unknown>;

    @Output() public readonly closeButtonClicked = new EventEmitter<MouseEvent>();
    @Output() public readonly backButtonClicked = new EventEmitter<MouseEvent>();
    @Output() public readonly sideFilterClosed = new EventEmitter<void>();
    @Output() public readonly sideFilterOpened = new EventEmitter<void>();

    @ContentChild('layoutToolbar') protected layoutToolbarContent?: TemplateRef<unknown>;
    @ContentChild('layoutPrimaryAction') protected layoutPrimaryActionContent?: TemplateRef<unknown>;
    @ContentChild('layoutActions') protected layoutActionsContent?: TemplateRef<unknown>;
    @ContentChild('layoutInfoBoxes') protected layoutInfoBoxesContent?: TemplateRef<unknown>;
    @ContentChild('layoutRight') protected layoutRightContent?: TemplateRef<unknown>;

    @HostBinding('class.no-right') protected noRight = false;

    @ViewChild('sideFilter') protected sideFilter?: MatDrawer;

    private _withEditorToolbar = true;

    public get layoutToolbar(): TemplateRef<unknown> | undefined {
        return this.layoutToolbarExternal ?? this.layoutToolbarContent;
    }

    public get layoutPrimaryAction(): TemplateRef<unknown> | undefined {
        return this.layoutPrimaryActionExternal ?? this.layoutPrimaryActionContent;
    }

    public get layoutActions(): TemplateRef<unknown> | undefined {
        return this.layoutActionsExternal ?? this.layoutActionsContent;
    }

    public get layoutInfoBoxes(): TemplateRef<unknown> | undefined {
        return this.layoutInfoBoxesExternal ?? this.layoutInfoBoxesContent;
    }

    public get layoutRight(): TemplateRef<unknown> | undefined {
        const value = this.layoutRightExternal ?? this.layoutRightContent;
        this.noRight = !value;
        return value;
    }

    @Input()
    public set withEditorToolbar(value: BooleanInput) {
        this._withEditorToolbar = coerceBooleanProperty(value);
    }

    public get withEditorToolbar(): BooleanInput {
        return this._withEditorToolbar;
    }

    private _withSidenav = false;

    @Input()
    public set withSidenav(value: BooleanInput) {
        this._withSidenav = coerceBooleanProperty(value);
    }

    public get withSidenav(): BooleanInput {
        return this._withSidenav;
    }

    private _keepFilterButtonDisplayed = true;
    @Input()
    public set keepFilterButtonDisplayed(value: BooleanInput) {
        this._keepFilterButtonDisplayed = coerceBooleanProperty(value);
    }

    public get keepFilterButtonDisplayed(): BooleanInput {
        return this._keepFilterButtonDisplayed;
    }

    private _withCloseButton = false;
    @Input()
    public set withCloseButton(value: BooleanInput) {
        this._withCloseButton = coerceBooleanProperty(value);
    }

    public get withCloseButton(): BooleanInput {
        return this._withCloseButton;
    }

    private _withBackButton = false;

    @Input()
    public set withBackButton(value: BooleanInput) {
        this._withBackButton = coerceBooleanProperty(value);
    }

    public get withBackButton(): BooleanInput {
        return this._withBackButton;
    }

    private _displayEditorToolbar = true;

    @Input()
    public set displayEditorToolbar(value: BooleanInput) {
        this._displayEditorToolbar = coerceBooleanProperty(value);
    }

    public get displayEditorToolbar(): BooleanInput {
        return this._displayEditorToolbar;
    }

    public constructor(
        protected mediaService: MediaService,
        protected sidenavService: SidenavService
    ) {
    }

    public closeSideFilter(): void {
        void this.sideFilter?.close();
    }

    public openSideFilter(): void {
        void this.sideFilter?.open();
    }
}
