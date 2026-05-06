import React from "react";
import { useTranslation } from "react-i18next";
import Menu from "antd/lib/menu";
import PageHeader from "@/components/PageHeader";
import Link from "@/components/Link";
import location from "@/services/location";
import settingsMenu from "@/services/settingsMenu";

const SETTINGS_TAB_TITLE_KEYS = {
  "Data Sources": "dataSources.pageTitle",
  Users: "users.pageTitle",
  Groups: "groups.pageTitle",
  "Alert Destinations": "destinations.pageTitle",
  General: "settings.general",
  Account: "users.account",
};

function translateTabTitle(t, title) {
  const key = SETTINGS_TAB_TITLE_KEYS[title];
  return key ? t(key) : title;
}

function wrapSettingsTab(id, options, WrappedComponent) {
  settingsMenu.add(id, options);

  return function SettingsTab(props) {
    const { t } = useTranslation();
    const activeItem = settingsMenu.getActiveItem(location.path);
    return (
      <div className="settings-screen">
        <div className="container">
          <PageHeader title={t("navbar.settings")} />
          <div className="bg-white tiled">
            <Menu selectedKeys={[activeItem && activeItem.title]} selectable={false} mode="horizontal">
              {settingsMenu.getAvailableItems().map(item => (
                <Menu.Item key={item.title}>
                  <Link href={item.path} data-test="SettingsScreenItem">
                    {translateTabTitle(t, item.title)}
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
            <div className="p-15">
              <div>
                <WrappedComponent {...props} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default wrapSettingsTab;
