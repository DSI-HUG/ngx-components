import components from '../../../data/components-list.json';
import React, { useState } from 'react';
import ComponentCard, { ComponentCardParams, Status } from '../../cards/component-card/component-card';
import { CardsGrid } from '../../components';
import { GridDensity, GridType } from '../cards-grid/cards-grid';

type ComponentsGridType = 'all-components';

export interface ComponentsGridParams {
    componentsList?: string;
    type?: ComponentsGridType;
}

const ComponentsGrid: React.FC<ComponentsGridParams> = params => {
    let [
        componentsData
    ] = useState<ComponentCardParams[]>(components as ComponentCardParams[]);
    let density: GridDensity = 'large';
    let type: GridType = 'components';

    if (params.componentsList) {
        const components = params.componentsList?.toLowerCase().split(', ');
        componentsData = componentsData.filter(obj => components.includes(obj.name.toLowerCase()));
        density = 'medium';
        type = 'link-components';
    }

    const componentsGrid = (
        <CardsGrid density={density} type={type}>
            {componentsData
                .sort((c1, c2) => c1.name.localeCompare(c2.name))
                .map(component => (
                    <ComponentCard
                        img={component.img}
                        alt={component.alt}
                        name={component.name}
                        status={component.status as Status}
                        description={component.description}
                        link={component.link}
                    />
                ))}
        </CardsGrid>
    );

    return (
        <>
            {params.type === 'all-components' ? (
                componentsGrid
            ) : (
                <div className="section-link-components">{componentsGrid}</div>
            )}
        </>
    );
};

export default ComponentsGrid;
