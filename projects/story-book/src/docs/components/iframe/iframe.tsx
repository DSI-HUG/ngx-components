import React, { useEffect, useState } from 'react';

interface ImageParams {
    widthIframe: string;
    heightIframe: string;
    srcIframe: string;
}

const Iframe: React.FC<ImageParams> = params => {
    let [
        srcLightDark,
        setSrcLightDark
    ] = useState<string>();

    const updateSrcLightDark = () => {
        const htmlElement = document.documentElement;
        if (htmlElement.className.includes('dark')) {
            setSrcLightDark(params.srcIframe + 'theme%3Adark');
        } else {
            setSrcLightDark(params.srcIframe);
        }
    };

    useEffect(() => {
        updateSrcLightDark();
        const classLightOrDark = new MutationObserver(() => updateSrcLightDark());

        classLightOrDark.observe(document.documentElement, {
            attributes: true,
            attributeFilter: [
                'class'
            ]
        });

        return () => classLightOrDark.disconnect();
    }, []);

    console.error('srcLightDark:', srcLightDark);
    return (
        <iframe
            className="iframe-document"
            width={params.widthIframe}
            height={params.heightIframe}
            src={srcLightDark}></iframe>
    );
};

export default Iframe;
