import { StoryObj } from '@storybook/angular';

import { NgxSidenavComponentType } from '../args/sidenav.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { sidenavParts } from '../templates/sidenav.horizontal.content.template';

export const sidenavSizeHorizontal: StoryObj<NgxSidenavComponentType> = {
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates the standard usage of `NgxNavIconButtonComponent`.'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            ...sidebarEnums
        },
        template: `
<section class="sidenav">
    ${sidenavParts(
            [
                {
                    partTitle: 'Horizontal',
                    content: [
                        {
                            contentTitle: 'Size XS',
                            value: `<ngx-sidenav [navSize]="NavSize.XS" [location]="SidebarLocation.TOP" [theme]="SidebarTheme.LIGHT">
                                        <button nav-icon-button matTooltip="raven"><mat-icon>raven</mat-icon></button>
                                        <button nav-icon-button matTooltip="nature"><mat-icon>emoji_nature</mat-icon></button>
                                    </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Size S',
                            value: `<ngx-sidenav [navSize]="NavSize.S" [location]="SidebarLocation.TOP" [theme]="SidebarTheme.LIGHT">
                                        <button nav-icon-button matTooltip="raven"><mat-icon>raven</mat-icon></button>
                                        <button nav-icon-button matTooltip="nature"><mat-icon>emoji_nature</mat-icon></button>
                                    </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Size M',
                            value: `<ngx-sidenav [navSize]="NavSize.M" [location]="SidebarLocation.TOP" [theme]="SidebarTheme.LIGHT">
                                        <button nav-button><mat-icon>raven</mat-icon>raven</button>
                                        <button nav-button><mat-icon>emoji_nature</mat-icon>nature</button>
                                    </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Size L',
                            value: `<ngx-sidenav [navSize]="NavSize.L" [location]="SidebarLocation.TOP" [theme]="SidebarTheme.LIGHT">
                                        <button nav-button><mat-icon>raven</mat-icon>raven</button>
                                        <button nav-button><mat-icon>emoji_nature</mat-icon>a bee with a flower</button>
                                    </ngx-sidenav>`
                        }
                    ]
                }
            ],
            'horizontal'
        )}
</section>`
    })
};
