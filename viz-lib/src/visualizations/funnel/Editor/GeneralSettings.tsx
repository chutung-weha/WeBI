import { map } from "lodash";
import React, { useMemo } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Section, Select, Input, Checkbox } from "@/components/visualizations/editor";
import { EditorPropTypes } from "@/visualizations/prop-types";
import { visualizationsSettings } from "@/visualizations/visualizationsSettings";

const t = (key: string, fallback?: string) => visualizationsSettings.t(key, fallback);

export default function GeneralSettings({ options, data, onOptionsChange }: any) {
  const columnNames = useMemo(() => map(data.columns, c => c.name), [data]);

  const [onOptionsChangeDebounced] = useDebouncedCallback(onOptionsChange, 200);

  return (
    <React.Fragment>
      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Select
          layout="horizontal"
          label={t("viz.funnel.general.stepColumn", "Step Column")}
          data-test="Funnel.StepColumn"
          placeholder={t("viz.funnel.general.chooseColumn", "Choose column...")}
          defaultValue={options.stepCol.colName || undefined}
          onChange={(colName: any) => onOptionsChange({ stepCol: { colName: colName || null } })}>
          {map(columnNames, col => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            <Select.Option key={col} data-test={`Funnel.StepColumn.${col}`}>
              {col}
              {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message */}
            </Select.Option>
          ))}
        </Select>
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          layout="horizontal"
          label={t("viz.funnel.general.stepColumnTitle", "Step Column Title")}
          data-test="Funnel.StepColumnTitle"
          defaultValue={options.stepCol.displayAs}
          onChange={(event: any) => onOptionsChangeDebounced({ stepCol: { displayAs: event.target.value } })}
        />
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Select
          layout="horizontal"
          label={t("viz.funnel.general.valueColumn", "Value Column")}
          data-test="Funnel.ValueColumn"
          placeholder={t("viz.funnel.general.chooseColumn", "Choose column...")}
          defaultValue={options.valueCol.colName || undefined}
          onChange={(colName: any) => onOptionsChange({ valueCol: { colName: colName || null } })}>
          {map(columnNames, col => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            <Select.Option key={col} data-test={`Funnel.ValueColumn.${col}`}>
              {col}
              {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message */}
            </Select.Option>
          ))}
        </Select>
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          layout="horizontal"
          label={t("viz.funnel.general.valueColumnTitle", "Value Column Title")}
          data-test="Funnel.ValueColumnTitle"
          defaultValue={options.valueCol.displayAs}
          onChange={(event: any) => onOptionsChangeDebounced({ valueCol: { displayAs: event.target.value } })}
        />
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Checkbox
          data-test="Funnel.CustomSort"
          checked={!options.autoSort}
          onChange={event => onOptionsChange({ autoSort: !event.target.checked })}>
          {t("viz.funnel.general.customSorting", "Custom Sorting")}
        </Checkbox>
      </Section>

      {!options.autoSort && (
        <React.Fragment>
          {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
          <Section>
            <Select
              layout="horizontal"
              label={t("viz.funnel.general.sortColumn", "Sort Column")}
              data-test="Funnel.SortColumn"
              allowClear
              placeholder={t("viz.funnel.general.chooseColumn", "Choose column...")}
              defaultValue={options.sortKeyCol.colName || undefined}
              onChange={(colName: any) => onOptionsChange({ sortKeyCol: { colName: colName || null } })}>
              {map(columnNames, col => (
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
                <Select.Option key={col} data-test={`Funnel.SortColumn.${col}`}>
                  {col}
                  {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message */}
                </Select.Option>
              ))}
            </Select>
          </Section>

          {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
          <Section>
            <Select
              layout="horizontal"
              label={t("viz.funnel.general.sortOrder", "Sort Order")}
              data-test="Funnel.SortDirection"
              disabled={!options.sortKeyCol.colName}
              defaultValue={options.sortKeyCol.reverse ? "desc" : "asc"}
              onChange={(order: any) => onOptionsChange({ sortKeyCol: { reverse: order === "desc" } })}>
              {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message */}
              <Select.Option value="asc" data-test="Funnel.SortDirection.Ascending">
                {t("viz.funnel.general.ascending", "ascending")}
                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message */}
              </Select.Option>
              {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message */}
              <Select.Option value="desc" data-test="Funnel.SortDirection.Descending">
                {t("viz.funnel.general.descending", "descending")}
                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message */}
              </Select.Option>
            </Select>
          </Section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

GeneralSettings.propTypes = EditorPropTypes;
