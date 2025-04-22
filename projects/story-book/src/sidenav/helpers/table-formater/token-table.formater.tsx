import React from 'react';

export interface TokenTableData {
    name: string;
    description: string;
    defaultValue: string;
}

export const tokenTableFormater: React.FC<{ data: TokenTableData }> = ({ data }) => {
    return (
        <>
            <tr>
                <td>
                    <strong>{data.name}</strong>
                </td>
                <td>{data.description}</td>
                <td>
                    <code>{data.defaultValue}</code>
                </td>
            </tr>
        </>
    );
};
