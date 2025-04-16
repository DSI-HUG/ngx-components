type WindowSize = 'small' | 'medium' | 'large' | 'extra-large';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ResponsiveManager {
    private static readonly SMALL_BREAKPOINT = 600;
    private static readonly MEDIUM_BREAKPOINT = 1000;
    private static readonly LARGE_BREAKPOINT = 1800;

    public static listenWindowSize = (): void => {
        // First update
        ResponsiveManager.updateWindowWidthAttribute();
        // Update on every resize event
        addEventListener('resize', ResponsiveManager.updateWindowWidthAttribute);
    };

    /**
     * Add an attribute to the preview html element to share window-size accross the docs
     */
    private static updateWindowWidthAttribute(): void {
        const label = ResponsiveManager.getWindowSizeLabel(window.innerWidth);
        document.getElementsByTagName('html').item(0)?.setAttribute('window-width', label);
    }

    private static getWindowSizeLabel(width: number): WindowSize {
        if (width <= ResponsiveManager.SMALL_BREAKPOINT) {
            return 'small';
        }
        if (width <= ResponsiveManager.MEDIUM_BREAKPOINT) {
            return 'medium';
        }
        if (width <= ResponsiveManager.LARGE_BREAKPOINT) {
            return 'large';
        }
        return 'extra-large';
    }
}
