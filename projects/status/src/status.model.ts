export type StatusType = 'info' | 'primary' | 'success' | 'warn' | 'danger';

export interface StatusAction {
    label: string;
    terminal?: boolean;
    callback: () => void;
}

export interface Status {
    title?: string;
    type?: StatusType;
    text?: string;
    technicalText?: string;
    date?: Date;
    originalError?: unknown;
    duration?: number;
    actions?: readonly StatusAction[];
}
