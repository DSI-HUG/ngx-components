import { StoryObj } from '@storybook/angular';
import { times } from 'lodash-es';

import { NgxSidenavComponentType } from '../args/sidenav.args';
import { sidebarEnums } from '../enums/sidebar.enums';

const list = times(30);

export const sidenavScroll: StoryObj<NgxSidenavComponentType> = {
    parameters: {
        docs: {
            description: {
                story: 'Dans cet exemple, on peut constater le bon affichage de la **scrollbar** ainsi que de son contenu en cas de dépassement.'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            ...sidebarEnums,
            list: list.map(v => v.toString())
        },
        template: `
<section class="sidenav nav-sidenav min600x400">
    <!-- Page -->
    <div class="page">
        <!-- Menu Left -->
        <div class="flex flex-row">
            <!-- # Sidenav -->
            <ngx-sidenav theme="dark" location="right">
                @for(item of list; track $index) {
                    <button nav-button>
                        <mat-icon>all_inclusive</mat-icon> {{item}}
                    </button>
                }
            </ngx-sidenav>
        </div>
        <div class="flex flex-column flex-auto">
            <!-- Menu Top -->
            <ngx-sidenav theme="light" location="top">
                @for(item of list; track $index) {
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

</section>`
    })
};
