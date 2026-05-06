import { first } from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import Button from "antd/lib/button";
import MenuOutlinedIcon from "@ant-design/icons/MenuOutlined";
import Dropdown from "antd/lib/dropdown";
import Menu from "antd/lib/menu";
import Link from "@/components/Link";
import { Auth, currentUser } from "@/services/auth";
import settingsMenu from "@/services/settingsMenu";
import logoUrl from "@/assets/images/redash_icon_small.png";

import "./MobileNavbar.less";

export default function MobileNavbar({ getPopupContainer }) {
  const { t } = useTranslation();
  const firstSettingsTab = first(settingsMenu.getAvailableItems());

  return (
    <div className="mobile-navbar">
      <div className="mobile-navbar-logo">
        <Link href="./">
          <img src={logoUrl} alt="WE BOARD" />
        </Link>
      </div>
      <div>
        <Dropdown
          overlayStyle={{ minWidth: 200 }}
          trigger={["click"]}
          getPopupContainer={getPopupContainer} // so the overlay menu stays with the fixed header when page scrolls
          overlay={
            <Menu mode="vertical" theme="dark" selectable={false} className="mobile-navbar-menu">
              {currentUser.hasPermission("list_dashboards") && (
                <Menu.Item key="dashboards">
                  <Link href="dashboards">{t("navbar.dashboards")}</Link>
                </Menu.Item>
              )}
              {currentUser.hasPermission("view_query") && (
                <Menu.Item key="queries">
                  <Link href="queries">{t("navbar.queries")}</Link>
                </Menu.Item>
              )}
              {currentUser.hasPermission("list_alerts") && (
                <Menu.Item key="alerts">
                  <Link href="alerts">{t("navbar.alerts")}</Link>
                </Menu.Item>
              )}
              <Menu.Item key="profile">
                <Link href="users/me">{t("navbar.editProfile")}</Link>
              </Menu.Item>
              <Menu.Divider />
              {firstSettingsTab && (
                <Menu.Item key="settings">
                  <Link href={firstSettingsTab.path}>{t("navbar.settings")}</Link>
                </Menu.Item>
              )}
              {currentUser.hasPermission("super_admin") && (
                <Menu.Item key="status">
                  <Link href="admin/status">{t("navbar.systemStatus")}</Link>
                </Menu.Item>
              )}
              {currentUser.hasPermission("super_admin") && <Menu.Divider />}
              <Menu.Item key="help">
                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                <Link href="https://redash.io/help" target="_blank" rel="noopener">
                  {t("navbar.help")}
                </Link>
              </Menu.Item>
              <Menu.SubMenu key="language" title={t("navbar.language")}>
                <Menu.Item key="lang-vi" onClick={() => i18n.changeLanguage("vi")}>
                  Tiếng Việt
                </Menu.Item>
                <Menu.Item key="lang-en" onClick={() => i18n.changeLanguage("en")}>
                  English
                </Menu.Item>
              </Menu.SubMenu>
              <Menu.Item key="logout" onClick={() => Auth.logout()}>
                {t("navbar.logout")}
              </Menu.Item>
            </Menu>
          }>
          <Button className="mobile-navbar-toggle-button" ghost>
            <MenuOutlinedIcon />
          </Button>
        </Dropdown>
      </div>
    </div>
  );
}

MobileNavbar.propTypes = {
  getPopupContainer: PropTypes.func,
};

MobileNavbar.defaultProps = {
  getPopupContainer: null,
};
