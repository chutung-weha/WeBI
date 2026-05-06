/* eslint-disable react/prop-types */
import React from "react";
import createTabbedEditor from "@/components/visualizations/editor/createTabbedEditor";
import { visualizationsSettings } from "@/visualizations/visualizationsSettings";

import GeneralSettings from "./GeneralSettings";
import XAxisSettings from "./XAxisSettings";
import YAxisSettings from "./YAxisSettings";
import SeriesSettings from "./SeriesSettings";
import ColorsSettings from "./ColorsSettings";
import DataLabelsSettings from "./DataLabelsSettings";
import CustomChartSettings from "./CustomChartSettings";

import "./editor.less";

const isCustomChart = (options: any) => options.globalSeriesType === "custom";
const isPieChart = (options: any) => options.globalSeriesType === "pie";

const t = (key: string, fallback?: string) => visualizationsSettings.t(key, fallback);

export default createTabbedEditor([
  {
    key: "General",
    title: () => t("viz.chart.tabs.general", "General"),
    component: (props: any) => (
      <React.Fragment>
        <GeneralSettings {...props} />
        {isCustomChart(props.options) && <CustomChartSettings {...props} />}
      </React.Fragment>
    ),
  },
  {
    key: "XAxis",
    title: ({ swappedAxes }: any) =>
      !swappedAxes ? t("viz.chart.tabs.xAxis", "X Axis") : t("viz.chart.tabs.yAxis", "Y Axis"),
    component: XAxisSettings,
    isAvailable: (options: any) => !isCustomChart(options) && !isPieChart(options),
  },
  {
    key: "YAxis",
    title: ({ swappedAxes }: any) =>
      !swappedAxes ? t("viz.chart.tabs.yAxis", "Y Axis") : t("viz.chart.tabs.xAxis", "X Axis"),
    component: YAxisSettings,
    isAvailable: (options: any) => !isCustomChart(options) && !isPieChart(options),
  },
  {
    key: "Series",
    title: () => t("viz.chart.tabs.series", "Series"),
    component: SeriesSettings,
    isAvailable: (options: any) => !isCustomChart(options),
  },
  {
    key: "Colors",
    title: () => t("viz.chart.tabs.colors", "Colors"),
    component: ColorsSettings,
    isAvailable: (options: any) => !isCustomChart(options),
  },
  {
    key: "DataLabels",
    title: () => t("viz.chart.tabs.dataLabels", "Data Labels"),
    component: DataLabelsSettings,
    isAvailable: (options: any) => !isCustomChart(options),
  },
]);
