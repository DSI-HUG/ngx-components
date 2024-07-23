/**
 * Created by rtr on 22.12.2016.
 */
import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

import { SplitterDirection } from './splitter-direction-type';

/**
 * Directive representing a panel in a Splitter Component
 */
@Directive({
    selector: 'ngx-split-area',
    standalone: true
})
export class SplitAreaDirective {

    @HostBinding('style.order')
    public order?: number;

    @HostBinding('style.flex-basis.%')
    protected _size: number | null = null;

    public direction = 'horizontal' as SplitterDirection;

    /**
     * Size in percent of the current area
     */
    @Input()
    public set size(value: NumberInput) {
        this._size = coerceNumberProperty(value);
    }

    public get size(): number | undefined {
        const parentElement = this.elementRef.nativeElement.parentElement;
        const parentSizeInPixels = parentElement && (this.direction === 'horizontal' ? parentElement.offsetWidth : parentElement.offsetHeight) || undefined;
        return parentSizeInPixels && (100 * this.sizeinPixels / parentSizeInPixels);
    }

    public get sizeinPixels(): number {
        return this.direction === 'horizontal' ? this.elementRef.nativeElement.offsetWidth : this.elementRef.nativeElement.offsetHeight;
    }

    /**
     * Min size in percent of the current area
     */
    @Input()
    public set minSizePixel(value: NumberInput) {
        this._minSizePixel = coerceNumberProperty(value);
    }

    public get minSizePixel(): number {
        return this._minSizePixel;
    }

    @HostBinding('style.min-width.px')
    protected get minWidth(): number | undefined {
        return this.direction === 'vertical' ? undefined : this._minSizePixel;
    }

    @HostBinding('style.min-height.px')
    protected get minHeight(): number | undefined {
        return this.direction === 'horizontal' ? undefined : this._minSizePixel;
    }

    private _minSizePixel = 0;

    public constructor(private elementRef: ElementRef<HTMLElement>) { }
}
