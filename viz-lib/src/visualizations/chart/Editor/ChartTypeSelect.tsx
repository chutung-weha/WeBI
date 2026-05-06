import { filter, includes, map } from "lodash";
import React, { useMemo } from "react";
import { Select } from "@/components/visualizations/editor";
import { visualizationsSettings } from "@/visualizations/visualizationsSettings";

const t = (key: string, fallback?: string) => visualizationsSettings.t(key, fallback);

const getAllChartTypes = () => [
  { type: "line", name: t("viz.chart.types.line", "Line"), icon: "line-chart" },
  { type: "column", name: t("viz.chart.types.column", "Bar"), icon: "bar-chart" },
  { type: "area", name: t("viz.chart.types.area", "Area"), icon: "area-chart" },
  { type: "pie", name: t("viz.chart.types.pie", "Pie"), icon: "pie-chart" },
  { type: "scatter", name: t("viz.chart.types.scatter", "Scatter"), icon: "circle-o" },
  { type: "bubble", name: t("viz.chart.types.bubble", "Bubble"), icon: "circle-o" },
  { type: "heatmap", name: t("viz.chart.types.heatmap", "Heatmap"), icon: "th" },
  { type: "box", name: t("viz.chart.types.box", "Box"), icon: "square-o" },
];

type OwnProps = {
  hiddenChartTypes?: any[]; // TODO: PropTypes.oneOf(map(allChartTypes, "type"))
};

const chartTypeSelectDefaultProps = {
  hiddenChartTypes: [],
};

type Props = OwnProps & typeof chartTypeSelectDefaultProps;

export default function ChartTypeSelect({ hiddenChartTypes, ...props }: Props) {
  const chartTypes = useMemo(() => {
    const result = [...getAllChartTypes()];

    if (visualizationsSettings.allowCustomJSVisualizations) {
      result.push({ type: "custom", name: t("viz.chart.types.custom", "Custom"), icon: "code" });
    }

    if (hiddenChartTypes.length > 0) {
      return filter(result, ({ type }) => !includes(hiddenChartTypes, type));
    }

    return result;
  }, []);

  return (
    <Select {...props}>
      {map(chartTypes, ({ type, name, icon }) => (
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
        <Select.Option key={type} value={type} data-test={`Chart.ChartType.${type}`}>
          <i className={`fa fa-${icon}`} style={{ marginRight: 5 }} />
          {name}
          {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message */}
        </Select.Option>
      ))}
    </Select>
  );
}

ChartTypeSelect.defaultProps = chartTypeSelectDefaultProps;
