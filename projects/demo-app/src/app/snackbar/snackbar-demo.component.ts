import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MessageBoxComponent } from '@hug/ngx-message-box';
import { SnackbarComponent } from '@hug/ngx-snackbar';
import { defaultIfEmpty, filter, from, interval, map, Observable, scan } from 'rxjs';

class Message {
    public constructor(public content = 'Some snackbar', public gate = true) { }
}

@Component({
    selector: 'app-snackbar-demo',
    styleUrls: ['./snackbar-demo.component.scss'],
    templateUrl: './snackbar-demo.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        AsyncPipe,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatTabsModule,
        MessageBoxComponent,
        NgIf,
        NgFor,
        SnackbarComponent
    ]
})
export class SnackbarDemoComponent {
    public tabIndex = 1;

    /*
     The example below demonstrate how you can dynamically add snackbars using *ngFor structural directive.
     Here the Observable simulate items being push from the server
     */
    public messages$: Observable<Message[]>;

    public dangers$: Observable<Message[]>;
    public warnings$: Observable<Message[]>;
    public successes$: Observable<Message[]>;
    public infos$: Observable<Message[]>;

    public push = new EventEmitter<string>();

    public simpleGate = false;

    public constructor() {
        this.dangers$ = from(this.push).pipe(
            filter(type => type === 'danger'),
            map(() => new Message('Danger snackbar')),
            scan((acc, curr) => [...acc, curr], [] as Message[]),
            defaultIfEmpty([] as Message[]));

        this.warnings$ = from(this.push).pipe(
            filter(type => type === 'warning'),
            map(() => new Message('Warning snackbar')),
            scan((acc, curr) => [...acc, curr], [] as Message[]),
            defaultIfEmpty([] as Message[]));

        this.successes$ = from(this.push).pipe(
            filter(type => type === 'success'),
            map(() => new Message('Success snackbar')),
            scan((acc, curr) => [...acc, curr], [] as Message[]),
            defaultIfEmpty([] as Message[]));

        this.infos$ = from(this.push).pipe(
            filter(type => type === 'info'),
            map(() => new Message('Info snackbar')),
            scan((acc, curr) => [...acc, curr], [] as Message[]),
            defaultIfEmpty([] as Message[]));

        this.messages$ = interval(2000).pipe(
            map(() => new Message('Server push snackbar')),
            scan((acc, curr) => [...acc, curr], [] as Message[]),
            defaultIfEmpty([] as Message[]));
    }
}
