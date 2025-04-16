import React from 'react';

export type Status = 'planned' | 'ready' | 'new';

export interface ComponentCardParams {
    img?: string;
    alt: string;
    name: string;
    status: Status;
    description: string;
    link?: string;
}

const imagesFolder = '/images/';
const emptyImage = `${imagesFolder}other/planned.png`;
const imageFolder = `${imagesFolder}components/`;
const pathDocs = '/?path=/docs/';

const ComponentCard: React.FC<ComponentCardParams> = params => {
    if (params.img) {
        params.img = `${imageFolder}${params.img}/${params.img}.png`;
        params.link = `${pathDocs}${params.link}`;
    } else {
        params.img = emptyImage;
    }

    const id = params.name.toLowerCase().replace(/ /g, '-');

    const cardContent = (
        <>
            <img src={params.img} alt={params.alt} className="card-image" />
            <div className="card-content">
                <div className="card-header">
                    <span className="card-title">{params.name}</span>
                    <div className={`chip ${params.status}`}>{params.status}</div>
                </div>
                <p className="card-description">{params.description}</p>
            </div>
        </>
    );
    return (
        <div className={`grid-item-card ${params.status}`} id={id}>
            {params.status === 'ready' || params.status === 'new' ? (
                <a href={params.link}>{cardContent}</a>
            ) : (
                cardContent
            )}
        </div>
    );
};

export default ComponentCard;
