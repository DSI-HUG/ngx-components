import { get } from 'lodash-es';

type SidenavContentOrientation = 'horizontal' | 'vertical';

interface SidenavContentParams {
    contentTitle?: Parameters<typeof sidenavContent>[0];
    value: Parameters<typeof sidenavContent>[1];
}

interface SidenavSubpartParams {
    subpartTitle: Parameters<typeof sidenavSubpart>[0];
    content: Parameters<typeof sidenavSubpart>[1];
}

export const sidenavContent = (contentTitle: string | undefined, content: string): string => `
    <div>
        ${contentTitle ? `<div class="sidenav-title">${contentTitle}</div>` : ''}
        ${content}
    </div>`;

export const sidenavSubpart = (
    subpartTitle: string,
    content: string | SidenavContentParams[],
    _type: SidenavContentOrientation = 'vertical'
): string => `
    <div>
        <div class="subpart-title">${subpartTitle}</div>
        <div class="content-list sidenav">
            ${
                typeof content === 'string'
                    ? content
                    : content.map(({ contentTitle, value }) => sidenavContent(contentTitle, value)).join('\n')
            }
        </div>
    </div>`;
export const sidenavPart = (
    partTitle: string,
    param: string | (SidenavSubpartParams | SidenavContentParams)[],
    type: SidenavContentOrientation = 'vertical'
): string => {
    if (typeof param === 'string' || get(param, '[0].content') !== undefined) {
        // With Subpart
        return `
    <!-- ${partTitle} Part -->
    <div class="flex flex-column">
        <div class="part-title">${partTitle}</div>
        <div class="subpart-list">
        ${((): string => {
            if (typeof param === 'string') {
                return param;
            } else {
                return (param as SidenavSubpartParams[])
                    .map(({ subpartTitle, content }) => sidenavSubpart(subpartTitle, content, type))
                    .join('\n');
            }
        })()}
        </div>
    </div>`;
    } else {
        // Without Subpart
        return `
    <!-- ${partTitle} Part -->
    <div class="flex flex-column">
        <div class="part-title">${partTitle}</div>
        <div class="content-list sidenav">
        ${(param as SidenavContentParams[])
            .map(({ contentTitle, value }) => sidenavContent(contentTitle, value))
            .join('\n')}
        </div>
    </div>`;
    }
};

export const sidenavParts = (
    param:
        | string
        | {
            partTitle: Parameters<typeof sidenavPart>[0];
            subpart?: Parameters<typeof sidenavPart>[1];
            content?: Parameters<typeof sidenavPart>[1];
        }[],
    type: SidenavContentOrientation = 'vertical'
): string => `
    <div class="parts direction-${type}">
        ${
            typeof param === 'string'
                ? param
                : param
                    .map(({ partTitle, subpart, content }) =>
                        subpart ? sidenavPart(partTitle, subpart, type) : sidenavPart(partTitle, content!, type)
                    )
                    .join('\n')
        }
    </div>`;
