import createTabbedEditor from "@/components/visualizations/editor/createTabbedEditor";
import { visualizationsSettings } from "@/visualizations/visualizationsSettings";

import GeneralSettings from "./GeneralSettings";
import ColorsSettings from "./ColorsSettings";
import FormatSettings from "./FormatSettings";
import BoundsSettings from "./BoundsSettings";

const t = (key: string, fallback?: string) => visualizationsSettings.t(key, fallback);

export default createTabbedEditor([
  { key: "General", title: () => t("viz.choropleth.tabs.general", "General"), component: GeneralSettings },
  { key: "Colors", title: () => t("viz.choropleth.tabs.colors", "Colors"), component: ColorsSettings },
  { key: "Format", title: () => t("viz.choropleth.tabs.format", "Format"), component: FormatSettings },
  { key: "Bounds", title: () => t("viz.choropleth.tabs.bounds", "Bounds"), component: BoundsSettings },
]);
