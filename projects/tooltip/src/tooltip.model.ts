import { MatDialogConfig } from '@angular/material/dialog';

export class TooltipConfig<D> extends MatDialogConfig<D> {
    public hideDelay?: number;
}
