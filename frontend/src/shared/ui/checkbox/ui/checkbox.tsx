import React from "react";

import styles from "./checkbox.module.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  children: string;
}

export const Checkbox = ({ children, id, ...inputProps }: Props) => (
  <>
    <input type="checkbox" className={styles.checkbox} id={id} name={id} {...inputProps} />

    <label className={styles.label} htmlFor={id}>
      {children}
    </label>
  </>
);
