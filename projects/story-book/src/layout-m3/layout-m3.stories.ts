import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatTooltip } from '@angular/material/tooltip';
import { NgxLayoutComponent } from '@hug/ngx-layout';
import { NgxActionsGroupComponent } from '@hug/ngx-layout/actions-group';
import { NgxAppBarComponent } from '@hug/ngx-layout/app-bar';
import { NgxSearchBarContainerComponent, SearchInputDirective } from '@hug/ngx-layout/search-bar-container/';
import { type Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { argTypesLayout } from './arg-types-layout';

const meta: Meta = {
    title: 'Components/Layout-m3',
    decorators: [
        moduleMetadata({
            imports: [
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
                SearchInputDirective
            ]
        })
    ],
    parameters: {
        layout: 'fullscreen'
    },
    argTypes: {
        ...argTypesLayout
    },
    args: {
        mode: 'standard',
        title: 'App Bar Title',
        subtitle: 'Subtitle',
        helpUrl: 'https://www.hug.ch/',
        withBackIcon: false,
        folded: false
    },
    tags: ['autodocs']
};
export default meta;

type Story = StoryObj;

export const basic: Story = {
    render: args => ({
        template: `
        <ngx-layout>
            <ngx-app-bar
            [mode]="mode"
            [title]="title"
            [subtitle]="subtitle"
            [helpUrl]="helpUrl"
            [withBackIcon]="withBackIcon"
            >
                <button mat-icon-button aria-label="Home">
                    <mat-icon>home</mat-icon>
                </button>
            </ngx-app-bar>
            <ngx-actions-group [moreActionsTooltip]="moreActionsTooltip">
                <button mat-icon-button aria-label="Filter" matTooltip="Filtres">
                    <mat-icon>filter_list</mat-icon>
                </button>
                <button mat-icon-button aria-label="Columns" matTooltip="Colonnes">
                    <mat-icon>view_column</mat-icon>
                </button>
                <button mat-icon-button aria-label="Settings" matTooltip="Paramètres">
                    <mat-icon>settings</mat-icon>
                </button>
                <button mat-icon-button aria-label="Download" matTooltip="Télécharger">
                    <mat-icon>download</mat-icon>
                </button>
            </ngx-actions-group>
            <ngx-search-bar-container [folded]="folded">
                <input
                    ngx-search-input
                    type="text"
                    name="search"
                    placeholder="Rechercher"
                    [(ngModel)]="ngModel"                
                />
            </ngx-search-bar-container>
        </ngx-layout>`,
        props: args
    })
};
