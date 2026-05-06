import createTabbedEditor from "@/components/visualizations/editor/createTabbedEditor";
import { visualizationsSettings } from "@/visualizations/visualizationsSettings";

import ColumnsSettings from "./ColumnsSettings";

import "./editor.less";

const t = (key: string, fallback?: string) => visualizationsSettings.t(key, fallback);

export default createTabbedEditor([
  { key: "Columns", title: () => t("viz.details.tabs.columns", "Columns"), component: ColumnsSettings },
]);
