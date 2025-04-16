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

import { ContentType } from '../enums/content.type';

export type NgxSidenavComponentType = SidenavComponent & {
    content: ContentType;
    navSize: NavSize;
    navJustify: NavJustify;
    pageSize: string;
};

export const sidenavArgs: StoryObj<NgxSidenavComponentType> = {
    argTypes: {
        location: {
            control: { type: 'select' },
            options: SIDEBAR_LOCATIONS,
            table: {
                defaultValue: { summary: 'RIGHT' },
                type: { summary: 'SidebarLocation' }
            }
        },
        theme: {
            control: { type: 'select' },
            options: SIDEBAR_THEMES,
            table: {
                defaultValue: { summary: 'NONE' },
                type: { summary: 'SidebarTheme' }
            }
        },
        disabled: {
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
export const sidenavContentArgs: StoryObj<NgxSidenavComponentType> = {
    argTypes: {
        content: {
            name: 'Tests / Content',
            control: { type: 'select' },
            options: Object.values(ContentType),
            table: {
                defaultValue: { summary: 'TITLE_TEXT' },
                type: { summary: 'ContentType' }
            }
        },
        ...sidenavArgs.argTypes
    },
    args: {
        content: ContentType.TITLE_TEXT,
        ...sidenavArgs.args
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
            navSize: {
                name: 'Size',
                control: { type: 'select' },
                options: NAV_SIZES,
                table: {
                    defaultValue: { summary: 'M' },
                    type: { summary: 'NavSize' }
                }
            },
            theme: {
                name: 'Test / Theme',
                control: { type: 'select' },
                options: SIDEBAR_THEMES,
                table: {
                    defaultValue: { summary: 'NONE' },
                    type: { summary: 'SidebarTheme' }
                }
            },
            location: {
                name: 'Test / Location',
                control: { type: 'select' },
                options: SIDEBAR_LOCATIONS,
                table: {
                    defaultValue: { summary: 'RIGHT' },
                    type: { summary: 'SidebarLocation' }
                }
            }
        },
        args: {
            navSize,
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
                    defaultValue: { summary: 'START' },
                    type: { summary: 'NavJustify' }
                }
            },
            theme: {
                name: 'Test / Theme',
                control: { type: 'select' },
                options: SIDEBAR_THEMES,
                table: {
                    defaultValue: { summary: 'NONE' },
                    type: { summary: 'SidebarTheme' }
                }
            },
            location: {
                name: 'Test / Location',
                control: { type: 'select' },
                options: SIDEBAR_LOCATIONS,
                table: {
                    defaultValue: { summary: 'RIGHT' },
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
