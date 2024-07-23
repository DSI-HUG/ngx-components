import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxMessageBoxComponent } from '@hug/ngx-message-box';
import { NgxSnackbarComponent } from '@hug/ngx-snackbar';
import { NgxStatusService, StatusType } from '@hug/ngx-status';
import { defaultIfEmpty, filter, from, interval, map, Observable, scan, shareReplay } from 'rxjs';

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
        MatToolbarModule,
        NgxMessageBoxComponent,
        NgIf,
        NgFor,
        NgxSnackbarComponent
    ]
})
export class SnackbarDemoComponent {
    protected tabIndex = 1;
    /*
     The example below demonstrate how you can dynamically add snackbars using *ngFor structural directive.
     Here the Observable simulate items being push from the server
     */
    protected messages$: Observable<Message[]>;

    protected dangers$: Observable<Message[]>;
    protected warnings$: Observable<Message[]>;
    protected successes$: Observable<Message[]>;
    protected infos$: Observable<Message[]>;

    protected push = new EventEmitter<string>();

    protected simpleGate = false;

    private statusService = inject(NgxStatusService);

    public constructor() {
        this.dangers$ = from(this.push).pipe(
            filter(type => type === 'danger'),
            map(() => new Message('Danger snackbar')),
            scan((acc, curr) => [...acc, curr], [] as Message[]),
            defaultIfEmpty([] as Message[]),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        this.warnings$ = from(this.push).pipe(
            filter(type => type === 'warning'),
            map(() => new Message('Warning snackbar')),
            scan((acc, curr) => [...acc, curr], [] as Message[]),
            defaultIfEmpty([] as Message[]),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        this.successes$ = from(this.push).pipe(
            filter(type => type === 'success'),
            map(() => new Message('Success snackbar')),
            scan((acc, curr) => [...acc, curr], [] as Message[]),
            defaultIfEmpty([] as Message[]),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        this.infos$ = from(this.push).pipe(
            filter(type => type === 'info'),
            map(() => new Message('Info snackbar')),
            scan((acc, curr) => [...acc, curr], [] as Message[]),
            defaultIfEmpty([] as Message[]),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        this.messages$ = interval(2000).pipe(
            map(() => new Message('Server push snackbar')),
            scan((acc, curr) => [...acc, curr], [] as Message[]),
            defaultIfEmpty([] as Message[]),
            shareReplay({ bufferSize: 1, refCount: false })
        );
    }

    protected showStatus(statusType: StatusType): void {
        const status = {
            type: statusType,
            title: 'Title',
            text: 'This is a status message, click on the info icon for more.',
            technicalText: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, lacus nec imperdiet pretium, purus nisi hendrerit velit, non laoreet est velit sit amet arcu. Cras eget malesuada tortor. Aliquam vitae libero tellus. Quisque at velit sed arcu feugiat imperdiet ut quis augue. Cras laoreet eleifend tellus varius laoreet. Vestibulum vulputate sagittis sapien, eget euismod metus. Sed ut lacus at risus tristique blandit. Cras at nibh augue. Nam felis felis, facilisis sed fringilla a, porta id magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc eget velit a enim pharetra volutpat quis eget lacus. Donec imperdiet magna metus, auctor pretium nibh dictum eu. Sed pharetra tristique sodales. Nam dapibus porta imperdiet. Pellentesque elementum
                tristique molestie. Sed at dolor et mauris vehicula vestibulum. Maecenas cursus vulputate convallis. Quisque eu imperdiet nunc. Nunc ut feugiat eros. Integer aliquam nibh nec est sollicitudin dictum at et diam. Aliquam neque magna, condimentum non dolor in, faucibus malesuada mauris. Sed dictum massa neque, quis venenatis justo consequat sed. Fusce imperdiet purus nec neque vestibulum, vel placerat enim porta. Duis turpis purus, suscipit vitae scelerisque sed, sollicitudin a sem. Nullam orci risus, suscipit non mollis non, semper sit amet enim. In vel eros justo. Etiam gravida dolor vitae commodo tincidunt. Ut consequat id odio ac scelerisque. Phasellus fringilla et nisi at convallis. Nunc efficitur est in luctus interdum. Curabitur risus turpis, gravida in ex
                id, elementum convallis augue. Duis laoreet condimentum purus, sit amet vulputate dolor finibus ac. Proin consectetur ullamcorper orci ut ullamcorper. Vivamus ornare leo vel urna molestie porta. Vivamus malesuada velit eros, non rutrum urna elementum ut. Pellentesque sed lorem tempor, consectetur sem in, condimentum justo. Vivamus eu nunc interdum, mattis turpis nec, accumsan neque. Integer convallis porttitor turpis feugiat placerat. Nulla sodales ex in neque lobortis, vel mollis turpis interdum. Mauris pharetra ex a justo maximus, at semper metus feugiat. Nullam aliquet tortor nec tortor auctor venenatis. Proin id laoreet eros, id sodales mi. Vestibulum mollis orci nec orci posuere dapibus. Integer placerat, nisl id aliquam interdum, diam est vestibulum purus,
                non venenatis turpis lacus in felis. Vestibulum pulvinar velit tortor, ut convallis turpis condimentum ut. Nunc auctor hendrerit augue, sed malesuada quam. Etiam varius interdum risus, eget gravida libero convallis sed. Aliquam tempor orci at ex ullamcorper mollis. Fusce imperdiet ut ex in gravida. Curabitur iaculis non diam vel consequat. Praesent a magna posuere, feugiat mauris nec, sollicitudin ligula. Sed faucibus viverra velit eget porttitor. Suspendisse a sem gravida, tincidunt lacus vitae, lobortis ante. Nulla nisl quam, ultrices non nunc eget, commodo luctus metus. Curabitur nulla erat, gravida in nulla vel, commodo vestibulum ligula. Quisque quis lectus vel urna luctus gravida eget id risus.
            `
        };
        this.statusService.showStatus(status);
    }
}
