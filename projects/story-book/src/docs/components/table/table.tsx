import React from 'react';
import { map } from 'lodash-es';

export type GridDensity = 'small' | 'medium' | 'large';
export type GridType = 'components' | 'recommendations' | 'link-components';

export interface CardsGridParams {
    header?: Record<string, string>;
    body?: Record<string, string>[];
    format?: React.FC<{ data: unknown }>;
}

const Table: React.FC<CardsGridParams> = params => {
    let header = params.header ? (
        <thead>
        <tr>
            {map(params.header, title => (
                <th>{title}</th>
            ))}
        </tr>
        </thead>
    ) : null;
    return (
        <>
            <table className="md-table docblock-argstable sb-unstyled css-v2ifgj">
                {header}
                <tbody>
                {map(params.body, line =>
                    params.format ? (
                        <params.format data={line} />
                    ) : (
                        <tr>
                            {map(line, value => (
                                <td>{value}</td>
                            ))}
                        </tr>
                    )
                )}
                </tbody>
            </table>
        </>
    );
};

export default Table;
