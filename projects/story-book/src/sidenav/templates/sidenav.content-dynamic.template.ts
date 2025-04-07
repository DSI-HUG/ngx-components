import { filter } from 'lodash-es';

import { ContentType } from '../enums/content.type';
import { sidenavContentAccordion1 } from './sidenav.content.accordion.item1.template';
import { sidenavContentAccordion2 } from './sidenav.content.accordion.item2.template';
import { sidenavContentNavList1 } from './sidenav.content.nav-list.item3.template';
import { sidenavContentScroll } from './sidenav.content.scroll.template';
import { sidenavContentTitleText } from './sidenav.content.text.template';

const contentRecord: Record<ContentType, string> = {
    [ContentType.TITLE_TEXT]: sidenavContentTitleText,
    [ContentType.NAV_LIST_1]: sidenavContentNavList1,
    [ContentType.ACCORDION_1]: sidenavContentAccordion1,
    [ContentType.ACCORDION_2]: sidenavContentAccordion2,
    [ContentType.SCROLL]: sidenavContentScroll
};

export const getDynamicContent = (key: string): string =>
    `<ng-container [ngTemplateOutlet]="dynamicPanelContent" [ngTemplateOutletContext]="{key:${key}}"></ng-container>`;

export const getContentTemplates = (contentType?: ContentType[]): string => `
    <!-- ## Content Templates -->
    ${filter(contentRecord, (_, k) => !contentType || contentType?.includes(k as ContentType)).join('\n')}`;
export const getDynamicContentTemplates = (contentType?: ContentType[]): string => `
    <!-- ## Dynamic Panel Content -->
    <ng-template #dynamicPanelContent let-key="key">
        @switch (key) {
            @case (ContentType.TITLE_TEXT) {
                <ng-container [ngTemplateOutlet]="contentTitleText"></ng-container>
            }
            @case (ContentType.NAV_LIST_1) {
                <ng-container [ngTemplateOutlet]="contentNavList1"></ng-container>
            }
            @case (ContentType.ACCORDION_1) {
                <ng-container [ngTemplateOutlet]="contentAccordion1"></ng-container>
            }
            @case (ContentType.ACCORDION_2) {
                <ng-container [ngTemplateOutlet]="contentAccordion2"></ng-container>
            }
            @case (ContentType.SCROLL) {
                <ng-container [ngTemplateOutlet]="contentScroll"></ng-container>
            }
        }
    </ng-template>
    <!-- ## Content Templates -->
    ${getContentTemplates(contentType)}`;
