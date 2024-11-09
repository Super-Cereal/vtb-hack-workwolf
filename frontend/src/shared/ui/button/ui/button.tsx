import React from "react";
import cx from "classnames";

import styles from "./button.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ className, children, ...props }: Props) => (
  <button className={cx(styles.button, className)} {...props}>
    {children}
  </button>
);
