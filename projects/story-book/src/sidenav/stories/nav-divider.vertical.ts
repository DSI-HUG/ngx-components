import { StoryObj } from '@storybook/angular';

import { navDividerArgs, NavDividerComponentArgs } from '../args/nav-divider.args';
import { sidebarEnums } from '../enums/sidebar.enums';
import { sidenavParts } from '../renders/templates/sidenav.horizontal.content.template';

export const navDividerVertical: StoryObj<NavDividerComponentArgs> = {
    parameters: {
        docs: {
            description: {
                story: 'Cette *story* permet de vérifier le rendu du `nav-divider` dans les différents thèmes en orientation verticale.'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            ...sidebarEnums
        },
        template: `
<section class="sidenav nav-divider" [class]="pageSize">
${sidenavParts(
            [
                {
                    partTitle: 'Verticale',
                    content: [
                        {
                            contentTitle: 'Default',
                            value: `<ngx-sidenav location="left">
                        <ngx-nav-divider></ngx-nav-divider>
                    </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Light',
                            value: `<ngx-sidenav theme="light" location="left">
                        <ngx-nav-divider></ngx-nav-divider>
                    </ngx-sidenav>`
                        },
                        {
                            contentTitle: 'Dark',
                            value: `<ngx-sidenav theme="dark" location="left">
                    <ngx-nav-divider></ngx-nav-divider>
                </ngx-sidenav>`
                        }
                    ]
                }
            ],
            'vertical'
        )}
</section>`
    }),
    ...navDividerArgs
};
