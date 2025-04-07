import { NavJustify, NavSize, SidebarLocation, SidebarTheme, SidenavComponent } from '@hug/ngx-sidenav';
import { StoryObj } from '@storybook/angular';
import { pick } from 'lodash-es';

import { ContentType } from '../enums/content.type';

export type NgxSidenavComponentType = SidenavComponent & {
    content: ContentType;
    navSize: NavSize;
    navJustify: NavJustify;
};

export const sidenavArgs: StoryObj<NgxSidenavComponentType> = {
    argTypes: {
        location: {
            control: { type: 'select' },
            options: Object.values(SidebarLocation),
            table: {
                defaultValue: { summary: 'RIGHT' },
                type: { summary: 'SidebarLocation' }
            }
        },
        theme: {
            control: { type: 'select' },
            options: Object.values(SidebarTheme),
            table: {
                defaultValue: { summary: 'NONE' },
                type: { summary: 'SidebarTheme' }
            }
        },
        disabled: {
            table: {
                defaultValue: { summary: 'false' }
            }
        }
    },
    args: {
        location: SidebarLocation.LEFT,
        theme: SidebarTheme.DARK,
        disabled: false
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
    navSize: NavSize.M
}): StoryObj<NgxSidenavComponentType> => {
    navSize = navSize ?? NavSize.M;
    const args = {
        argTypes: {
            navSize: {
                name: 'Size',
                control: { type: 'select' },
                options: Object.values(NavSize),
                table: {
                    defaultValue: { summary: 'M' },
                    type: { summary: 'NavSize' }
                }
            },
            theme: {
                name: 'Test / Theme',
                control: { type: 'select' },
                options: Object.values(SidebarTheme),
                table: {
                    defaultValue: { summary: 'NONE' },
                    type: { summary: 'SidebarTheme' }
                }
            },
            location: {
                name: 'Test / Location',
                control: { type: 'select' },
                options: Object.values(SidebarLocation),
                table: {
                    defaultValue: { summary: 'RIGHT' },
                    type: { summary: 'SidebarLocation' }
                }
            }
        },
        args: {
            navSize,
            location: SidebarLocation.LEFT,
            theme: SidebarTheme.DARK
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
    navJustify: NavJustify.START
}): StoryObj<NgxSidenavComponentType> => {
    navJustify = navJustify ?? NavJustify.START;
    const args = {
        argTypes: {
            navJustify: {
                name: 'Justify',
                control: { type: 'select' },
                options: Object.values(NavJustify),
                table: {
                    defaultValue: { summary: 'START' },
                    type: { summary: 'NavJustify' }
                }
            },
            theme: {
                name: 'Test / Theme',
                control: { type: 'select' },
                options: Object.values(SidebarTheme),
                table: {
                    defaultValue: { summary: 'NONE' },
                    type: { summary: 'SidebarTheme' }
                }
            },
            location: {
                name: 'Test / Location',
                control: { type: 'select' },
                options: Object.values(SidebarLocation),
                table: {
                    defaultValue: { summary: 'RIGHT' },
                    type: { summary: 'SidebarLocation' }
                }
            }
        },
        args: {
            navJustify,
            location: SidebarLocation.LEFT,
            theme: SidebarTheme.DARK
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
