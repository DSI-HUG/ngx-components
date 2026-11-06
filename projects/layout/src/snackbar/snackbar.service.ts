import { Injectable, signal } from '@angular/core';

export type SnackbarSeverity = 'info' | 'success' | 'warning' | 'error';

export class SnackbarAction {
    public readonly name: string;
    public readonly execute: () => void;

    public constructor(
        name: string,
        action: () => void
    ) {
        this.name = name;
        this.execute = action;
    }
}

abstract class BaseSnackbar {
    public readonly title: string;
    public readonly body: string | undefined;
    public readonly action: SnackbarAction | undefined;
    public readonly uuid: string;

    public readonly abstract severity: SnackbarSeverity;

    public constructor(
        title: string,
        body?: string,
        action?: SnackbarAction
    ) {
        this.uuid = crypto.randomUUID();
        this.title = title;
        this.body = body;
        this.action = action;
    }

    public is(uuid: string): boolean {
        return this.uuid === uuid;
    }
}

export class InfoSnackbar extends BaseSnackbar {
    public readonly severity = 'info';
    public readonly duration: number;

    public constructor(
        title: string,
        body?: string,
        action?: SnackbarAction,
        duration?: number
    ) {
        super(title, body, action);
        this.duration = duration || 3000;
    }
}

export class SuccessSnackbar extends BaseSnackbar {
    public readonly severity = 'success';
    public readonly duration: number;

    public constructor(
        title: string,
        body?: string,
        action?: SnackbarAction,
        duration?: number
    ) {
        super(title, body, action);
        this.duration = duration || 3000;
    }
}

export class WarnSnackbar extends BaseSnackbar {
    public readonly severity = 'warning';
}

export class ErrorSnackbar extends BaseSnackbar {
    public readonly severity = 'error';
}

export type Snackbar = InfoSnackbar | SuccessSnackbar | WarnSnackbar | ErrorSnackbar;

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {
    public readonly snackbars = signal<readonly Snackbar[]>([]);

    public add(snackbar: Snackbar): void {
        this.snackbars.update(snackbars => [...snackbars, snackbar]);
    }

    public remove(uuid: string): void {
        this.snackbars.update(snackbars => snackbars.filter(snackbar => !snackbar.is(uuid)));
    }

    public reset(): void {
        this.snackbars.set([]);
    }
}
