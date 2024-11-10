import React from "react";
import cx from "classnames";

import styles from "./button.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = ({ className, children, fullWidth, ...props }: Props) => (
  <button className={cx(styles.button, fullWidth && styles["full-width"], className)} {...props}>
    {children}
  </button>
);
