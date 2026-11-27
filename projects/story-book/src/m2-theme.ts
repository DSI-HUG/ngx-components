import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { applicationConfig, componentWrapperDecorator } from '@storybook/angular';

@Injectable()
class M2OverlayContainer extends OverlayContainer {
    private themeWrapper?: HTMLElement;

    public override getContainerElement(): HTMLElement {
        const container = super.getContainerElement();
        if (!this.themeWrapper) {
            this.themeWrapper = container.ownerDocument.createElement('div');
            this.themeWrapper.classList.add('storybook-m2');
            container.ownerDocument.body.appendChild(this.themeWrapper);
            this.themeWrapper.appendChild(container);
        }
        return container;
    }

    public override ngOnDestroy(): void {
        super.ngOnDestroy();
        this.themeWrapper?.remove();
    }
}

export const m2Decorators = [
    applicationConfig({
        providers: [{ provide: OverlayContainer, useClass: M2OverlayContainer }],
    }),
    componentWrapperDecorator(story => `<div class="storybook-m2">${story}</div>`),
];
