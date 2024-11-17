import { Tooltip as ReactTooltip } from "react-tooltip"

import "react-tooltip/dist/react-tooltip.css"

const ToolTip = () => {
   return (
      <div>
         <button data-tip data-for="registerTip">
            Register
         </button>

         <ReactTooltip id="registerTip" place="top">
            Tooltip for the register button
         </ReactTooltip>
      </div>
   )
}

export default ToolTip
