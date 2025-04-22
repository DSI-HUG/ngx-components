import { addons, types, useParameter } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';
import { AddonPanel } from '@storybook/components';
import React from 'react';
import { get } from 'lodash-es';
import { Markdown } from '@storybook/addon-docs';

const hugTheme = create({
    base: 'light',
    brandTitle: 'ngx-components - storybook',
    brandImage: 'logo.svg',
    brandTarget: '_self'
});

addons.setConfig({
    theme: hugTheme
});

addons.register('my/story-description', () => {
    console.log('[Storybook] Description addon loaded ✅');
    addons.add('my/story-description/panel', {
        type: types.PANEL,
        title: 'Description',
        // @ts-ignore
        render: ({ active, key }) => {
            const description = get(useParameter('docs', {}), 'description.story');

            return (
                <AddonPanel active={active ?? true} key={key}>
                    <div style={{ padding: '10px' }}>
                        {description ? <Markdown>{description}</Markdown> : <em>No description found.</em>}
                    </div>
                </AddonPanel>
            );
        }
    });
});
