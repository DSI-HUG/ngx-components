import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, HostBinding, inject, Input, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { NgxMediaService } from '@hug/ngx-core';
import { NgxSidenavService } from '@hug/ngx-sidenav';

@Component({
    selector: 'ngx-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgTemplateOutlet,
        AsyncPipe,
        MatIconButton,
        MatIcon,
        MatDrawer,
        MatDrawerContainer,
        MatDrawerContent,
        MatToolbar,
        MatTooltip
    ]
})
export class NgxLayoutComponent {
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

    protected mediaService = inject(NgxMediaService);
    protected sidenavService = inject(NgxSidenavService);

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

    public closeSideFilter(): void {
        void this.sideFilter?.close();
    }

    public openSideFilter(): void {
        void this.sideFilter?.open();
    }
}
