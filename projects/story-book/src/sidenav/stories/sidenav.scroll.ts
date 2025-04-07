import { StoryObj } from '@storybook/angular';
import { times } from 'lodash-es';

import { NgxSidenavComponentType, sidenavArgs } from '../args/sidenav.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { sidenavContentAccordion1 } from '../templates/sidenav.content.accordion.item1.template';
import { sidenavContentAccordion2 } from '../templates/sidenav.content.accordion.item2.template';
import { sidenavContentNavList1 } from '../templates/sidenav.content.nav-list.item3.template';

const list = times(30);

export const sidenavScroll: StoryObj<NgxSidenavComponentType> = {
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
            <ngx-sidenav [theme]="SidebarTheme.DARK" [location]="SidebarLocation.RIGHT">
                @for(item of [${list.map(v => `"${v}"`).join(',')}]; track $index) {
                    <button nav-button>
                        <mat-icon>all_inclusive</mat-icon> {{item}}
                    </button>
                }
            </ngx-sidenav>
        </div>
        <div class="flex flex-column flex-auto">
            <!-- Menu Top -->
            <ngx-sidenav [theme]="SidebarTheme.LIGHT" [location]="SidebarLocation.TOP">
                @for(item of [${list.map(v => `"${v}"`).join(',')}]; track $index) {
                    <button nav-icon-button [matTooltip]="item">
                        <mat-icon>all_inclusive</mat-icon>
                    </button>
                }

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
