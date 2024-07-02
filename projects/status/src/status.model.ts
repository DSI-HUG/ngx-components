export type StatusType = 'info' | 'primary' | 'success' | 'warn' | 'danger';

export interface StatusAction {
    label: string;
    terminal?: boolean;
    className?: string;
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
    className?: string;
    actions?: readonly StatusAction[];
}
