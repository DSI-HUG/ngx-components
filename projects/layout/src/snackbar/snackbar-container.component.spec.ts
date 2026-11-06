import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorSnackbar, SnackbarService } from './snackbar.service';
import { NgxSnackbarContainerComponent } from './snackbar-container.component';

describe('NgxSnackbarContainerComponent', () => {
    let fixture: ComponentFixture<NgxSnackbarContainerComponent>;
    let service: SnackbarService;
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
            imports: [NgxSnackbarContainerComponent]
        }).compileComponents();
        service = TestBed.inject(SnackbarService);
        fixture = TestBed.createComponent(NgxSnackbarContainerComponent);
        const element: unknown = fixture.nativeElement;
        if (!(element instanceof HTMLElement)) {
            throw new Error('Expected the snackbar container to be an HTML element');
        }
        host = element;
    });

    it('preserves the bottom-aligned grid, scale and CSS transitions', async () => {
        service.add(new ErrorSnackbar('Older'));
        service.add(new ErrorSnackbar('Newer'));
        await renderSizes();

        const snackbars = host.querySelectorAll<HTMLElement>('ngx-snackbar');
        const olderStyle = getComputedStyle(snackbars[0]);
        const newerStyle = getComputedStyle(snackbars[1]);
        expect(getComputedStyle(host).display).toBe('grid');
        expect(olderStyle.alignSelf).toBe('end');
        expect(olderStyle.transformOrigin).toBe(`${snackbars[0].offsetWidth / 2}px ${snackbars[0].offsetHeight}px`);
        expect(olderStyle.transitionProperty).toBe('transform, opacity, visibility');
        expect(olderStyle.transitionDuration.split(',').every(duration => duration.trim() === '0.25s')).toBeTrue();
        expect(new DOMMatrix(olderStyle.transform).a).toBeCloseTo(0.95);
        expect(new DOMMatrix(newerStyle.transform).a).toBe(1);
    });

    it('expands variable-height snackbars with the original gap and extra hover slot', async () => {
        service.add(new ErrorSnackbar('Tall '.repeat(100)));
        service.add(new ErrorSnackbar('Medium '.repeat(20)));
        service.add(new ErrorSnackbar('Short'));
        await renderSizes();
        const snackbars = host.querySelectorAll<HTMLElement>('ngx-snackbar');
        snackbars[2].querySelectorAll<HTMLButtonElement>('button')[0].focus();
        await renderSizes();

        const rectangles = Array.from(snackbars, snackbar => snackbar.getBoundingClientRect());
        const gap = 12;
        expect(rectangles[0].height).toBeGreaterThan(rectangles[2].height);
        expect(rectangles[1].top - rectangles[0].bottom).toBeCloseTo(gap, 0);
        expect(rectangles[2].top - rectangles[1].bottom).toBeCloseTo(gap, 0);
        expect(host.getBoundingClientRect().height).toBeGreaterThan(
            rectangles.reduce((total, rect) => total + rect.height, 0) + Math.max(...rectangles.map(rect => rect.height))
        );
    });

    it('updates measured spacing after resizing and removing a snackbar', async () => {
        service.add(new ErrorSnackbar('Wrapping text '.repeat(30)));
        const middle = new ErrorSnackbar('Middle');
        service.add(middle);
        service.add(new ErrorSnackbar('Short'));
        await renderSizes();
        host.querySelectorAll<HTMLButtonElement>('button')[2].focus();
        await renderSizes();
        const firstHeight = host.querySelectorAll<HTMLElement>('ngx-snackbar')[0].offsetHeight;

        host.style.width = '180px';
        service.remove(middle.uuid);
        await renderSizes();

        const snackbars = host.querySelectorAll<HTMLElement>('ngx-snackbar');
        expect(snackbars[0].offsetHeight).toBeGreaterThan(firstHeight);
        expect(snackbars[1].getBoundingClientRect().top - snackbars[0].getBoundingClientRect().bottom).toBeCloseTo(12, 0);
    });
});
