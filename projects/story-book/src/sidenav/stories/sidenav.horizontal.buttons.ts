import { StoryObj } from '@storybook/angular';
import { includes } from 'lodash-es';

import { NavButtonComponentArgs, navButtonTypeVersionArgs } from '../args/nav-button.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { sidenavParts, sidenavSubpart } from '../renders/templates/sidenav.horizontal.content.template';

const templateOneLineDirective = (): string => `
            <button nav-button>
                <mat-icon>check_circle</mat-icon> one line
            </button>
            <button nav-button [selected]="true">
                <mat-icon>select</mat-icon> selected
            </button>`;
const templateTwoLineDirective = (): string => `
            <button nav-button>
                <mat-icon>check_circle</mat-icon> one line
            </button>
            <button nav-button>
                <mat-icon>add_circle</mat-icon> icon with two line
            </button>`;
const templateTwoLineCutDirective = (): string => `
            <button nav-button>
                <mat-icon>check_circle</mat-icon> one line
            </button>
            <button nav-button>
                <mat-icon>add_circle</mat-icon> <span text-ellipsis>icon with two line</span>
            </button>`;
const templateOneLineComponent = (): string => `
            <ngx-nav-button>
                <mat-icon>check_circle</mat-icon> one line
            </ngx-nav-button>
            <ngx-nav-button [selected]="true">
                <mat-icon>select</mat-icon> selected
            </ngx-nav-button>`;
const templateTwoLineComponent = (): string => `
            <ngx-nav-button>
                <mat-icon>check_circle</mat-icon> one line
            </ngx-nav-button>
            <button nav-button>
                <mat-icon>add_circle</mat-icon> icon with two line
            </button>`;
const templateTwoLineCutComponent = (): string => `
            <ngx-nav-button>
                <mat-icon>check_circle</mat-icon> one line
            </ngx-nav-button>
            <button nav-button>
                <mat-icon>add_circle</mat-icon> <span text-ellipsis>icon with two line</span>
            </button>`;

const templateIconOneLineDirective = (): string => `
            <button nav-icon-button  matTooltip="one line">
                <mat-icon>check_circle</mat-icon>
            </button>
            <button nav-icon-button [selected]="true" matTooltip="selected">
                <mat-icon>select</mat-icon>
            </button>`;
const templateIconOneLineComponent = (): string => `
            <ngx-nav-icon-button  matTooltip="one line">
                <mat-icon>check_circle</mat-icon>
            </ngx-nav-icon-button>
            <ngx-nav-icon-button [selected]="true"  matTooltip="selected">
                <mat-icon>select</mat-icon>
            </ngx-nav-icon-button>`;

const contentWrapper = (content: string, size = 'S'): Parameters<typeof sidenavSubpart>[1] => [
    {
        contentTitle: 'Default',
        value: `<ngx-sidenav location="top" navSize="${size}">
            ${content}
        </ngx-sidenav>`
    },
    {
        contentTitle: 'Light',
        value: `<ngx-sidenav location="top" theme="light" navSize="${size}">
            ${content}
        </ngx-sidenav>`
    },
    {
        contentTitle: 'Dark',
        value: `<ngx-sidenav location="top" theme="dark" navSize="${size}">
            ${content}
        </ngx-sidenav>`
    }
];

export const sidenavHorizontalButtons: StoryObj<NavButtonComponentArgs> = {
    parameters: {
        docs: {
            description: {
                story: `En mode **sidebar horizontale**, les \`nav-button\` sont positionnés de manière à être **centrés verticalement**.

Les icônes restent toujours **alignées sur une même ligne**, même si les labels ont des hauteurs différentes.
Cela garantit un rendu visuellement harmonieux, quel que soit le contenu textuel de chaque bouton.

> 💡 Ce comportement est particulièrement utile pour maintenir une interface propre et équilibrée dans les barres de navigation horizontales.`
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            ...sidebarEnums,
            includes
        },
        template: `<section class="sidenav nav-button">
            ${sidenavParts(
            [
                {
                    partTitle: 'MatButton > One line',
                    if: 'includes(["all", "nav-button"], navButtonVersion)',
                    subpart: [
                        {
                            subpartTitle: 'Directive',
                            if: 'includes(["all", "directive"], navButtonType)',
                            content: contentWrapper(templateOneLineDirective())
                        },
                        {
                            subpartTitle: 'Component',
                            if: 'includes(["all", "component"], navButtonType)',
                            content: contentWrapper(templateOneLineComponent())
                        }
                    ]
                },
                {
                    partTitle: 'MatButton > Two Line + Text Ellipsis',
                    if: 'includes(["all", "nav-button"], navButtonVersion)',
                    subpart: [
                        {
                            subpartTitle: 'Directive',
                            if: 'includes(["all", "directive"], navButtonType)',
                            content: contentWrapper(templateTwoLineCutDirective())
                        },
                        {
                            subpartTitle: 'Component',
                            if: 'includes(["all", "component"], navButtonType)',
                            content: contentWrapper(templateTwoLineCutComponent())
                        }
                    ]
                },
                {
                    partTitle: 'MatButton > Two Line Large',
                    if: 'includes(["all", "nav-button"], navButtonVersion)',
                    subpart: [
                        {
                            subpartTitle: 'Directive',
                            if: 'includes(["all", "directive"], navButtonType)',
                            content: contentWrapper(templateTwoLineDirective(), 'M')
                        },
                        {
                            subpartTitle: 'Component',
                            if: 'includes(["all", "component"], navButtonType)',
                            content: contentWrapper(templateTwoLineComponent(), 'M')
                        }
                    ]
                },
                {
                    partTitle: 'MatIconButton > One line',
                    if: 'includes(["all", "nav-icon-button"], navButtonVersion)',
                    subpart: [
                        {
                            subpartTitle: 'Directive',
                            if: 'includes(["all", "directive"], navButtonType)',
                            content: contentWrapper(templateIconOneLineDirective())
                        },
                        {
                            subpartTitle: 'Component',
                            if: 'includes(["all", "component"], navButtonType)',
                            content: contentWrapper(templateIconOneLineComponent())
                        }
                    ]
                }
            ],
            'horizontal'
        )}
        </section>`
    }),
    ...navButtonTypeVersionArgs
};
