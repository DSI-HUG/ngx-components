export const sidenavContentTitleText = (title = 'Title'): string => `
    <h1>${title}</h1>
    Lorem ipsum dolor sit amet...`;

export const sidenavContentTitleTextTemplate = `
<!-- Content Template : Title & Text -->
<ng-template #contentTitleText>
    ${sidenavContentTitleText()}
</ng-template>`;
