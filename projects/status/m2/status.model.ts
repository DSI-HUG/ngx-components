export type NgxStatusType = 'info' | 'primary' | 'success' | 'warn' | 'danger';

export interface NgxStatusAction {
    label: string;
    terminal?: boolean;
    className?: string;
    callback: () => void;
}

export interface NgxStatus {
    title?: string;
    subtitle?: string;
    type?: NgxStatusType;
    text?: string;
    technicalText?: string;
    date?: Date;
    originalError?: unknown;
    duration?: number;
    className?: string;
    actions?: readonly NgxStatusAction[];
}
