import React from "react";
import { useTranslation } from "react-i18next";
import Alert from "antd/lib/alert";
import Form from "antd/lib/form";
import Checkbox from "antd/lib/checkbox";
import Tooltip from "@/components/Tooltip";
import Skeleton from "antd/lib/skeleton";
import DynamicComponent from "@/components/DynamicComponent";
import { clientConfig } from "@/services/auth";
import { SettingsEditorPropTypes, SettingsEditorDefaultProps } from "../prop-types";

export default function PasswordLoginSettings(props) {
  const { t } = useTranslation();
  const { settings, values, onChange, loading } = props;

  const isTheOnlyAuthMethod =
    !clientConfig.googleLoginEnabled && !clientConfig.ldapLoginEnabled && !values.auth_saml_enabled;

  return (
    <DynamicComponent name="OrganizationSettings.PasswordLoginSettings" {...props}>
      {!loading && !settings.auth_password_login_enabled && (
        <Alert
          message={t("auth.passwordLoginDisabled")}
          type="warning"
          className="m-t-15 m-b-15"
        />
      )}
      <Form.Item label={t("auth.passwordLogin")}>
        {loading ? (
          <Skeleton title={{ width: 300 }} paragraph={false} active />
        ) : (
          <Checkbox
            checked={values.auth_password_login_enabled}
            disabled={isTheOnlyAuthMethod}
            onChange={e => onChange({ auth_password_login_enabled: e.target.checked })}>
            <Tooltip
              title={
                isTheOnlyAuthMethod ? t("auth.passwordLoginCanDisable") : null
              }
              placement="right">
              {t("auth.passwordLoginEnabled")}
            </Tooltip>
          </Checkbox>
        )}
      </Form.Item>
    </DynamicComponent>
  );
}

PasswordLoginSettings.propTypes = SettingsEditorPropTypes;

PasswordLoginSettings.defaultProps = SettingsEditorDefaultProps;
