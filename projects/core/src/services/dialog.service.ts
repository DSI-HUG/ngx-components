import { Type } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable, ReplaySubject, switchMap, take, throttleTime } from 'rxjs';

import { NgxAbstractLazyModule, NgxLazyLoaderService } from './lazy-loader.service';

export abstract class NgxDialogService<ReturnType, DataType> {
    protected openDialogSub$ = new ReplaySubject<MatDialogConfig<DataType>>(1);
    protected dialogResponse$: Observable<ReturnType | undefined>;
    protected dialogRef!: MatDialogRef<unknown, ReturnType>;

    public constructor(
        private lazyLoaderService: NgxLazyLoaderService,
        private dialog: MatDialog,
        matDialogConfig?: MatDialogConfig<DataType>
    ) {
        this.dialogResponse$ = this.openDialogSub$.pipe(
            throttleTime(11),
            take(1),
            switchMap(dialogConfig => this.lazyLoaderService.loadModule$(this.getModule(), dialogConfig.injector).pipe(
                switchMap(moduleInfos => {
                    const config = { ...(matDialogConfig ?? {} as MatDialogConfig<DataType>), ...dialogConfig };
                    config.minWidth = config.minWidth || '400px';
                    config.injector = moduleInfos.injector;

                    this.dialogRef = this.dialog.open<unknown, DataType, ReturnType>(moduleInfos.module.componentType, config);

                    return this.dialogRef.afterClosed();
                })
            ))
        );
    }

    public openDialog$(dialogData?: DataType, dialogConfig?: MatDialogConfig<DataType>): Observable<ReturnType | undefined> {
        dialogConfig ??= {};
        dialogConfig.data = dialogData ?? {} as DataType;
        this.openDialogSub$.next(dialogConfig);
        return this.dialogResponse$;
    }

    public closeDialog(): void {
        this.dialogRef.close();
    }

    protected abstract getModule(): Promise<Type<NgxAbstractLazyModule<unknown>>>;
}
