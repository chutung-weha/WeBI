import { isString, map, uniq, flatten, filter, sortBy, keys } from "lodash";
import React from "react";
import { Section, Select } from "@/components/visualizations/editor";
import { visualizationsSettings } from "@/visualizations/visualizationsSettings";

const t = (key: string, fallback?: string) => visualizationsSettings.t(key, fallback);

// Static structure (preserves shape for getMappedColumns logic) — labels resolved at render time
const MappingTypes = {
  x: { label: "X Column", multiple: false },
  y: { label: "Y Columns", multiple: true },
  series: { label: "Group by", multiple: false },
  yError: { label: "Errors column", multiple: false },
  size: { label: "Bubble Size Column", multiple: false },
  zVal: { label: "Color Column", multiple: false },
};

const SwappedMappingTypes = {
  ...MappingTypes,
  x: { label: "Y Column", multiple: false },
  y: { label: "X Columns", multiple: true },
};

function resolveLabel(type: string, swapped: boolean): string {
  if (!swapped) {
    switch (type) {
      case "x": return t("viz.chart.columns.x", "X Column");
      case "y": return t("viz.chart.columns.y", "Y Columns");
      case "series": return t("viz.chart.columns.groupBy", "Group by");
      case "yError": return t("viz.chart.columns.errors", "Errors column");
      case "size": return t("viz.chart.columns.bubbleSize", "Bubble Size Column");
      case "zVal": return t("viz.chart.columns.color", "Color Column");
    }
  } else {
    switch (type) {
      case "x": return t("viz.chart.columns.swappedX", "Y Column");
      case "y": return t("viz.chart.columns.swappedY", "X Columns");
      case "series": return t("viz.chart.columns.groupBy", "Group by");
      case "yError": return t("viz.chart.columns.errors", "Errors column");
      case "size": return t("viz.chart.columns.bubbleSize", "Bubble Size Column");
      case "zVal": return t("viz.chart.columns.color", "Color Column");
    }
  }
  return type;
}

type OwnProps = {
  value?: string | string[];
  availableColumns?: string[];
  type?: any; // TODO: PropTypes.oneOf(keys(MappingTypes))
  onChange?: (...args: any[]) => any;
};

const columnMappingSelectDefaultProps = {
  value: null,
  availableColumns: [],
  type: null,
  onChange: () => {},
};

type Props = OwnProps & typeof columnMappingSelectDefaultProps;

export default function ColumnMappingSelect({ value, availableColumns, type, onChange, areAxesSwapped }: Props) {
  const options = sortBy(filter(uniq(flatten([availableColumns, value])), v => isString(v) && v !== ""));

  // this swaps the ui, as the data will be swapped on render
  const { multiple } = !areAxesSwapped ? MappingTypes[type] : SwappedMappingTypes[type];
  const label = resolveLabel(type, !!areAxesSwapped);

  return (
    // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
    <Section>
      <Select
        label={label}
        data-test={`Chart.ColumnMapping.${type}`}
        mode={multiple ? "multiple" : "default"}
        allowClear
        showSearch
        placeholder={multiple ? t("viz.chart.columns.chooseMany", "Choose columns...") : t("viz.chart.columns.chooseOne", "Choose column...")}
        value={value || undefined}
        // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
        onChange={(column: any) => onChange(column || null, type)}>
        {map(options, c => (
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
          <Select.Option key={c} value={c} data-test={`Chart.ColumnMapping.${type}.${c}`}>
            {c}
            {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message */}
          </Select.Option>
        ))}
      </Select>
    </Section>
  );
}

ColumnMappingSelect.defaultProps = columnMappingSelectDefaultProps;

ColumnMappingSelect.MappingTypes = MappingTypes;
