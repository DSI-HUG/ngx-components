import React from 'react';

type Status = 'do' | 'dont' | 'caution';

export interface RecommendationParams {
    img: string;
    alt: string;
    status: Status;
    description: string;
}

const Recommendation: React.FC<RecommendationParams> = params => {
    const statusToSvg: Record<string, string> = {
        do: 'verified',
        dont: 'dangerous',
        caution: 'warning'
    };

    return (
        <div className="recommendation-card">
            <img src={params.img} alt={params.alt} className="card-image" />
            <div className={`card-content ${params.status}`}>
                <span className={`material-symbols-outlined`}>{statusToSvg[params.status]}</span>
                <p className="card-justification">{params.description}</p>
            </div>
        </div>
    );
};

export default Recommendation;
