/* eslint-disable @typescript-eslint/member-ordering, @typescript-eslint/naming-convention */
import { Injectable, signal } from '@angular/core';
import { get, omit, omitBy } from 'lodash-es';

import { OpenableComponent } from '../components';


@Injectable()
export class PanelRegistry {
    /** register of Groups currently open */
    public readonly refs = signal<Record<string, OpenableComponent>>({});

    public get(key: string): OpenableComponent | undefined {
        return get(this.refs(), key);
    }

    public register(key: string, ref: OpenableComponent): void {
        this.refs.update(v => ({ ...v, [key]: ref }));
    }

    public unregister(param: string | OpenableComponent): void {
        if (param instanceof OpenableComponent) {
            this.refs.update(v => omitBy(v, r => r === param));
        } else {
            this.refs.update(v => omit(v, ['key']));
        }
    }
}
