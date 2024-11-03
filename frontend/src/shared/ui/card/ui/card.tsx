import React, { useState, type ElementType, type PropsWithChildren } from "react";
import cx from "classnames";

import styles from "./card.module.css";

interface Props extends PropsWithChildren {
  title?: string;
  titleTag?: ElementType;
  className?: string;
  maxSelections?: number;
}

/**
 * Шаблонная карточка, в которой уже есть заголовок и стили для отступов и шрифтов.
 *
 * @example
 * <Card title="ВТБ-Гурман растет – это ресторан второго уровня, он дарит вам:" titleTag="h2" maxSelections={3}>
 *   <div>
 *     <input id="one" type="checkbox" name="one" /> <label htmlFor="one">one</label>
 *   </div>
 *   <div>
 *     <input id="two" type="checkbox" name="two" /> <label htmlFor="two">two</label>
 *   </div>
 *   <div>
 *     <input id="three" type="checkbox" name="three" /> <label htmlFor="three">three</label>
 *   </div>
 *   <div>
 *     <input id="four" type="checkbox" name="four" /> <label htmlFor="four">four</label>
 *   </div>
 *   <div>
 *     <input id="five" type="checkbox" name="five" /> <label htmlFor="five">five</label>
 *   </div>
 * </Card>
 */
export const Card = ({ title, titleTag: TitleTag = "span", className, children, maxSelections }: Props) => {
  const [selectedCount, setSelectedCount] = useState(0);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    if (maxSelections && selectedCount >= maxSelections && checked) {
      return;
    }

    setCheckedItems((prev) => {
      const newCheckedItems = { ...prev, [name]: checked };
      setSelectedCount(Object.values(newCheckedItems).filter(Boolean).length);
      return newCheckedItems;
    });
  };

  return (
    <div className={cx(styles.card, className)}>
      {title && <TitleTag className={styles.title}>{title}</TitleTag>}
      <div className={styles.content}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              checked: checkedItems[child.props.name] || false,
              onChange: handleCheckboxChange,
              disabled: maxSelections ? selectedCount >= maxSelections && !checkedItems[child.props.name] : false,
            });
          }
          return child;
        })}
        {maxSelections !== undefined && (
          <div className={styles.selectionInfo}>
            {`Вы можете выбрать еще ${maxSelections - selectedCount} ${maxSelections - selectedCount === 1 ? "элемент" : "элемента"}`}
          </div>
        )}
      </div>
    </div>
  );
};
