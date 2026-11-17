import { effect, ElementRef, type Signal, signal } from '@angular/core';

export const resizeSignal = (
    element: () => ElementRef<HTMLElement> | undefined,
    box: ResizeObserverBoxOptions = 'border-box'
): Signal<ResizeObserverEntry | undefined> => {
    const value = signal<ResizeObserverEntry | undefined>(undefined);

    effect(onCleanup => {
        const el = element()?.nativeElement;
        if (!el) {
            return;
        }

        const initialValue: ResizeObserverEntry = {
            borderBoxSize: [],
            contentRect: new DOMRect(),
            contentBoxSize: [],
            devicePixelContentBoxSize: [],
            target: el
        };

        value.set(initialValue);

        const ro = new ResizeObserver(entries => {
            value.set(entries[0] || initialValue);
        });

        ro.observe(el, { box });
        onCleanup(() => ro.disconnect());
    });

    return value;
};
