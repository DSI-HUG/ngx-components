import React from 'react';

interface IconParams {
    name: string;
}

const Icon: React.FC<IconParams> = params => {
    return <span className="material-symbols-outlined">{params.name}</span>;
};

export default Icon;
