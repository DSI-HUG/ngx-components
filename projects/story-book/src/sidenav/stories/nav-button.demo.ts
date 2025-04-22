import { StoryObj } from '@storybook/angular';
import { includes } from 'lodash-es';

import { NavButtonComponentArgs, navButtonDemoArgs } from '../args/nav-button.args';
import { sidebarEnums } from '../enums/sidebar.enums';

export const navButtonDemo: StoryObj<NavButtonComponentArgs> = {
    parameters: {
        docs: {
            description: {
                story: `Cette *story* permet de tester l’ensemble des paramètres disponibles pour les \`nav-button\`.

Elle est utile pour vérifier le rendu, le comportement et l’intégration des différentes options (styles, actions, accessibilité, etc.) dans divers contextes.`
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            ...sidebarEnums,
            includes
        },
        template: `
<section class="sidenav nav-button" [class]="pageSize  + ' theme-'+theme">
    <div class="parts direction-horizontal">
        @if(includes(["directive", "all"], navButtonType)) {
            <!-- Directive Part -->
            <div class="flex flex-column">
                <div class="part-title">Directive</div>
                <div class="content-list sidenav">
                    @if(includes(["nav-button", "all"], navButtonVersion)) {
                        <div>
                            <div class="sidenav-title">Nav button</div>
                            <div class="sidenav-content">
                                <button
                                    nav-button
                                    [state]="state"
                                    [theme]="theme"
                                    [selected]="selected"
                                    [disabled]="disabled">
                                    <mat-icon>menu_open</mat-icon> nav button
                                </button>
                            </div>
                        </div>
                    }
                    @if(includes(["nav-icon-button", "all"], navButtonVersion)) {
                        <div>
                            <div class="sidenav-title">Nav icon button</div>
                            <div class="sidenav-content">
                                <button
                                    nav-icon-button
                                    [state]="state"
                                    [theme]="theme"
                                    [selected]="selected"
                                    [disabled]="disabled"
                                    matTooltip="nav icon button">
                                    <mat-icon>menu_open</mat-icon>
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        }
        @if(includes(["component", "all"], navButtonType)) {
            <!-- Component Part -->
            <div class="flex flex-column">
                <div class="part-title">Component</div>
                <div class="content-list sidenav">
                    @if(includes(["nav-button", "all"], navButtonVersion)) {
                        <div>
                            <div class="sidenav-title">Nav button</div>
                            <div class="sidenav-content">
                                <ngx-nav-button
                                    [state]="state"
                                    [theme]="theme"
                                    [loading]="loading"
                                    [selected]="selected"
                                    [disabled]="disabled">
                                    <mat-icon>menu_open</mat-icon> nav button
                                </ngx-nav-button>
                            </div>
                        </div>
                    }
                    @if(includes(["nav-icon-button", "all"], navButtonVersion)) {
                        <div>
                            <div class="sidenav-title">Nav icon button</div>
                            <div class="sidenav-content">
                                <ngx-nav-icon-button
                                    [state]="state"
                                    [theme]="theme"
                                    [loading]="loading"
                                    [selected]="selected"
                                    [disabled]="disabled"
                                    matTooltip="nav icon button">
                                    <mat-icon>menu_open</mat-icon>
                                </ngx-nav-icon-button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        }
    </div>
</section>`
    }),
    ...navButtonDemoArgs
};
