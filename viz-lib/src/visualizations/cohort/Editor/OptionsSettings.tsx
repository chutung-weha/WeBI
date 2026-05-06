import { map } from "lodash";
import React from "react";
import { Section, Select } from "@/components/visualizations/editor";
import { EditorPropTypes } from "@/visualizations/prop-types";
import { visualizationsSettings } from "@/visualizations/visualizationsSettings";

const t = (key: string, fallback?: string) => visualizationsSettings.t(key, fallback);

const CohortTimeIntervals = () => ({
  daily: t("viz.cohort.options.daily", "Daily"),
  weekly: t("viz.cohort.options.weekly", "Weekly"),
  monthly: t("viz.cohort.options.monthly", "Monthly"),
});

const CohortModes = () => ({
  diagonal: t("viz.cohort.options.fillGapsWithZeros", "Fill gaps with zeros"),
  simple: t("viz.cohort.options.showAsIs", "Show data as is"),
});

export default function OptionsSettings({ options, onOptionsChange }: any) {
  return (
    <React.Fragment>
      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Select
          layout="horizontal"
          label={t("viz.cohort.options.timeInterval", "Time Interval")}
          data-test="Cohort.TimeInterval"
          value={options.timeInterval}
          onChange={(timeInterval: any) => onOptionsChange({ timeInterval })}>
          {map(CohortTimeIntervals(), (name, value) => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            <Select.Option key={value} data-test={"Cohort.TimeInterval." + value}>
              {name}
              {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message */}
            </Select.Option>
          ))}
        </Select>
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Select
          layout="horizontal"
          label={t("viz.cohort.options.mode", "Mode")}
          data-test="Cohort.Mode"
          value={options.mode}
          onChange={(mode: any) => onOptionsChange({ mode })}>
          {map(CohortModes(), (name, value) => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            <Select.Option key={value} data-test={"Cohort.Mode." + value}>
              {name}
              {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message */}
            </Select.Option>
          ))}
        </Select>
      </Section>
    </React.Fragment>
  );
}

OptionsSettings.propTypes = EditorPropTypes;
