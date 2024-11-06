import React from "react";
import { memo, SVGProps } from "react";

const Ellipse22Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio="none" viewBox="0 0 124 133" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <ellipse
      cx={61.9998}
      cy={66.3174}
      rx={43.6243}
      ry={52.7105}
      transform="rotate(-25.3664 61.9998 66.3174)"
      fill="#18234A"
    />
  </svg>
);

const Memo = memo(Ellipse22Icon);

export { Memo as Ellipse22Icon };
