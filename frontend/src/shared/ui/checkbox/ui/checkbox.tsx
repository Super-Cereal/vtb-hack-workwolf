import React from "react";

import styles from "./checkbox.module.css";

interface Props {
  id: string;
  value: string;
  children: string;
}

export const Checkbox = ({ id, value, children }: Props) => (
  <>
    <input type="checkbox" className={styles.checkbox} id={id} name={id} value={value} />

    <label className={styles.label} htmlFor={id}>
      {children}
    </label>
  </>
);
