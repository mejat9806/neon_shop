import React, { memo } from "react";
import { motion as m } from "framer-motion";

const ArrowSvg = memo(() => (
  <m.svg
    className={"w-14 h-14 py-2"}
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <m.path
      fill="#00000096"
      stroke="#00000096"
      initial={{ stroke: "#00000096" }}
      whileHover={{ fill: "#fd0000" }}
      d="M441.751,475.584L222.166,256L441.75,36.416c6.101-6.101,7.936-15.275,4.629-23.253C443.094,5.184,435.286,0,426.667,0
      H320.001c-5.675,0-11.093,2.24-15.083,6.251L70.251,240.917c-8.341,8.341-8.341,21.824,0,30.165l234.667,234.667
      c3.989,4.011,9.408,6.251,15.083,6.251h106.667c8.619,0,16.427-5.184,19.712-13.163
      C449.687,490.858,447.852,481.685,441.751,475.584z"
    />
  </m.svg>
));
ArrowSvg.displayName = "ArrowSvg";

export default ArrowSvg;
