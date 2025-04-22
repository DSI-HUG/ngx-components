import { times } from 'lodash-es';

export const sidenavContentScroll = `
<!-- Content Template : Title & Text -->
<ng-template #contentScroll>
    <h1>Scroll</h1>
    ${times(200)
        .map(() => 'Lorem ipsum dolor sit amet...')
        .join('\n')}
</ng-template>`;
