import React from "react";
import { memo, SVGProps } from "react";

const Ellipse33Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio="none" viewBox="0 0 97 137" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <ellipse cx={48.5} cy={68.5} rx={48.5} ry={68.5} fill="#2934B2" />
  </svg>
);

const Memo = memo(Ellipse33Icon);

export { Memo as Ellipse33Icon };
