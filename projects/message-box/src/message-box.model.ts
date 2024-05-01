export type MessageBoxType = 'info' | 'primary' | 'success' | 'warn' | 'danger';

export interface MessageBoxAction {
    text?: string;
    type?: MessageBoxType;
    icon?: string;
    action: () => unknown;
}
