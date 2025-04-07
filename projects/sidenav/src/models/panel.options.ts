export class PanelOptions {
    public isHover = false;
    public isFirstOpen = true;

    public constructor({ isHover }: { isHover: boolean }) {
        this.isHover = isHover;
    }
}
