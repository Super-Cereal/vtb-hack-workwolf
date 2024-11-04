import React from "react";
import cx from "classnames";

import styles from "./loader.module.css";

interface Props {
  className?: string | string[];
}

export const Loader = ({ className }: Props) => <span className={cx(styles.loader, className)} />;
