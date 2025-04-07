/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { compact } from 'lodash-es';

import { NavItemState, NavItemStyle, SidebarTheme } from '../../enums';

@Injectable()
export class NavButtonService {
    public getHostClass({
        id,
        disable,
        isSelected,
        style,
        state,
        theme
    }: {
        id: string;
        disable: boolean;
        isSelected: boolean;
        style: NavItemStyle;
        state?: NavItemState;
        theme?: SidebarTheme;
    }): string[] {
        return compact([
            'ngx-nav-button',
            id,
            this.stateClass(isSelected, disable, state),
            this.styleClass(style),
            this.themeClass(theme)
        ]);
    }

    private themeClass(theme?: SidebarTheme): string | undefined {
        switch (theme) {
            case SidebarTheme.DARK:
                return 'ngx-nav-button-dark-theme';
            case SidebarTheme.LIGHT:
                return 'ngx-nav-button-light-theme';
            case SidebarTheme.NONE:
            default:
                return undefined;
        }
    }

    private stateClass(isSelected: boolean, isDisable: boolean, state?: NavItemState): string {
        if (isDisable) {
            return 'ngx-nav-state-disabled';
        }
        if (isSelected) {
            return 'ngx-nav-state-selected';
        }
        return state ? `ngx-nav-state-${state}` : '';
    }

    private styleClass(style: NavItemStyle): string {
        return `ngx-nav-${style}-style`;
    }
}
