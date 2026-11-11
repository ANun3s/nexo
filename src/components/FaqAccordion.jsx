import { useId, useState } from 'react';
import './FaqAccordion.css';

export default function FaqAccordion({ items = [], className = '', ...props }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const id = useId().replaceAll(':', '');

  return (
    <div className={`faq-accordion${className ? ` ${className}` : ''}`} {...props}>
      <ul className="faq-accordion-list">
        {items.map((item, index) => {
          const isOpen = activeIndex === index;
          const triggerId = `${id}-question-${index}`;
          const panelId = `${id}-answer-${index}`;

          return (
            <li className={`faq-accordion-item${isOpen ? ' is-open' : ''}`} key={item.question}>
              <button
                className="faq-accordion-trigger"
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setActiveIndex(isOpen ? null : index)}
              >
                <span className="faq-accordion-mark" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                <span className="faq-accordion-question">{item.question}</span>
                <span className="faq-accordion-chevron" aria-hidden="true" />
              </button>
              <div
                className="faq-accordion-panel"
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                aria-hidden={!isOpen}
              >
                <div className="faq-accordion-clip">
                  <p>{item.answer}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
