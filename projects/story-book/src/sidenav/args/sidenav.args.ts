import {
    NAV_JUSTIFY,
    NAV_SIZES,
    NavJustify,
    NavSize,
    SIDEBAR_LOCATIONS,
    SIDEBAR_THEMES,
    SidenavComponent
} from '@hug/ngx-sidenav';
import { StoryObj } from '@storybook/angular';
import { pick } from 'lodash-es';

import { ContentType } from '../helpers/content-templates/content-templates.component';

export type NgxSidenavComponentType = SidenavComponent & {
    content: ContentType;
    navSize: NavSize;
    navJustify: NavJustify;
    pageSize: string;
    navButtonType: 'nav-button' | 'nav-icon-button';
};

export const sidenavArgs: StoryObj<NgxSidenavComponentType> = {
    argTypes: {
        location: {
            control: { type: 'select' },
            options: SIDEBAR_LOCATIONS,
            description: 'Oriente le sens de la **sidebar** selon la position souhaitée.',
            table: {
                defaultValue: { summary: '"left"' },
                type: { summary: 'SidebarLocation' }
            }
        },
        theme: {
            control: { type: 'select' },
            options: SIDEBAR_THEMES,
            description: `Définit un style par défaut pour la **sidebar** :

- **dark** : fond sombre
- **light** : fond clair
- **none** : aucun style appliqué`,
            table: {
                defaultValue: { summary: '"none"' },
                type: { summary: 'SidebarTheme' }
            }
        },
        disabled: {
            description: 'Permet de désactiver l’affichage de la **sidebar**.',
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        pageSize: { table: { disable: true } }
    },
    args: {
        location: 'left',
        theme: 'dark',
        disabled: false,
        pageSize: 'min600x400'
    }
};

export const sidenavSizeArgs = ({ navSize, pick: pPick }: {
    navSize?: NavSize; pick?: string[];
} = {
    navSize: 'M'
}): StoryObj<NgxSidenavComponentType> => {
    navSize = navSize ?? 'M';
    const args = {
        argTypes: {
            navButtonType: {
                name: 'Type de Buttons',
                control: { type: 'select' },
                options: ['nav-button', 'nav-icon-button'],
                table: {
                    category: 'Test',
                    type: { summary: '"nav-button" | "nav-icon-button"' }
                }
            },
            navSize: {
                name: 'Size',
                control: { type: 'select' },
                options: NAV_SIZES,
                table: {
                    category: '[Size]',
                    defaultValue: { summary: '"M"' },
                    type: { summary: 'NavSize' }
                }
            },
            theme: {
                name: 'Theme',
                control: { type: 'select' },
                options: SIDEBAR_THEMES,
                table: {
                    category: 'Sidebar',
                    type: { summary: 'SidebarTheme' }
                }
            },
            location: {
                name: 'Location',
                control: { type: 'select' },
                options: SIDEBAR_LOCATIONS,
                table: {
                    category: 'Sidebar',
                    type: { summary: 'SidebarLocation' }
                }
            }
        },
        args: {
            navSize,
            navButtonType: 'nav-button',
            location: 'left',
            theme: 'dark'
        }
    } as StoryObj<NgxSidenavComponentType>;
    if (pPick) {
        return ({
            argTypes: { ...pick(args.argTypes, pPick) },
            args: { ...pick(args.args, pPick) }
        } as StoryObj<NgxSidenavComponentType>);
    } else {
        return args;
    }
};

export const sidenavJustifyArgs = ({ navJustify, pick: pPick }: {
    navJustify?: NavJustify; pick?: string[];
} = {
    navJustify: 'start'
}): StoryObj<NgxSidenavComponentType> => {
    navJustify = navJustify ?? 'start';
    const args = {
        argTypes: {
            navJustify: {
                name: 'Justify',
                control: { type: 'select' },
                options: NAV_JUSTIFY,
                table: {
                    category: '[Justify]',
                    defaultValue: { summary: '"start"' },
                    type: { summary: 'NavJustify' }
                }
            },
            theme: {
                name: 'Theme',
                control: { type: 'select' },
                options: SIDEBAR_THEMES,
                table: {
                    category: 'Sidenav',
                    type: { summary: 'SidebarTheme' }
                }
            },
            location: {
                name: 'Location',
                control: { type: 'select' },
                options: SIDEBAR_LOCATIONS,
                table: {
                    category: 'Sidenav',
                    type: { summary: 'SidebarLocation' }
                }
            }
        },
        args: {
            navJustify,
            location: 'left',
            theme: 'dark'
        }
    } as StoryObj<NgxSidenavComponentType>;
    if (pPick) {
        return ({
            argTypes: { ...pick(args.argTypes, pPick) },
            args: { ...pick(args.args, pPick) }
        } as StoryObj<NgxSidenavComponentType>);
    } else {
        return args;
    }
};
