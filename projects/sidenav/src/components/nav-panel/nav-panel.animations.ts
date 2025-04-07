import { animate, group, keyframes, query, state, style, transition, trigger } from '@angular/animations';

export const navPanelAnimations = [
    trigger('panelOpen', [
        state('hidden', style({ minWidth: 0, width: 0, display: 'none' })),
        state('hidden-end', style({ minWidth: 0, width: 0, display: 'none' })),
        state('visible', style({ minWidth: '*', width: '*', display: '*' })),
        state('visible-end', style({ minWidth: '*', width: '*', display: '*' })),
        transition('hidden => visible', [
            group([
                query('.ngx-nav-panel-content', [
                    animate(
                        '600ms ease-out',
                        keyframes([
                            style({ offset: 0.0, opacity: 0 }),
                            style({ offset: 0.8, opacity: 0 }),
                            style({ offset: 1.0, opacity: 1 })
                        ])
                    )
                ]),
                query('.ngx-nav-panel-container', [
                    animate(
                        '300ms ease-out',
                        keyframes([
                            style({ offset: 0, width: 0, minWidth: 0 }),
                            style({ offset: 1, width: '*', minWidth: '*' })
                        ])
                    )
                ]),
                animate(
                    '300ms ease-out',
                    keyframes([
                        style({ offset: 0, width: 0, minWidth: 0, display: '*' }),
                        style({ offset: 1, width: '*', minWidth: '*', display: '*' })
                    ])
                )
            ])
        ]),
        transition('visible => hidden', [
            group([
                query('.ngx-nav-panel-content', [
                    animate(
                        '200ms ease-in',
                        keyframes([
                            style({ offset: 0.0, opacity: 1 }),
                            style({ offset: 0.5, opacity: 0 }),
                            style({ offset: 1.0, opacity: 0 })
                        ])
                    )
                ]),
                query('.ngx-nav-panel-container', [
                    animate(
                        '200ms ease-in',
                        keyframes([
                            style({ offset: 0, width: '*', minWidth: '*' }),
                            style({ offset: 1, width: 0, minWidth: 0 })
                        ])
                    )
                ]),
                animate(
                    '200ms ease-in',
                    keyframes([
                        style({ offset: 0, width: '*', minWidth: '*', display: '*' }),
                        style({ offset: 1, width: 0, minWidth: 0, display: '*' })
                    ])
                )
            ])
        ])
    ])
];
