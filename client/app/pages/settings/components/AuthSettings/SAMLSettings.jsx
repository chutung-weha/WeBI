import React from "react";
import { useTranslation } from "react-i18next";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Skeleton from "antd/lib/skeleton";
import Radio from "antd/lib/radio";
import DynamicComponent from "@/components/DynamicComponent";
import { SettingsEditorPropTypes, SettingsEditorDefaultProps } from "../prop-types";

export default function SAMLSettings(props) {
  const { t } = useTranslation();
  const { values, onChange, loading } = props;

  const onChangeEnabledStatus = e => {
    const updates = { auth_saml_enabled: !!e.target.value };
    if (e.target.value) {
      updates.auth_saml_type = e.target.value;
    }
    onChange(updates);
  };

  return (
    <DynamicComponent name="OrganizationSettings.SAMLSettings" {...props}>
      <h4>{t("auth.saml")}</h4>
      <Form.Item label={t("auth.samlEnabled")}>
        {loading ? (
          <Skeleton title={{ width: 300 }} paragraph={false} active />
        ) : (
          <Radio.Group
            onChange={onChangeEnabledStatus}
            value={values.auth_saml_enabled && (values.auth_saml_type || "dynamic")}>
            <Radio value={false}>{t("auth.samlDisabled")}</Radio>
            <Radio value={"static"}>{t("auth.samlEnabledStatic")}</Radio>
            <Radio value={"dynamic"}>{t("auth.samlEnabledDynamic")}</Radio>
          </Radio.Group>
        )}
      </Form.Item>
      {values.auth_saml_enabled && (
        <>
          {values.auth_saml_type === "static" && (
            <>
              <Form.Item label={t("auth.samlSsoUrl")}>
                <Input
                  value={values.auth_saml_sso_url}
                  onChange={e => onChange({ auth_saml_sso_url: e.target.value })}
                />
              </Form.Item>
              <Form.Item label={t("auth.samlEntityId")}>
                <Input
                  value={values.auth_saml_entity_id}
                  onChange={e => onChange({ auth_saml_entity_id: e.target.value })}
                />
              </Form.Item>
              <Form.Item label={t("auth.samlCert")}>
                <Input
                  value={values.auth_saml_x509_cert}
                  onChange={e => onChange({ auth_saml_x509_cert: e.target.value })}
                />
              </Form.Item>
            </>
          )}
          {values.auth_saml_type === "dynamic" && (
            <>
              <Form.Item label={t("auth.samlMetadataUrl")}>
                <Input
                  value={values.auth_saml_metadata_url}
                  onChange={e => onChange({ auth_saml_metadata_url: e.target.value })}
                />
              </Form.Item>
              <Form.Item label={t("auth.samlEntityId")}>
                <Input
                  value={values.auth_saml_entity_id}
                  onChange={e => onChange({ auth_saml_entity_id: e.target.value })}
                />
              </Form.Item>
              <Form.Item label={t("auth.samlNameIdFormat")}>
                <Input
                  value={values.auth_saml_nameid_format}
                  onChange={e => onChange({ auth_saml_nameid_format: e.target.value })}
                />
              </Form.Item>
            </>
          )}
        </>
      )}
    </DynamicComponent>
  );
}

SAMLSettings.propTypes = SettingsEditorPropTypes;

SAMLSettings.defaultProps = SettingsEditorDefaultProps;
