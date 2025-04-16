import React, { RefObject, useEffect, useState } from 'react';
import SummaryEntry from '../summary-entry/summary-entry';

interface TableOfContentParams {
    sectionRef: RefObject<HTMLDivElement>;
    maxDepth: number;
    typeSummary?: string;
}

export interface SummaryItem {
    id: string;
    element: HTMLElement;
    hierarchyValue: number;
    parentId?: string;
}

const TableOfContent: React.FC<TableOfContentParams> = params => {
    const [
        listIdEmptyParentsElement,
        setListIdEmptyParentsElement
    ] = useState<SummaryItem[]>([]);
    const [
        summaryItems,
        setSummaryItems
    ] = useState<SummaryItem[]>([]);
    const [
        isExpanded,
        setIsExpanded
    ] = useState<boolean>(false);

    const typeHierarchy = [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'div'
    ];
    const typeStorybookItem = [
        'anchor',
        'story'
    ];

    const activeEntryClass = 'active';

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const handleScroll = () => {
        checkVisibleSection(summaryItems);
    };

    const isNotStorybookItem = (summaryItems: SummaryItem[]) => {
        typeStorybookItem.map(type => {
            summaryItems = summaryItems.filter(item => !item.id.includes(type));
        });
        return summaryItems;
    };

    useEffect(() => {
        if (params.sectionRef.current) {
            const titles = params.sectionRef.current.querySelectorAll<HTMLElement>('[id]');

            const summaryItems: SummaryItem[] = Array.from(titles)
                .map(title => {
                    return {
                        id: title.id,
                        element: title,
                        hierarchyValue: typeHierarchy.findIndex(
                            allowedType => allowedType === title.tagName.toLowerCase()
                        )
                    };
                })
                .filter(item => item.hierarchyValue > -1);

            let summaryItemNotInStorybook = isNotStorybookItem(summaryItems);

            const reverseSummaryItems = [
                ...summaryItemNotInStorybook
            ].reverse();

            summaryItemNotInStorybook = summaryItemNotInStorybook.map(item => {
                const itemIndex = reverseSummaryItems.findIndex(i => i.id === item.id);
                item.parentId = reverseSummaryItems.find(
                    (potentialParentItem, index) =>
                        index > itemIndex && potentialParentItem.hierarchyValue < item.hierarchyValue
                )?.id;
                return item;
            });

            const listEmptyParent = emptyParentElement(summaryItemNotInStorybook);
            setListIdEmptyParentsElement(listEmptyParent);
            setSummaryItems(summaryItemNotInStorybook);
        }
    }, [
        params.sectionRef
    ]);

    const emptyParentElement = (summaryItems: SummaryItem[]) => {
        let result: SummaryItem[] = [];

        summaryItems.forEach(title => {
            if (!title.parentId) {
                result.push(title);
            }
        });

        return result;
    };

    const checkVisibleSection = (summaryItems: SummaryItem[]) => {
        let currentStickyId = null;

        for (let i = 0; i < summaryItems.length; i++) {
            const section = summaryItems[i].element;
            if (section && window.scrollY + 50 >= section.offsetTop) {
                currentStickyId = summaryItems[i];
            }
        }

        if (currentStickyId) return activeSection(currentStickyId);
    };

    const activeSection = (item: SummaryItem) => {
        const section = document.querySelector(`#${item.id}-entry`) as HTMLElement;
        const previousActive = document.querySelector(`.${activeEntryClass}`) as HTMLElement;

        if (section) {
            if (previousActive) previousActive.classList.remove(activeEntryClass);
            section.classList.add(activeEntryClass);
        }
    };

    const activeFirstTitle = (firstTitleId: string) => {
        const section = document.querySelector(`#${firstTitleId}-entry`) as HTMLElement;
        if (section) section.classList.add(activeEntryClass);
    };

    useEffect(() => {
        if (params.typeSummary != 'cards') {
            activeFirstTitle(listIdEmptyParentsElement[0]?.id);
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
        return;
    }, [
        summaryItems
    ]);

    return (
        <>
            <button className={`mat-icon-button toggle-toc`} onClick={toggleExpanded}>
                <span className="material-symbols-outlined">menu</span>
            </button>
            <div className={`table-of-contents ${isExpanded ? 'expanded' : ''}`}>
                <span className="list-title">On this page</span>
                <ul className="depth-1 childrens-list">
                    {listIdEmptyParentsElement.map(emptyParent => (
                        <SummaryEntry
                            sectionRef={params.sectionRef}
                            entry={emptyParent}
                            childrens={summaryItems}
                            titleLevel={0}
                            maxDepth={params.maxDepth}
                        />
                    ))}
                </ul>
            </div>
        </>
    );
};

export default TableOfContent;
