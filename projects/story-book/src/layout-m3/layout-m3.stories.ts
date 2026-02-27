import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { NgxLayoutComponent } from '@hug/ngx-layout';
import { NgxActionsGroupComponent } from '@hug/ngx-layout/actions-group';
import { NgxAppBarComponent } from '@hug/ngx-layout/app-bar';
import { type Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface AppBarArgs {
    mode: 'standard' | 'condensed';
    title: string;
    subtitle?: string;
    helpUrl?: string;
    withBackIcon: boolean;
}

const meta: Meta<AppBarArgs> = {
    title: 'Components/Layout-m3',
    component: NgxLayoutComponent as unknown,
    decorators: [
        moduleMetadata({
            imports: [
                MatIcon,
                MatIconButton,
                MatButton,
                MatTooltip,
                NgxAppBarComponent,
                NgxLayoutComponent,
                NgxActionsGroupComponent
            ]
        })
    ],
    parameters: {
        layout: 'fullscreen'
    },
    argTypes: {
        mode: {
            control: 'radio',
            options: ['standard', 'condensed']
        }
    },
    args: {
        mode: 'standard',
        title: 'App Bar Title',
        subtitle: 'Subtitle',
        helpUrl: 'https://www.hug.ch/',
        withBackIcon: false
    },
    tags: ['autodocs']
};
export default meta;

type Story = StoryObj<AppBarArgs>;

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
            <ngx-actions-group>
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
        </ngx-layout>`,
        props: args
    })
};
