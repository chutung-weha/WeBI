import React from "react";
import { Section, Switch } from "@/components/visualizations/editor";
import { EditorPropTypes } from "@/visualizations/prop-types";
import { visualizationsSettings } from "@/visualizations/visualizationsSettings";

import AxisSettings from "./AxisSettings";

const t = (key: string, fallback?: string) => visualizationsSettings.t(key, fallback);

export default function XAxisSettings({ options, onOptionsChange }: any) {
  return (
    <React.Fragment>
      <AxisSettings
        id="XAxis"
        features={{ autoDetectType: true }}
        options={options.xAxis}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '(xAxis: any) => any' is not assignable to ty... Remove this comment to see the full error message
        onChange={(xAxis: any) => onOptionsChange({ xAxis })}
      />

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
        <Switch
          data-test="Chart.XAxis.Sort"
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
          defaultChecked={options.sortX}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '(sortX: any) => any' is not assignable to ty... Remove this comment to see the full error message
          onChange={(sortX: any) => onOptionsChange({ sortX })}>
          {t("viz.chart.axis.sortValues", "Sort Values")}
        </Switch>
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
        <Switch
          data-test="Chart.XAxis.Reverse"
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
          defaultChecked={options.reverseX}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '(reverseX: any) => any' is not assignable to... Remove this comment to see the full error message
          onChange={(reverseX: any) => onOptionsChange({ reverseX })}>
          {t("viz.chart.axis.reverseOrder", "Reverse Order")}
        </Switch>
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
        <Switch
          data-test="Chart.XAxis.ShowLabels"
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
          defaultChecked={options.xAxis.labels.enabled}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '(enabled: any) => any' is not assignable to ... Remove this comment to see the full error message
          onChange={(enabled: any) => onOptionsChange({ xAxis: { labels: { enabled } } })}>
          {t("viz.chart.axis.showLabels", "Show Labels")}
        </Switch>
      </Section>
    </React.Fragment>
  );
}

XAxisSettings.propTypes = EditorPropTypes;
