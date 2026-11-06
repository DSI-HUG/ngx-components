import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorToast, ToastService } from './toast.service';
import { NgxToastContainerComponent } from './toast-container.component';

describe('NgxToastContainerComponent', () => {
    let fixture: ComponentFixture<NgxToastContainerComponent>;
    let service: ToastService;
    let host: HTMLElement;

    const renderSizes = async (): Promise<void> => {
        await [0, 1, 2, 3].reduce(async previous => {
            await previous;
            fixture.detectChanges();
            await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
        }, Promise.resolve());
        fixture.detectChanges();
        await new Promise(resolve => setTimeout(resolve, 300));
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NgxToastContainerComponent]
        }).compileComponents();
        service = TestBed.inject(ToastService);
        fixture = TestBed.createComponent(NgxToastContainerComponent);
        const element: unknown = fixture.nativeElement;
        if (!(element instanceof HTMLElement)) {
            throw new Error('Expected the toast container to be an HTML element');
        }
        host = element;
    });

    it('preserves the bottom-aligned grid, scale and CSS transitions', async () => {
        service.add(new ErrorToast('Older'));
        service.add(new ErrorToast('Newer'));
        await renderSizes();

        const toasts = host.querySelectorAll<HTMLElement>('ngx-toast');
        const olderStyle = getComputedStyle(toasts[0]);
        const newerStyle = getComputedStyle(toasts[1]);
        expect(getComputedStyle(host).display).toBe('grid');
        expect(olderStyle.alignSelf).toBe('end');
        expect(olderStyle.transformOrigin).toBe(`${toasts[0].offsetWidth / 2}px ${toasts[0].offsetHeight}px`);
        expect(olderStyle.transitionProperty).toBe('transform, opacity, visibility');
        expect(olderStyle.transitionDuration.split(',').every(duration => duration.trim() === '0.25s')).toBeTrue();
        expect(new DOMMatrix(olderStyle.transform).a).toBeCloseTo(0.95);
        expect(new DOMMatrix(newerStyle.transform).a).toBe(1);
    });

    it('expands variable-height toasts with the original gap and extra hover slot', async () => {
        service.add(new ErrorToast('Tall '.repeat(100)));
        service.add(new ErrorToast('Medium '.repeat(20)));
        service.add(new ErrorToast('Short'));
        await renderSizes();
        const toasts = host.querySelectorAll<HTMLElement>('ngx-toast');
        toasts[2].querySelectorAll<HTMLButtonElement>('button')[0].focus();
        await renderSizes();

        const rectangles = Array.from(toasts, toast => toast.getBoundingClientRect());
        const gap = 12;
        expect(rectangles[0].height).toBeGreaterThan(rectangles[2].height);
        expect(rectangles[1].top - rectangles[0].bottom).toBeCloseTo(gap, 0);
        expect(rectangles[2].top - rectangles[1].bottom).toBeCloseTo(gap, 0);
        expect(host.getBoundingClientRect().height).toBeGreaterThan(
            rectangles.reduce((total, rect) => total + rect.height, 0) + Math.max(...rectangles.map(rect => rect.height))
        );
    });

    it('updates measured spacing after resizing and removing a toast', async () => {
        service.add(new ErrorToast('Wrapping text '.repeat(30)));
        const middle = new ErrorToast('Middle');
        service.add(middle);
        service.add(new ErrorToast('Short'));
        await renderSizes();
        host.querySelectorAll<HTMLButtonElement>('button')[2].focus();
        await renderSizes();
        const firstHeight = host.querySelectorAll<HTMLElement>('ngx-toast')[0].offsetHeight;

        host.style.width = '180px';
        service.remove(middle.uuid);
        await renderSizes();

        const toasts = host.querySelectorAll<HTMLElement>('ngx-toast');
        expect(toasts[0].offsetHeight).toBeGreaterThan(firstHeight);
        expect(toasts[1].getBoundingClientRect().top - toasts[0].getBoundingClientRect().bottom).toBeCloseTo(12, 0);
    });
});
