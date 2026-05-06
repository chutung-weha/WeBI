import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Modal from "antd/lib/modal";
import DynamicComponent from "@/components/DynamicComponent";
import InputWithCopy from "@/components/InputWithCopy";
import { UserProfile } from "@/components/proptypes";
import User from "@/services/user";
import useImmutableCallback from "@/lib/hooks/useImmutableCallback";
import { useUniqueId } from "@/lib/hooks/useUniqueId";

export default function ApiKeyForm(props) {
  const { t } = useTranslation();
  const { user, onChange } = props;

  const [loading, setLoading] = useState(false);
  const handleChange = useImmutableCallback(onChange);
  const apiKeyInputId = useUniqueId("apiKey");

  const regenerateApiKey = useCallback(() => {
    const doRegenerate = () => {
      setLoading(true);
      User.regenerateApiKey(user)
        .then(apiKey => {
          if (apiKey) {
            handleChange({ ...user, apiKey });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    };

    Modal.confirm({
      title: t("users.regenerateApiKey"),
      content: t("users.regenerateConfirm"),
      okText: t("users.regenerate"),
      onOk: doRegenerate,
      maskClosable: true,
      autoFocusButton: null,
    });
  }, [user, handleChange, t]);

  return (
    <DynamicComponent name="UserProfile.ApiKeyForm" {...props}>
      <Form layout="vertical">
        <hr />
        <Form.Item label={t("users.apiKey")} className="m-b-10">
          <InputWithCopy id={apiKeyInputId} className="hide-in-percy" value={user.apiKey} data-test="ApiKey" readOnly />
        </Form.Item>
        <Button className="w-100" onClick={regenerateApiKey} loading={loading} data-test="RegenerateApiKey">
          {t("users.regenerate")}
        </Button>
      </Form>
    </DynamicComponent>
  );
}

ApiKeyForm.propTypes = {
  user: UserProfile.isRequired,
  onChange: PropTypes.func,
};

ApiKeyForm.defaultProps = {
  onChange: () => {},
};
