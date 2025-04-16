import { StoryObj } from '@storybook/angular';

import { NgxSidenavComponentType, sidenavArgs } from '../args/sidenav.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { sidenavContentAccordion1 } from '../templates/sidenav.content.accordion.item1.template';
import { sidenavContentAccordion2 } from '../templates/sidenav.content.accordion.item2.template';
import { sidenavContentNavList1 } from '../templates/sidenav.content.nav-list.item3.template';

export const sidenavAlign: StoryObj<NgxSidenavComponentType> = {
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates the standard usage of `SidenavComponent`.'
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

</section>

<!-- # Templates -->
${sidenavContentAccordion1}
${sidenavContentAccordion2}
${sidenavContentNavList1}`
    }),
    ...sidenavArgs
};
