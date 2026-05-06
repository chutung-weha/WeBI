import createTabbedEditor from "@/components/visualizations/editor/createTabbedEditor";
import { visualizationsSettings } from "@/visualizations/visualizationsSettings";

import ColumnsSettings from "./ColumnsSettings";
import OptionsSettings from "./OptionsSettings";
import ColorsSettings from "./ColorsSettings";
import AppearanceSettings from "./AppearanceSettings";

const t = (key: string, fallback?: string) => visualizationsSettings.t(key, fallback);

export default createTabbedEditor([
  { key: "Columns", title: () => t("viz.cohort.tabs.columns", "Columns"), component: ColumnsSettings },
  { key: "Options", title: () => t("viz.cohort.tabs.options", "Options"), component: OptionsSettings },
  { key: "Colors", title: () => t("viz.cohort.tabs.colors", "Colors"), component: ColorsSettings },
  { key: "Appearance", title: () => t("viz.cohort.tabs.appearance", "Appearance"), component: AppearanceSettings },
]);
