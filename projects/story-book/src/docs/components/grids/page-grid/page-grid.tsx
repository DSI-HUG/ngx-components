import React, { ReactNode, useRef } from 'react';
import TableOfContent from '../../table-of-contents/table-of-contents';

type TypeSummary = 'cards';

interface PageGridParams {
    children: ReactNode;
    maxSummaryDepth: string;
    typeSummary?: TypeSummary;
}

const PageGrid: React.FC<PageGridParams> = params => {
    const sectionRef = useRef<HTMLDivElement>(null);

    return (
        <div className={`page-grid`}>
            <div className="page-content" ref={sectionRef}>
                {params.children}
            </div>
            <TableOfContent
                sectionRef={sectionRef}
                maxDepth={+params.maxSummaryDepth}
                typeSummary={params?.typeSummary}
            />
        </div>
    );
};

export default PageGrid;
