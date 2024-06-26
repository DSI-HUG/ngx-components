export type MessageBoxDialogResponse = 'ok' | 'cancel' | 'ignore' | 'retry' | 'yes' | 'no' | 'continue';

export enum MessageBoxDialogButtons {
    OK = 0x1,
    CANCEL = 0x2,
    IGNORE = 0x4,
    RETRY = 0x8,
    YES = 0x10,
    NO = 0x20,
    CONTINUE = 0x40
}

export interface MessageBoxDialogData {
    title: string;
    text: string;
    buttons?: MessageBoxDialogButtons;
}
