import { isEmpty, join } from "lodash";
import React from "react";
import { useTranslation, Trans } from "react-i18next";
import Form from "antd/lib/form";
import Select from "antd/lib/select";
import Alert from "antd/lib/alert";
import DynamicComponent from "@/components/DynamicComponent";
import { clientConfig } from "@/services/auth";
import { SettingsEditorPropTypes, SettingsEditorDefaultProps } from "../prop-types";

export default function GoogleLoginSettings(props) {
  const { t } = useTranslation();
  const { values, onChange } = props;

  if (!clientConfig.googleLoginEnabled) {
    return null;
  }

  return (
    <DynamicComponent name="OrganizationSettings.GoogleLoginSettings" {...props}>
      <h4>{t("auth.googleLogin")}</h4>
      <Form.Item label={t("auth.allowedDomains")}>
        <Select
          mode="tags"
          value={values.auth_google_apps_domains}
          onChange={value => onChange({ auth_google_apps_domains: value })}
        />
        {!isEmpty(values.auth_google_apps_domains) && (
          <Alert
            message={
              <p>
                <Trans
                  i18nKey="auth.googleLoginHelp"
                  values={{ domains: join(values.auth_google_apps_domains, ", ") }}
                  components={{ strong: <strong /> }}
                />
              </p>
            }
            className="m-t-15"
          />
        )}
      </Form.Item>
    </DynamicComponent>
  );
}

GoogleLoginSettings.propTypes = SettingsEditorPropTypes;

GoogleLoginSettings.defaultProps = SettingsEditorDefaultProps;
