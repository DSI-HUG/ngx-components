/* eslint-disable @typescript-eslint/member-ordering, @angular-eslint/prefer-on-push-component-change-detection */
import { NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef, viewChild } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { filter } from 'lodash-es';

import { sidenavContentAccordion1Template } from './templates/sidenav.content.accordion.item1.template';
import { sidenavContentAccordion2 } from './templates/sidenav.content.accordion.item2.template';
import { sidenavContentNavList1 } from './templates/sidenav.content.nav-list.item3.template';
import { sidenavContentScroll } from './templates/sidenav.content.scroll.template';
import { sidenavContentTitleTextTemplate } from './templates/sidenav.content.text.template';

export enum ContentType {
    TITLE_TEXT = 'Titre & text',
    ACCORDION_1 = 'Accordion 1',
    ACCORDION_2 = 'Accordion 2',
    NAV_LIST_1 = 'NavList 1',
    SCROLL = 'Scroll'
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const NAV_ACTION_CONTENT = [
    ContentType.TITLE_TEXT,
    ContentType.NAV_LIST_1,
    ContentType.ACCORDION_1,
    ContentType.ACCORDION_2,
    ContentType.SCROLL
] as const;
export type NavActionContent = typeof NAV_ACTION_CONTENT[number];


const contentRecord: Record<ContentType, string> = {
    [ContentType.TITLE_TEXT]: sidenavContentTitleTextTemplate,
    [ContentType.NAV_LIST_1]: sidenavContentNavList1,
    [ContentType.ACCORDION_1]: sidenavContentAccordion1Template,
    [ContentType.ACCORDION_2]: sidenavContentAccordion2,
    [ContentType.SCROLL]: sidenavContentScroll
};

const getContentTemplates = (contentType?: ContentType[]): string => `
    <!-- ## Content Templates -->
    ${filter(contentRecord, (_, k) => !contentType || contentType?.includes(k as ContentType)).join('\n')}`;


@Component({
    selector: 'content-templates',
    imports: [
        MatExpansionModule,
        MatListModule,
        MatIconModule,
        RouterModule,
        NgTemplateOutlet
    ],
    // eslint-disable-next-line @angular-eslint/component-max-inline-declarations
    template: `
        <ng-template #dynamicPanelContent let-key="key">
            @switch (key) {
                @case (ContentType.TITLE_TEXT) {
                    <ng-container [ngTemplateOutlet]="this.contentTitleText() ?? null"></ng-container>
                }
                @case (ContentType.NAV_LIST_1) {
                    <ng-container [ngTemplateOutlet]="this.contentNavList1() ?? null"></ng-container>
                }
                @case (ContentType.ACCORDION_1) {
                    <ng-container [ngTemplateOutlet]="this.contentAccordion1() ?? null"></ng-container>
                }
                @case (ContentType.ACCORDION_2) {
                    <ng-container [ngTemplateOutlet]="this.contentAccordion2() ?? null"></ng-container>
                }
                @case (ContentType.SCROLL) {
                    <ng-container [ngTemplateOutlet]="this.contentScroll() ?? null"></ng-container>
                }
            }
        </ng-template>
        ${getContentTemplates()}`
})
export class ContentTemplatesComponent {
    public dynamicPanelContent = viewChild<TemplateRef<HTMLElement>>('dynamicPanelContent');
    public contentTitleText = viewChild<TemplateRef<HTMLElement>>('contentTitleText');
    public contentNavList1 = viewChild<TemplateRef<HTMLElement>>('contentNavList1');
    public contentAccordion1 = viewChild<TemplateRef<HTMLElement>>('contentAccordion1');
    public contentAccordion2 = viewChild<TemplateRef<HTMLElement>>('contentAccordion2');
    public contentScroll = viewChild<TemplateRef<HTMLElement>>('contentScroll');
    // eslint-disable-next-line @typescript-eslint/naming-convention
    protected readonly ContentType = ContentType;

    public getRef(key: ContentType): TemplateRef<HTMLElement> | null {
        return ((): TemplateRef<HTMLElement> | undefined => {
            switch (key) {
                case ContentType.NAV_LIST_1:
                    return this.contentNavList1();
                case ContentType.ACCORDION_1:
                    return this.contentAccordion1();
                case ContentType.ACCORDION_2:
                    return this.contentAccordion2();
                case ContentType.SCROLL:
                    return this.contentScroll();
                case ContentType.TITLE_TEXT:
                    return this.contentTitleText();
                default:
                    return undefined;
            }
        })() ?? null;
    }
}
