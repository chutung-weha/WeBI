import { get, find, toUpper } from "lodash";
import React from "react";
import PropTypes from "prop-types";
import i18n from "@/i18n";

import Modal from "antd/lib/modal";
import routeWithUserSession from "@/components/ApplicationArea/routeWithUserSession";
import navigateTo from "@/components/ApplicationArea/navigateTo";
import LoadingState from "@/components/items-list/components/LoadingState";
import DynamicForm from "@/components/dynamic-form/DynamicForm";
import helper from "@/components/dynamic-form/dynamicFormHelper";
import HelpTrigger, { TYPES as HELP_TRIGGER_TYPES } from "@/components/HelpTrigger";
import wrapSettingsTab from "@/components/SettingsWrapper";

import DataSource, { IMG_ROOT } from "@/services/data-source";
import notification from "@/services/notification";
import routes from "@/services/routes";

class EditDataSource extends React.Component {
  static propTypes = {
    dataSourceId: PropTypes.string.isRequired,
    onError: PropTypes.func,
  };

  static defaultProps = {
    onError: () => {},
  };

  state = {
    dataSource: null,
    type: null,
    loading: true,
  };

  componentDidMount() {
    DataSource.get({ id: this.props.dataSourceId })
      .then(dataSource => {
        const { type } = dataSource;
        this.setState({ dataSource });
        DataSource.types().then(types => this.setState({ type: find(types, { type }), loading: false }));
      })
      .catch(error => this.props.onError(error));
  }

  saveDataSource = (values, successCallback, errorCallback) => {
    const { dataSource } = this.state;
    helper.updateTargetWithValues(dataSource, values);
    DataSource.save(dataSource)
      .then(() => successCallback(i18n.t("dataSources.saved")))
      .catch(error => {
        const message = get(error, "response.data.message", i18n.t("dataSources.savedFailed"));
        errorCallback(message);
      });
  };

  deleteDataSource = callback => {
    const { dataSource } = this.state;

    const doDelete = () => {
      DataSource.delete(dataSource)
        .then(() => {
          notification.success(i18n.t("dataSources.deleted"));
          navigateTo("data_sources");
        })
        .catch(() => {
          callback();
        });
    };

    Modal.confirm({
      title: i18n.t("dataSources.deleteDataSource"),
      content: i18n.t("dataSources.deleteDataSourceConfirm"),
      okText: i18n.t("dataSources.delete"),
      okType: "danger",
      onOk: doDelete,
      onCancel: callback,
      maskClosable: true,
      autoFocusButton: null,
    });
  };

  testConnection = callback => {
    const { dataSource } = this.state;
    DataSource.test({ id: dataSource.id })
      .then(httpResponse => {
        if (httpResponse.ok) {
          notification.success(i18n.t("dataSources.connectionSuccess"));
        } else {
          notification.error(i18n.t("dataSources.connectionFailed", { message: httpResponse.message }), "", { duration: 10 });
        }
        callback();
      })
      .catch(() => {
        notification.error(i18n.t("dataSources.connectionFailedUnknown"), "", { duration: 10 });
        callback();
      });
  };

  renderForm() {
    const { dataSource, type } = this.state;
    const fields = helper.getFields(type, dataSource);
    const helpTriggerType = `DS_${toUpper(type.type)}`;
    const formProps = {
      fields,
      type,
      actions: [
        { name: i18n.t("dataSources.delete"), type: "danger", callback: this.deleteDataSource },
        { name: i18n.t("dataSources.testConnection"), pullRight: true, callback: this.testConnection, disableWhenDirty: true },
      ],
      onSubmit: this.saveDataSource,
      feedbackIcons: true,
      defaultShowExtraFields: helper.hasFilledExtraField(type, dataSource),
    };

    return (
      <div className="row" data-test="DataSource">
        <div className="text-right m-r-10">
          {HELP_TRIGGER_TYPES[helpTriggerType] && (
            <HelpTrigger className="f-13" type={helpTriggerType}>
              {i18n.t("dataSources.setupInstructions")} <i className="fa fa-question-circle" aria-hidden="true" />
              <span className="sr-only">(help)</span>
            </HelpTrigger>
          )}
        </div>
        <div className="text-center m-b-10">
          <img className="p-5" src={`${IMG_ROOT}/${type.type}.png`} alt={type.name} width="64" />
          <h3 className="m-0">{type.name}</h3>
        </div>
        <div className="col-md-4 col-md-offset-4 m-b-10">
          <DynamicForm {...formProps} />
        </div>
      </div>
    );
  }

  render() {
    return this.state.loading ? <LoadingState className="" /> : this.renderForm();
  }
}

const EditDataSourcePage = wrapSettingsTab("DataSources.Edit", null, EditDataSource);

routes.register(
  "DataSources.Edit",
  routeWithUserSession({
    path: "/data_sources/:dataSourceId",
    title: "Data Sources",
    render: pageProps => <EditDataSourcePage {...pageProps} />,
  })
);
