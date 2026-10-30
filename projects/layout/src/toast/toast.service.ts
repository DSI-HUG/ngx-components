import { Injectable, signal } from '@angular/core';

export type ToastSeverity = 'info' | 'success' | 'warning' | 'error';

export class ToastAction {
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

abstract class BaseToast {
    public readonly title: string;
    public readonly body: string | undefined;
    public readonly action: ToastAction | undefined;
    public readonly uuid: string;

    public readonly abstract severity: ToastSeverity;

    public constructor(
        title: string,
        body?: string,
        action?: ToastAction
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

export class InfoToast extends BaseToast {
    public readonly severity = 'info';
    public readonly duration: number;

    public constructor(
        title: string,
        body?: string,
        action?: ToastAction,
        duration?: number
    ) {
        super(title, body, action);
        this.duration = duration || 3000;
    }
}

export class SuccessToast extends BaseToast {
    public readonly severity = 'success';
    public readonly duration: number;

    public constructor(
        title: string,
        body?: string,
        action?: ToastAction,
        duration?: number
    ) {
        super(title, body, action);
        this.duration = duration || 3000;
    }
}

export class WarnToast extends BaseToast {
    public readonly severity = 'warning';
}

export class ErrorToast extends BaseToast {
    public readonly severity = 'error';
}

export type Toast = InfoToast | SuccessToast | WarnToast | ErrorToast;

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    public readonly toasts = signal<readonly Toast[]>([]);

    public add(toast: Toast): void {
        this.toasts.update(toasts => [...toasts, toast]);
    }

    public remove(uuid: string): void {
        this.toasts.update(toasts => toasts.filter(toast => !toast.is(uuid)));
    }
}
