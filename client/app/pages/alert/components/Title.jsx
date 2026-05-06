import React from "react";
import PropTypes from "prop-types";
import i18n from "@/i18n";
import Input from "antd/lib/input";
import { getDefaultName } from "../Alert";

import { Alert as AlertType } from "@/components/proptypes";

import "./Title.less";

export default function Title({ alert, editMode, name, onChange, children }) {
  const defaultName = getDefaultName(alert);
  return (
    <div className="alert-header">
      <div className="alert-title">
        <h3>
          {editMode && alert.query ? (
            // BUG: Input is not the same width as the container
            // TODO: consider adding a label (not obvious for sighted users)
            <Input
              className="f-inherit"
              placeholder={defaultName}
              value={name}
              aria-label={i18n.t("alerts.alertTitlePlaceholder")}
              onChange={e => onChange(e.target.value)}
            />
          ) : (
            name || defaultName
          )}
        </h3>
      </div>
      <div className="alert-actions">{children}</div>
    </div>
  );
}

Title.propTypes = {
  alert: AlertType.isRequired,
  name: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func,
  editMode: PropTypes.bool,
};

Title.defaultProps = {
  name: null,
  children: null,
  onChange: null,
  editMode: false,
};
