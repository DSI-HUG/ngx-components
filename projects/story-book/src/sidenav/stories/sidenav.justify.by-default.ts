import { StoryObj } from '@storybook/angular';

import { NgxSidenavComponentType } from '../args/sidenav.args';
import { sidebarEnums } from '../enums/sidebar.enums';

export const sidenavJustifyByDefault: StoryObj<NgxSidenavComponentType> = {
    parameters: {
        docs: {
            description: {
                story: `Les alignements par défaut sont les suivants :

- En vertical : **'start'**
- En horizontal : **'end'**`
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            ...sidebarEnums
        },
        template: `
<section class="sidenav nav-sidenav min600x400">
    <!-- Page -->
    <div class="page">
        <!-- Menu Left -->
        <div class="flex flex-row">
            <!-- # Sidenav -->
            <ngx-sidenav theme="dark" location="right">
                <button nav-button [matTooltip]="item">
                    <mat-icon>looks_one</mat-icon> alignement
                </button>
            </ngx-sidenav>
        </div>
        <div class="flex flex-column flex-auto">
            <!-- Menu Top -->
            <ngx-sidenav theme="light" location="top">
                <button nav-icon-button>
                    <mat-icon matTooltip="one">looks_one</mat-icon>
                </button>
            </ngx-sidenav>
            <div class="page-container">
                <!-- # Content -->
                <div class="content">
                    <h1>Page Title</h1>
                    Lorem ipsum dolor sit amet...
                </div>
            </div>
        </div>
    </div>

</section>`
    })
};
