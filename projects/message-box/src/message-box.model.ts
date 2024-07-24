export type NgxMessageBoxType = 'info' | 'primary' | 'success' | 'warn' | 'danger';

export interface NgxMessageBoxAction {
    text?: string;
    type?: NgxMessageBoxType;
    icon?: string;
    action: () => unknown;
}
