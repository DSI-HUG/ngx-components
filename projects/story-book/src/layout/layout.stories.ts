import { FormsModule } from '@angular/forms';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNgxSearchContainer } from '@hug/ngx-search-container';
import { applicationConfig, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { provideNgxLayout } from 'projects/layout/src/providers';
import { provideNgxMessageBoxDialog } from 'projects/message-box-dialog/src/providers';
import { NgxSearchContainerComponent, NgxSearchInputDirective } from 'projects/search-container/src/search-container.component';
import { provideNgxStatus } from 'projects/status/src/providers';

import { NgxLayoutComponent } from '../../../layout/src/layout.component';
import { NgxStatusService } from '../../../status/src/status.service';
import { StorybookLayoutWrapperComponent } from './layout-wrapper.component';

const meta: Meta<NgxLayoutComponent> = {
    title: 'Components/Layout',
    component: NgxLayoutComponent,
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(), // Provides animations to the application
                provideNgxLayout(),
                provideNgxStatus(),
                provideNgxSearchContainer(),
                provideNgxMessageBoxDialog()
            ]
        }),
        moduleMetadata({
            imports: [
                FormsModule
            ],
            providers: [NgxStatusService]
        })
    ],
    tags: ['autodocs'],
    argTypes: {
        toolbarColor: {
            options: ['primary', 'accent'],
            control: { type: 'select' },
            description: 'Sets the color of the toolbar. Choose between primary or accent themes.',
            table: {
                defaultValue: {
                    summary: 'primary'
                },
                type: { summary: 'primary | accent' }
            }
        }
    },
    args: {
        toolbarColor: 'primary'
    },
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'The `NgxLayoutComponent` is a flexible layout component for creating application layouts at HUG. It includes options for toolbars, actions, and side panels, making it adaptable for various use cases.'
            }
        }
    }
};
export default meta;
type Story = StoryObj<NgxLayoutComponent>;

export const completeLayout: Story = {
    decorators: [
        moduleMetadata({
            imports: [
                StorybookLayoutWrapperComponent
            ]
        })
    ],
    parameters: {
        docs: {
            description: {
                story: 'Here you can see everything that can be added to have this complete component. <ul><li>Template <code>layoutToolbar</code><br/><ul><li><code>toolbar-title</code>directive on span to add title</li><li><code>ngx-search-container</code>component for searching</li></ul></li><li>Template <code>layoutPrimaryAction</code></li><li>Template <code>layoutActions</code></li><li>Template <code>layoutRight</code><br/><ul><li><code>filters-chip-list</code>directive on div to contain mat-chip-listbox</li></ul></li><li>Template <code>layoutInfoBoxes</code></li></ul>'
            }
        }
    },
    render: args => ({
        props: args,
        template: '<storybook-layout-wrapper [toolbarColor]="toolbarColor"></storybook-layout-wrapper>'
    })
};


export const layoutToolbar: Story = {
    args: {
        toolbarColor: 'accent'
    },
    decorators: [
        moduleMetadata({
            imports: [
                NgxSearchInputDirective,
                NgxSearchContainerComponent
            ]
        })
    ],
    parameters: {
        docs: {
            description: {
                story: 'The <code>layoutToolbar</code> template inside the component adds a toolbar to it.<ul><li>The <code>toolbarColor</code> Input on the component allows you to define the color of the toolbar. Here I have <code>toolbarColor="accent"</code></li><li>The span with directive <code>toolbar-title</code> allows you to add a title to the toolbar</li><li>You can add an <code>ngx-search-container</code> in the toolbar. Its size will fit by default</li></ul>'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            search: '',
            log: (msg: string, event?: Event): void => {
                console.log(msg, event);
            }
        },
        template: `
            <section>
                <ngx-layout [toolbarColor]="toolbarColor">
                    <ng-template #layoutToolbar>
                        <span toolbar-title>My toolbar-title</span>
                        <ngx-search-container>
                            <input type="text" [(ngModel)]="search" (ngModelChange)="log('Search changed', $event)" placeholder="My ngx-search-container" autocomplete="off" ngx-search-input />
                        </ngx-search-container>
                    </ng-template>
                    <div class="content-container">Layout content</div>
                </ngx-layout>
            </section>
          `
    })
};

export const actionsToolbar: Story = {
    decorators: [
        moduleMetadata({
            imports: [
                MatFabButton,
                MatIconButton,
                MatTooltip,
                MatIcon
            ]
        })
    ],
    parameters: {
        docs: {
            description: {
                story: 'The actions template inside the component adds buttons on the toolbar. You must have the <code>layoutToolbar</code> template for it to work correctly. <ul><li>The <code>layoutPrimaryAction</code> template allows you to add one primary button on the toolbar. Here my add icon button.</li><li>The <code>layoutActions</code> template allows you to add additional buttons to the toolbar. Here my refresh and my favorite icon button.</li></ul>'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            log: (msg: string): void => {
                alert(msg);
            }
        },
        template: `
            <section>
                <ngx-layout [toolbarColor]="toolbarColor">
                    <ng-template #layoutToolbar>
                        <span toolbarTitle>Layout with content to scroll</span>
                    </ng-template>

                    <!-- Primary action -->
                    <ng-template #layoutPrimaryAction>
                        <button type="button" mat-fab matTooltip="Add" (click)="log('Add button clicked')">
                            <mat-icon>add</mat-icon>
                        </button>
                    </ng-template>

                    <!-- Actions panel -->
                    <ng-template #layoutActions>
                        <button type="button" mat-icon-button matTooltip="Refresh" (click)="log('Refresh button clicked')">
                            <mat-icon>refresh</mat-icon>
                        </button>

                        <button type="button" mat-icon-button matTooltip="Favorite" (click)="log('Favorite button clicked')">
                            <mat-icon>favorite</mat-icon>
                        </button>
                    </ng-template>
                    <div class="content-container">
                        @for(value of [1, 2, 3, 4, 5]; track value) { <li>{{value}}</li> }
                    </div>
                </ngx-layout>
            </section>
          `
    })
};

export const rightPanel: Story = {
    decorators: [
        moduleMetadata({
            imports: [
                MatChipListbox,
                MatChipOption
            ]
        })
    ],
    parameters: {
        docs: {
            description: {
                story: 'The <code>layoutRight</code> template inside the component adds a right panel to it.<ul><li>A button to Open/Close the right panel will be automatically added to the toolbar</li><li>>You can add a <code>filters-chip-list</code> directive that can manage your filters</li></ul>'
            }
        }
    },
    render: args => ({
        props: {
            ...args
        },
        template: `
            <section class="moreHeight">
                <ngx-layout [toolbarColor]="toolbarColor">
                    <ng-template #layoutToolbar>
                    </ng-template>

                    <!-- Right panel -->
                    <ng-template #layoutRight>
                        <div class="layout-right-container">
                            Layout right
                            <div filters-chip-list>
                                <mat-chip-listbox class="mat-mdc-chip-set-stacked" aria-label="Color selection">
                                    <mat-chip-option>filter 1</mat-chip-option>
                                    <mat-chip-option>filter 2</mat-chip-option>
                                    <mat-chip-option>filter 3</mat-chip-option>
                                    <mat-chip-option>filter 4</mat-chip-option>
                                    <mat-chip-option>filter 5</mat-chip-option>
                                </mat-chip-listbox>
                            </div>
                        </div>
                    </ng-template>
                    <div class="content-container">Layout content</div>
                </ngx-layout>
            </section>
          `
    })
};

export const infosBoxes: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The <code>layoutInfoBoxes</code> template inside the component allows you to add informations under the toolbar.'
            }
        }
    },
    render: args => ({
        props: {
            ...args
        },
        template: `
            <section>
                <ngx-layout [toolbarColor]="toolbarColor">
                    <ng-template #layoutToolbar>
                    </ng-template>

                    <!-- Info boxes panel -->
                    <ng-template #layoutInfoBoxes>
                        <span class="info-box">Info box</span>
                        <span class="info-box primary">Info box primary</span>
                        <span class="info-box accent">Info box accent</span>
                    </ng-template>

                    <div class="content-container">Layout content</div>
                </ngx-layout>
            </section>
          `
    })
};
