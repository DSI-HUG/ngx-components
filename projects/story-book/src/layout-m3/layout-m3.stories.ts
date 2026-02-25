import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
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
    component: NgxAppBarComponent as unknown,
    decorators: [
        moduleMetadata({
            imports: [
                MatIcon,
                MatIconButton,
                MatButton,
                MatTooltip,
                NgxAppBarComponent
            ]
        })
    ],
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
        </ngx-app-bar>`,
        props: args
    })
};
