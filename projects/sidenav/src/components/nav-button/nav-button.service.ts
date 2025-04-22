/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { compact } from 'lodash-es';

import { NavButtonState, SidebarTheme } from '../../enums';

@Injectable()
export class NavButtonService {
    public getHostClass({
        id,
        disable,
        isSelected,
        state,
        theme
    }: {
        id: string;
        disable: boolean;
        isSelected: boolean;
        state?: NavButtonState;
        theme?: SidebarTheme;
    }): string[] {
        return compact([
            'ngx-nav-button',
            id,
            this.stateClass(isSelected, disable, state),
            this.themeClass(theme)
        ]);
    }

    private themeClass(theme?: SidebarTheme): string | undefined {
        switch (theme) {
            case 'dark':
                return 'ngx-nav-button-dark-theme';
            case 'light':
                return 'ngx-nav-button-light-theme';
            case 'none':
            default:
                return undefined;
        }
    }

    private stateClass(isSelected: boolean, isDisable: boolean, state?: NavButtonState): string {
        if (isDisable) {
            return 'ngx-nav-state-disabled';
        }
        if (isSelected) {
            return 'ngx-nav-state-selected';
        }
        return state ? `ngx-nav-state-${state}` : '';
    }
}
