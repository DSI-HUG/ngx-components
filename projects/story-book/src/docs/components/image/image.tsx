import React from 'react';

interface ImageParams {
    linkImage: string;
}

const Image: React.FC<ImageParams> = params => {
    return <img className="illustration-image" src={params.linkImage} />;
};

export default Image;
