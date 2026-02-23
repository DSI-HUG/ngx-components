import { ConnectionPositionPair, OriginConnectionPosition, OverlayConnectionPosition } from '@angular/cdk/overlay';

export class NgxOverlayConnectionPositionPair extends ConnectionPositionPair {
    public static parse(value: string): ConnectionPositionPair[] {
        const values = value.trim().split(',');
        const positions = new Array<ConnectionPositionPair>();
        values.forEach(pos => {
            const poss = pos.trim().split(' ');
            if (poss.length !== 4) {
                throw new Error('Invalid positions property for MenuComponent. String entry must be of type \'positions="start top end bottom"\'');
            }

            const originPosition = {
                originX: poss[0],
                originY: poss[1]
            } as OriginConnectionPosition;

            const overlayPosition = {
                overlayX: poss[2],
                overlayY: poss[3]
            } as OverlayConnectionPosition;

            positions.push(new NgxOverlayConnectionPositionPair(originPosition, overlayPosition));
        });

        return positions;
    }
}

export const defaultConnectionPositionPair: ConnectionPositionPair[] = NgxOverlayConnectionPositionPair.parse('start bottom start top,start top start bottom,end bottom end top,end top end bottom');
