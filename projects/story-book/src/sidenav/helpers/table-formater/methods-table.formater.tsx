import React from 'react';
import { Source } from '@storybook/addon-docs';

export interface TokenTableData {
    name: string;
    description: string;
    defaultValue: string;
}

export const methodsTableFormater: React.FC<{ data: TokenTableData }> = ({ data }) => {
    return (
        <>
            <tr>
                <td>
                    <Source language="typescript" code={data.name} />
                </td>
                <td>{data.description}</td>
            </tr>
        </>
    );
};
