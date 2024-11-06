import React from "react";
import { memo, SVGProps } from "react";

const Ellipse17Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio="none" viewBox="0 0 165 184" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <ellipse cx={82.5} cy={92} rx={82.5} ry={92} fill="#3A41BE" />
  </svg>
);

const Memo = memo(Ellipse17Icon);

export { Memo as Ellipse17Icon };
