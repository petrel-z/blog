import {
  flowRendererV2,
  flowStyles
} from "./chunk-DEECTGUT.js";
import "./chunk-QL2ECDH6.js";
import "./chunk-B5HJZSKN.js";
import "./chunk-A6QXRUVC.js";
import {
  flowDb,
  parser$1
} from "./chunk-5CWYRM7T.js";
import "./chunk-RQWEZMV7.js";
import "./chunk-VSZREH27.js";
import "./chunk-S7YHCZXR.js";
import "./chunk-FVOCDV6K.js";
import "./chunk-KEDGJU25.js";
import "./chunk-QJSAEEOK.js";
import "./chunk-4ISJML4K.js";
import {
  setConfig
} from "./chunk-KPMAGHCB.js";
import "./chunk-5WRI5ZAA.js";

// node_modules/.pnpm/mermaid@10.9.3/node_modules/mermaid/dist/flowDiagram-v2-74c8dbcc.js
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
//# sourceMappingURL=flowDiagram-v2-74c8dbcc-YX25K2A4.js.map
