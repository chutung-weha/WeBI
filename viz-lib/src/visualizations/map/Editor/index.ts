import createTabbedEditor from "@/components/visualizations/editor/createTabbedEditor";
import { visualizationsSettings } from "@/visualizations/visualizationsSettings";

import GeneralSettings from "./GeneralSettings";
import GroupsSettings from "./GroupsSettings";
import FormatSettings from "./FormatSettings";
import StyleSettings from "./StyleSettings";

const t = (key: string, fallback?: string) => visualizationsSettings.t(key, fallback);

export default createTabbedEditor([
  { key: "General", title: () => t("viz.map.tabs.general", "General"), component: GeneralSettings },
  { key: "Groups", title: () => t("viz.map.tabs.groups", "Groups"), component: GroupsSettings },
  { key: "Format", title: () => t("viz.map.tabs.format", "Format"), component: FormatSettings },
  { key: "Style", title: () => t("viz.map.tabs.style", "Style"), component: StyleSettings },
]);
