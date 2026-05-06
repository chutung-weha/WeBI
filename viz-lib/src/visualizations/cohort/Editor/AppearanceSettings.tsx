import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { Section, Input, Checkbox, ContextHelp } from "@/components/visualizations/editor";
import { EditorPropTypes } from "@/visualizations/prop-types";
import { visualizationsSettings } from "@/visualizations/visualizationsSettings";

const t = (key: string, fallback?: string) => visualizationsSettings.t(key, fallback);

export default function AppearanceSettings({ options, onOptionsChange }: any) {
  const [debouncedOnOptionsChange] = useDebouncedCallback(onOptionsChange, 200);

  return (
    <React.Fragment>
      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          layout="horizontal"
          label={t("viz.cohort.appearance.timeColumnTitle", "Time Column Title")}
          defaultValue={options.timeColumnTitle}
          onChange={(e: any) => debouncedOnOptionsChange({ timeColumnTitle: e.target.value })}
        />
      </Section>
      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          layout="horizontal"
          label={t("viz.cohort.appearance.peopleColumnTitle", "People Column Title")}
          defaultValue={options.peopleColumnTitle}
          onChange={(e: any) => debouncedOnOptionsChange({ peopleColumnTitle: e.target.value })}
        />
      </Section>
      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          layout="horizontal"
          label={
            <React.Fragment>
              {t("viz.cohort.appearance.stageColumnTitle", "Stage Column Title")}
              <ContextHelp placement="topRight" arrowPointAtCenter>
                {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'null | u... Remove this comment to see the full error message */}
                <div>
                  Use <code>{"{{ @ }}"}</code> to insert a stage number
                </div>
              </ContextHelp>
            </React.Fragment>
          }
          defaultValue={options.stageColumnTitle}
          onChange={(e: any) => debouncedOnOptionsChange({ stageColumnTitle: e.target.value })}
        />
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          layout="horizontal"
          label={
            <React.Fragment>
              {t("viz.cohort.appearance.numberFormat", "Number Values Format")}
              <ContextHelp.NumberFormatSpecs />
            </React.Fragment>
          }
          defaultValue={options.numberFormat}
          onChange={(e: any) => debouncedOnOptionsChange({ numberFormat: e.target.value })}
        />
      </Section>
      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          layout="horizontal"
          label={
            <React.Fragment>
              {t("viz.cohort.appearance.percentFormat", "Percent Values Format")}
              <ContextHelp.NumberFormatSpecs />
            </React.Fragment>
          }
          defaultValue={options.percentFormat}
          onChange={(e: any) => debouncedOnOptionsChange({ percentFormat: e.target.value })}
        />
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          layout="horizontal"
          label={t("viz.cohort.appearance.noValuePlaceholder", "No Value Placeholder")}
          defaultValue={options.noValuePlaceholder}
          onChange={(e: any) => debouncedOnOptionsChange({ noValuePlaceholder: e.target.value })}
        />
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Checkbox
          defaultChecked={options.showTooltips}
          onChange={event => onOptionsChange({ showTooltips: event.target.checked })}>
          {t("viz.cohort.appearance.showTooltips", "Show Tooltips")}
        </Checkbox>
      </Section>
      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Checkbox
          defaultChecked={options.percentValues}
          onChange={event => onOptionsChange({ percentValues: event.target.checked })}>
          {t("viz.cohort.appearance.normalizeValues", "Normalize Values to Percentage")}
        </Checkbox>
      </Section>
    </React.Fragment>
  );
}

AppearanceSettings.propTypes = EditorPropTypes;
