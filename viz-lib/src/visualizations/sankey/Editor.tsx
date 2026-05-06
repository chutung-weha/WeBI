import React from "react";
import { visualizationsSettings } from "@/visualizations/visualizationsSettings";

const t = (key: string, fallback?: string) => visualizationsSettings.t(key, fallback);

export default function Editor() {
  return (
    <React.Fragment>
      <p>{t("viz.sankey.intro", "This visualization expects the query result to have rows in the following format:")}</p>
      <ul>
        <li>
          <strong>stage1</strong> - {t("viz.sankey.stage1", "stage 1 value")}
        </li>
        <li>
          <strong>stage2</strong> - {t("viz.sankey.stageN", "stage value (or null)")}
        </li>
        <li>
          <strong>stage3</strong> - {t("viz.sankey.stageN", "stage value (or null)")}
        </li>
        <li>
          <strong>stage4</strong> - {t("viz.sankey.stageN", "stage value (or null)")}
        </li>
        <li>
          <strong>stage5</strong> - {t("viz.sankey.stageN", "stage value (or null)")}
        </li>
        <li>
          <strong>value</strong> - {t("viz.sankey.value", "number of times this sequence occurred")}
        </li>
      </ul>
    </React.Fragment>
  );
}
