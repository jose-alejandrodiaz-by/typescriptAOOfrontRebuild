import React from 'react';
import '../style/SummaryComponent.css';

interface SummaryItem {
    label: string;
    value: string | number | undefined;
}

interface SummaryComponentProps {
    items: SummaryItem[];
}

interface SummaryHeadersProps {
    headers: string[];
}

export const SummaryHeaders: React.FC<SummaryHeadersProps> = ({ headers }) => {
    return (
        <div className="summary-banner-headers">
            {headers.map((header, index) => (
                <h4 key={index} className='item'>{header}</h4>
            ))}
        </div>
    );
};

const SummaryComponent: React.FC<SummaryComponentProps> = ({ items }) => {
    return (
        <div className="summary-banner">
            {items.map((item, index) => (
                <p key={index} className='item' style={{ fontWeight: index === 0 ? 'bold' : 'normal' }}>
                    {item.value !== null ? item.value : 'N/A'}
                </p>
            ))}
        </div>
    );
};

export default SummaryComponent;