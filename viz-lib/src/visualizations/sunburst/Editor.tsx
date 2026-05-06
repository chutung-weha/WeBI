import React from "react";
import { Section } from "@/components/visualizations/editor";
import { visualizationsSettings } from "@/visualizations/visualizationsSettings";

const t = (key: string, fallback?: string) => visualizationsSettings.t(key, fallback);

export default function Editor() {
  return (
    <React.Fragment>
      <p>{t("viz.sunburst.intro", "This visualization expects the query result to have rows in one of the following formats:")}</p>
      {/* @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message */}
      <Section>
        <p>
          <strong>{t("viz.sunburst.option1", "Option 1:")}</strong>
        </p>
        <ul>
          <li>
            <strong>sequence</strong> - {t("viz.sunburst.sequenceId", "sequence id")}
          </li>
          <li>
            <strong>stage</strong> - {t("viz.sunburst.stageInSequence", "what stage in sequence this is (1, 2, ...)")}
          </li>
          <li>
            <strong>node</strong> - {t("viz.sunburst.stageName", "stage name")}
          </li>
          <li>
            <strong>value</strong> - {t("viz.sunburst.value", "number of times this sequence occurred")}
          </li>
        </ul>
      </Section>
      {/* @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message */}
      <Section>
        <p>
          <strong>{t("viz.sunburst.option2", "Option 2:")}</strong>
        </p>
        <ul>
          <li>
            <strong>stage1</strong> - {t("viz.sunburst.stage1", "stage 1 value")}
          </li>
          <li>
            <strong>stage2</strong> - {t("viz.sunburst.stageN", "stage value (or null)")}
          </li>
          <li>
            <strong>stage3</strong> - {t("viz.sunburst.stageN", "stage value (or null)")}
          </li>
          <li>
            <strong>stage4</strong> - {t("viz.sunburst.stageN", "stage value (or null)")}
          </li>
          <li>
            <strong>stage5</strong> - {t("viz.sunburst.stageN", "stage value (or null)")}
          </li>
          <li>
            <strong>value</strong> - {t("viz.sunburst.value", "number of times this sequence occurred")}
          </li>
        </ul>
      </Section>
    </React.Fragment>
  );
}
