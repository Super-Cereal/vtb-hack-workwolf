import { memo, SVGProps } from "react";
import React from "react";
const Ellipse40Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio="none" viewBox="0 0 137 152" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <ellipse
      cx={68.96}
      cy={75.6633}
      rx={43.6889}
      ry={62.4155}
      transform="rotate(151.729 68.96 75.6633)"
      fill="#0053F6"
    />
  </svg>
);

const Memo = memo(Ellipse40Icon);

export { Memo as Ellipse40Icon };
