import { TemplateRef } from '@angular/core';

import { OpenableComponent } from '../components';

export interface GroupInfo<T extends OpenableComponent = OpenableComponent> {
    groupId?: number; // If defined, groupId is proprietary and should be the only value used
    panel: T; // panel and content together form the secondary identifier
    content?: TemplateRef<unknown>; // Use content ?? '' when testing for the identifier
}
