import React, { ReactNode } from 'react';

export type GridDensity = 'small' | 'medium' | 'large';
export type GridType = 'components' | 'recommendations' | 'link-components';

export interface CardsGridParams {
    density?: GridDensity;
    children: ReactNode;
    type: GridType;
}

const CardsGrid: React.FC<CardsGridParams> = params => {
    return (
        <>
            {params.type === 'recommendations' || params.type === 'components' ? (
                <div className={`cards-grid ${params.density ?? 'medium'}-density responsive`}>{params.children}</div>
            ) : (
                <div className={`cards-grid ${params.density ?? 'medium'}-density`}>{params.children}</div>
            )}
        </>
    );
};

export default CardsGrid;
