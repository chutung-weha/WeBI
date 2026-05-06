import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import Alert from "antd/lib/alert";
import DynamicForm from "@/components/dynamic-form/DynamicForm";
import { wrap as wrapDialog, DialogPropType } from "@/components/DialogWrapper";
import recordEvent from "@/services/recordEvent";
import { useUniqueId } from "@/lib/hooks/useUniqueId";

function CreateUserDialog({ dialog }) {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  useEffect(() => {
    recordEvent("view", "page", "users/new");
  }, []);

  const formFields = useMemo(
    () => [
      { required: true, name: "name", title: t("users.name"), type: "text", autoFocus: true },
      { required: true, name: "email", title: t("users.email"), type: "email" },
    ],
    [t]
  );

  const handleSubmit = useCallback(values => dialog.close(values).catch(setError), [dialog]);
  const formId = useUniqueId("userForm");

  return (
    <Modal
      {...dialog.props}
      title={t("users.createUser")}
      footer={[
        <Button key="cancel" {...dialog.props.cancelButtonProps} onClick={dialog.dismiss}>
          {t("users.cancel")}
        </Button>,
        <Button
          key="submit"
          {...dialog.props.okButtonProps}
          htmlType="submit"
          type="primary"
          form={formId}
          data-test="SaveUserButton">
          {t("users.create")}
        </Button>,
      ]}
      wrapProps={{
        "data-test": "CreateUserDialog",
      }}>
      <DynamicForm id={formId} fields={formFields} onSubmit={handleSubmit} hideSubmitButton />
      {error && <Alert message={error.message} type="error" showIcon data-test="CreateUserErrorAlert" />}
    </Modal>
  );
}

CreateUserDialog.propTypes = {
  dialog: DialogPropType.isRequired,
};

export default wrapDialog(CreateUserDialog);
