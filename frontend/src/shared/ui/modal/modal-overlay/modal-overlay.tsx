import React, { ReactNode } from "react";

import styles from "./modal-overlay.module.css";

interface IOverlayProps {
  onClose: () => void;
  children: ReactNode;
}

export const ModalOverlay = ({ onClose, children }: IOverlayProps) => {
  return (
    <div className={styles.back}>
      <div className={styles.shadow} onClick={onClose} />
      {children}
    </div>
  );
};
