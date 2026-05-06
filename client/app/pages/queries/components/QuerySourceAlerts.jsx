import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Card from "antd/lib/card";
import WarningFilledIcon from "@ant-design/icons/WarningFilled";
import Typography from "antd/lib/typography";
import Link from "@/components/Link";
import DynamicComponent from "@/components/DynamicComponent";
import { currentUser } from "@/services/auth";

import useQueryFlags from "../hooks/useQueryFlags";
import "./QuerySourceAlerts.less";

export default function QuerySourceAlerts({ query, dataSourcesAvailable }) {
  const { t } = useTranslation();
  const queryFlags = useQueryFlags(query); // we don't use flags that depend on data source

  let message = null;
  if (queryFlags.isNew && !queryFlags.canCreate) {
    message = (
      <React.Fragment>
        <Typography.Title level={4}>
          {t("queries.noPermissionCreate")}
        </Typography.Title>
        <p>
          <Typography.Text type="secondary">
            <Link href="queries">{t("queries.browseExisting")}</Link> {t("queries.askAdminPermission")}
          </Typography.Text>
        </p>
      </React.Fragment>
    );
  } else if (!dataSourcesAvailable) {
    if (currentUser.isAdmin) {
      message = (
        <React.Fragment>
          <Typography.Title level={4}>
            {t("queries.noDataSources")}
          </Typography.Title>
          <p>
            <Typography.Text type="secondary">{t("queries.createOneFirst")}</Typography.Text>
          </p>

          <div className="query-source-alerts-actions">
            <Link.Button type="primary" href="data_sources/new">
              {t("queries.createDataSource")}
            </Link.Button>
            <Link.Button type="default" href="groups">
              {t("queries.manageGroupPermissions")}
            </Link.Button>
          </div>
        </React.Fragment>
      );
    } else {
      message = (
        <React.Fragment>
          <Typography.Title level={4}>
            {t("queries.noDataSources")}
          </Typography.Title>
          <p>
            <Typography.Text type="secondary">{t("queries.askAdminCreate")}</Typography.Text>
          </p>
        </React.Fragment>
      );
    }
  }

  if (!message) {
    return null;
  }

  return (
    <div className="query-source-alerts">
      <Card>
        <DynamicComponent name="QuerySource.Alerts" query={query} dataSourcesAvailable={dataSourcesAvailable}>
          <div className="query-source-alerts-icon">
            <WarningFilledIcon />
          </div>
          {message}
        </DynamicComponent>
      </Card>
    </div>
  );
}

QuerySourceAlerts.propTypes = {
  query: PropTypes.object.isRequired,
  dataSourcesAvailable: PropTypes.bool,
};

QuerySourceAlerts.defaultProps = {
  dataSourcesAvailable: false,
};
