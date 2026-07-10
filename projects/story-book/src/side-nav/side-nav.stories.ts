import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButton, MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTooltip } from '@angular/material/tooltip';
import { NgxLayoutComponent } from '@hug/ngx-layout';
import { NgxActionDirective, NgxActionsGroupComponent } from '@hug/ngx-layout/actions-group';
import { NgxAppBarComponent } from '@hug/ngx-layout/app-bar';
import { NgxColumnComponent } from '@hug/ngx-layout/column';
import { NgxColumnBarComponent } from '@hug/ngx-layout/column-bar';
import { NgxBarTitleDirective } from '@hug/ngx-layout/directives';
import { NgxFilterDirective, NgxFiltersGroupComponent, NgxFilterToggleDirective } from '@hug/ngx-layout/filters-group';
import { NgxMainBarComponent } from '@hug/ngx-layout/main-bar';
import { NgxPanelComponent } from '@hug/ngx-layout/panel';
import { NgxPanelBarComponent } from '@hug/ngx-layout/panel-bar';
import { NgxSearchBarContainerComponent, NgxSearchInputDirective } from '@hug/ngx-layout/search-bar-container';
import { NavActionComponent, NavButtonComponent, NavSectionComponent, SideNavComponent } from '@hug/ngx-layout/side-nav';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';


const meta: Meta<SideNavComponent> = {
    title: 'Components/Layout-m3/SideNav',
    component: SideNavComponent,
    decorators: [
        moduleMetadata({
            imports: [
                NavActionComponent,
                NavButtonComponent,
                NavSectionComponent,
                MatIcon,
                FormsModule,
                MatIcon,
                MatIconButton,
                MatButton,
                MatTooltip,
                NgxAppBarComponent,
                NgxLayoutComponent,
                NgxActionsGroupComponent,
                NgxSearchBarContainerComponent,
                MatInput,
                NgxSearchInputDirective,
                NgxMainBarComponent,
                NgxPanelComponent,
                NgxFiltersGroupComponent,
                NgxFilterDirective,
                NgxFilterToggleDirective,
                CommonModule,
                MatButtonModule,
                MatChipsModule,
                MatIconModule,
                MatButtonToggle,
                MatButtonToggleGroup,
                MatFormFieldModule,
                MatInputModule,
                ReactiveFormsModule,
                MatDatepickerModule,
                MatListModule,
                NgxPanelBarComponent,
                NgxColumnBarComponent,
                NgxBarTitleDirective,
                NgxColumnComponent,
                NgxActionDirective,
                MatBadgeModule
            ]
        })
    ],
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'The `SideNavComponent` (`ngx-side-nav`) is the main navigation sidebar component. It is composed of `NavButtonComponent` for navigating between sections and `NavActionComponent` for contextual actions within the sidebar.'
            }
        }
    }
};
export default meta;
type Story = StoryObj<SideNavComponent>;

export const defaultStory: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Default render of the `ngx-side-nav` component.'
            }
        }
    },
    args: {
        withDivider: false
    },
    render: args => {
        const props = {
            ...args,
            activePage: signal('problems'),
            updateActivePage: (page: string): void => {
                props.activePage.set(page);
            }
        };
        const template = `
        <div style="display: flex; height: 100vh; background-color: var(--mat-sys-surface-container-low)">
            <ngx-side-nav [withDivider]="withDivider">
                <ngx-nav-button (click)="updateActivePage('problems')" [active]="activePage() === 'problems'">
                    <mat-icon>healing</mat-icon>
                    Problèmes
                </ngx-nav-button>
                <ngx-nav-button (click)="updateActivePage('hospFile')" [active]="activePage() === 'hospFile'">
                    <mat-icon matBadgeSize="small" matBadge="15">Apartment</mat-icon>
                    Dossier d'hospitalisation
                    <ng-template></ng-template>
                </ngx-nav-button>
                <ngx-nav-section label="Sortie">
                    <ngx-nav-button (click)="updateActivePage('subproblemA')" [active]="activePage() === 'subproblemA'">
                        <mat-icon>category</mat-icon>
                        Retour à domicile
                    </ngx-nav-button>
                    <ngx-nav-button (click)="updateActivePage('subproblemB')" [active]="activePage() === 'subproblemB'">
                        <mat-icon>interests</mat-icon>
                        Future visite ambulatoire
                    </ngx-nav-button>
                </ngx-nav-section>
                <ngx-nav-section label="Modes">
                    <ngx-nav-button (click)="updateActivePage('light')" [active]="activePage() === 'light'">
                        <mat-icon>light_mode</mat-icon>
                        Light
                    </ngx-nav-button>
                    <ngx-nav-button (click)="updateActivePage('dark')" [active]="activePage() === 'dark'">
                        <mat-icon>dark_mode</mat-icon>
                        Dark
                    </ngx-nav-button>
                </ngx-nav-section>
                <ngx-nav-section label="Options">
                    <ngx-nav-button (click)="updateActivePage('close')" [active]="activePage() === 'close'">
                        <mat-icon>close</mat-icon>
                        Supprimer
                    </ngx-nav-button>
                    <ngx-nav-button (click)="updateActivePage('open')" [active]="activePage() === 'open'">
                        <mat-icon>open_in_new</mat-icon>
                        Open
                    </ngx-nav-button>
                </ngx-nav-section>

                <ngx-nav-action [active]="true">pause</ngx-nav-action>
                <ngx-nav-action [outline]="true">dark_mode</ngx-nav-action>
            </ngx-side-nav>
            @if (activePage() === 'hospFile') {
            <ngx-layout>
                <ngx-app-bar
                    mode="standard"
                    title="Dossier d'hospitalisation"
                    helpUrl="http://www.google.com"
                    >
                        <button matIconButton aria-label="Urgence">
                            <mat-icon>emergency</mat-icon>
                        </button>
                    </ngx-app-bar>
                    <ngx-main-bar>
                        <ngx-actions-group>
                            <div ngxAction>
                                <button matIconButton aria-label="Filter" matTooltip="Ajouter">
                                    <mat-icon>add</mat-icon>
                                </button>
                            </div>
                            <button matIconButton aria-label="Columns" matTooltip="Recharger">
                                <mat-icon>refresh</mat-icon>
                            </button>
                        </ngx-actions-group>
                        <ngx-search-bar-container [folded]="true">
                            <input
                                ngxSearchInput
                                type="text"
                                name="search"
                                placeholder="Rechercher"
                                [(ngModel)]="ngModel"
                            />
                        </ngx-search-bar-container>
                    </ngx-main-bar>
                    <ngx-panel>
                        <ngx-column>
                            <p>Le dossier d'hospitalisation du patien ABC</p>
                        </ngx-column>
                    </ngx-panel>
                </ngx-layout>
            } @else {
                <ngx-layout>
                    <ngx-app-bar
                    mode="standard"
                    title="Problèmes et antécédents"
                    helpUrl="http://www.google.com"
                    >
                        <button matIconButton aria-label="Urgence">
                            <mat-icon>emergency</mat-icon>
                        </button>
                    </ngx-app-bar>
                    <ngx-main-bar>
                        <ngx-actions-group>
                            <div ngxAction>
                                <button matIconButton aria-label="Filter" matTooltip="Ajouter">
                                    <mat-icon>add</mat-icon>
                                </button>
                            </div>
                            <button matIconButton aria-label="Columns" matTooltip="Recharcher">
                                <mat-icon>refresh</mat-icon>
                            </button>
                            <button matIconButton aria-label="Settings" matTooltip="Fusionner">
                                <mat-icon>call_merge</mat-icon>
                            </button>
                            <button matIconButton aria-label="Download" matTooltip="Invalider">
                                <mat-icon>delete_forever</mat-icon>
                            </button>
                        </ngx-actions-group>
                        <ngx-search-bar-container [folded]="true">
                            <input
                                ngxSearchInput
                                type="text"
                                name="search"
                                placeholder="Rechercher"
                                [(ngModel)]="ngModel"
                            />
                        </ngx-search-bar-container>
                    </ngx-main-bar>
                    <ngx-panel>
                        <ngx-column>
                            <p>La liste des problèmes du patien ABC</p>
                        </ngx-column>
                    </ngx-panel>
                </ngx-layout>
            }
        </div>
    `;

        return { props, template };
    }
};
