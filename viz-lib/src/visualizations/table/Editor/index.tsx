import createTabbedEditor from "@/components/visualizations/editor/createTabbedEditor";
import { visualizationsSettings } from "@/visualizations/visualizationsSettings";

import ColumnsSettings from "./ColumnsSettings";
import GridSettings from "./GridSettings";

import "./editor.less";

const t = (key: string, fallback?: string) => visualizationsSettings.t(key, fallback);

export default createTabbedEditor([
  { key: "Columns", title: () => t("viz.table.tabs.columns", "Columns"), component: ColumnsSettings },
  { key: "Grid", title: () => t("viz.table.tabs.grid", "Grid"), component: GridSettings },
]);
