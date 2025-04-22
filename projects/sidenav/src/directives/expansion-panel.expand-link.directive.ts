/* eslint-disable @typescript-eslint/member-ordering */
import { Directive, effect, ElementRef, inject, input, OnInit, Renderer2, signal } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';

import { RouterLinkService } from '../services';

@Directive({
    selector: 'mat-expansion-panel[expandLink]'
})
export class ExpansionPanelExpandLinkDirective implements OnInit {
    // # Injects
    private readonly expansionPanel = inject(MatExpansionPanel, { host: true, optional: true });
    private readonly element = inject(ElementRef);
    private readonly renderer = inject(Renderer2);
    private readonly routerLinkService = inject(RouterLinkService);
    // # Inputs
    public readonly expandLink = input.required<string | string[]>();
    public readonly activeClass = input<string>('active-link', { alias: 'expandLinkActive' });
    // # Signal
    public readonly onInit = signal(false);

    public constructor() {
        effect(() => {
            const isActive = this.routerLinkService.isActive(this.expandLink());
            if (this.routerLinkService.urlUpdated() || this.onInit()) {
                if (isActive) {
                    this.renderer.addClass(this.element.nativeElement, this.activeClass());
                    if (!this.expansionPanel?.expanded) {
                        this.expansionPanel?.open();
                    }
                } else {
                    this.renderer.removeClass(this.element.nativeElement, this.activeClass());
                }
            }
        });
    }

    public ngOnInit(): void {
        this.onInit.set(true);
    }
}
