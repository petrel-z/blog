import {
  flowRendererV2,
  flowStyles
} from "./chunk-6E3MYWKG.js";
import "./chunk-TPMOBHCD.js";
import "./chunk-QE6SGBYU.js";
import "./chunk-XWZ73NBO.js";
import {
  flowDb,
  parser$1
} from "./chunk-R3VODJPJ.js";
import "./chunk-3Q2RJGHC.js";
import "./chunk-F24SW226.js";
import "./chunk-GQSU3LSO.js";
import "./chunk-RPTJ2D5Y.js";
import "./chunk-BJ4J42HH.js";
import "./chunk-XP7M6FJS.js";
import "./chunk-2AA25MXT.js";
import {
  setConfig
} from "./chunk-ORKV5D4O.js";
import "./chunk-5WRI5ZAA.js";

// node_modules/mermaid/dist/flowDiagram-v2-74c8dbcc.js
var diagram = {
  parser: parser$1,
  db: flowDb,
  renderer: flowRendererV2,
  styles: flowStyles,
  init: (cnf) => {
    if (!cnf.flowchart) {
      cnf.flowchart = {};
    }
    cnf.flowchart.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    setConfig({ flowchart: { arrowMarkerAbsolute: cnf.arrowMarkerAbsolute } });
    flowRendererV2.setConf(cnf.flowchart);
    flowDb.clear();
    flowDb.setGen("gen-2");
  }
};
export {
  diagram
};
//# sourceMappingURL=flowDiagram-v2-74c8dbcc-B4XFK4IQ.js.map
