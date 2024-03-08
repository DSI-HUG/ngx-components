import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'deja-example',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    template: '<p>example works!</p>',
    styles: []
})
export class ExampleComponent { }
