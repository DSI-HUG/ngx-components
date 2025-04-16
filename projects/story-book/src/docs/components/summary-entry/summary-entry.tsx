import React, { RefObject } from 'react';
import { SummaryItem } from '../table-of-contents/table-of-contents';

interface SummaryEntryParams {
    sectionRef?: RefObject<HTMLDivElement>;
    entry: SummaryItem;
    childrens: SummaryItem[];
    titleLevel: number;
    maxDepth: number;
}

const SummaryEntry: React.FC<SummaryEntryParams> = params => {
    const highlightSection = (id: string) => {
        if (params.sectionRef?.current) {
            const classNameHighlight = 'highlight';
            const section = params.sectionRef.current.querySelector(id) as HTMLElement;
            const previousHighlighted = params.sectionRef.current.querySelector(
                `.${classNameHighlight}`
            ) as HTMLElement;

            if (previousHighlighted) previousHighlighted.classList.remove(classNameHighlight);

            section.classList.add(classNameHighlight);

            setTimeout(() => {
                section.classList.remove(classNameHighlight);
            }, 3000);
        }
    };

    const titleLevelIndentation = (level: number) => {
        const classLabel = 'depth';
        return `${classLabel}-${level + 2}`;
    };

    const childrenEntries = params.childrens.filter(entry => entry.parentId === params.entry.id);
    const classTitleLevelIndentation = titleLevelIndentation(params.titleLevel);

    // Remove emoji or other symbols
    // For the card we aim directly at the title
    const cleanEntryLabel = (rawLabel: HTMLElement) => {
        let lines = '';
        let rawLabelCopy = rawLabel.cloneNode(true) as HTMLElement;

        const icon = rawLabelCopy.querySelector('.material-symbols-outlined');
        icon?.remove();

        const card = rawLabelCopy.querySelector('.card-title');
        if (card) {
            lines = card.innerHTML;
        } else {
            lines = rawLabelCopy?.innerText;
        }

        return lines.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/gi, '');
    };

    return (
        <>
            <li key={params.entry.id} className="list-entry" id={`${params.entry.id}-entry`}>
                <span className="entry-content">
                    <a
                        href={`#${params.entry.id}`}
                        className={`entry-label`}
                        target="_self"
                        onClick={() => {
                            highlightSection(`#${params.entry.id}`);
                        }}>
                        <span>{cleanEntryLabel(params.entry.element)}</span>
                    </a>
                </span>

                {childrenEntries.length > 0 && params.titleLevel < params.maxDepth && (
                    <ul className={`childrens-list ${classTitleLevelIndentation}`}>
                        {childrenEntries.map(childrenEntry => (
                            <SummaryEntry
                                sectionRef={params.sectionRef}
                                entry={childrenEntry}
                                childrens={params.childrens}
                                titleLevel={params.titleLevel + 1}
                                maxDepth={params.maxDepth}
                            />
                        ))}
                    </ul>
                )}
            </li>
        </>
    );
};

export default SummaryEntry;
