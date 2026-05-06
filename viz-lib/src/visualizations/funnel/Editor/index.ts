import createTabbedEditor from "@/components/visualizations/editor/createTabbedEditor";
import { visualizationsSettings } from "@/visualizations/visualizationsSettings";

import GeneralSettings from "./GeneralSettings";
import AppearanceSettings from "./AppearanceSettings";

const t = (key: string, fallback?: string) => visualizationsSettings.t(key, fallback);

export default createTabbedEditor([
  { key: "General", title: () => t("viz.funnel.tabs.general", "General"), component: GeneralSettings },
  { key: "Appearance", title: () => t("viz.funnel.tabs.appearance", "Appearance"), component: AppearanceSettings },
]);
