import React from "react";
import PropTypes from "prop-types";
import i18n from "@/i18n";

import HelpTrigger from "@/components/HelpTrigger";
import { Alert as AlertType } from "@/components/proptypes";

import Form from "antd/lib/form";
import Button from "antd/lib/button";

import Title from "./components/Title";
import Criteria from "./components/Criteria";
import NotificationTemplate from "./components/NotificationTemplate";
import Rearm from "./components/Rearm";
import Query from "./components/Query";
import HorizontalFormItem from "./components/HorizontalFormItem";

export default class AlertNew extends React.Component {
  state = {
    saving: false,
  };

  save = () => {
    this.setState({ saving: true });
    this.props.save().catch(() => {
      this.setState({ saving: false });
    });
  };

  render() {
    const { alert, queryResult, pendingRearm, onNotificationTemplateChange } = this.props;
    const { onQuerySelected, onNameChange, onRearmChange, onCriteriaChange } = this.props;
    const { query, name, options } = alert;
    const { saving } = this.state;

    return (
      <>
        <Title alert={alert} name={name} onChange={onNameChange} editMode />
        <div className="bg-white tiled p-20">
          <div className="d-flex">
            <Form className="flex-fill">
              <div className="m-b-30">
                {i18n.t("alerts.startSelecting")}
                <br />
                {i18n.t("alerts.alertsNoParams")}
              </div>
              <HorizontalFormItem label={i18n.t("alerts.queryLabel")}>
                <Query query={query} queryResult={queryResult} onChange={onQuerySelected} editMode />
              </HorizontalFormItem>
              {queryResult && options && (
                <>
                  <HorizontalFormItem label={i18n.t("alerts.triggerWhen")} className="alert-criteria">
                    <Criteria
                      columnNames={queryResult.getColumnNames()}
                      resultValues={queryResult.getData()}
                      alertOptions={options}
                      onChange={onCriteriaChange}
                      editMode
                    />
                  </HorizontalFormItem>
                  <HorizontalFormItem label={i18n.t("alerts.whenTriggered")}>
                    <Rearm value={pendingRearm || 0} onChange={onRearmChange} editMode />
                  </HorizontalFormItem>
                  <HorizontalFormItem label={i18n.t("alerts.template")}>
                    <NotificationTemplate
                      alert={alert}
                      query={query}
                      columnNames={queryResult.getColumnNames()}
                      resultValues={queryResult.getData()}
                      subject={options.custom_subject}
                      setSubject={subject => onNotificationTemplateChange({ custom_subject: subject })}
                      body={options.custom_body}
                      setBody={body => onNotificationTemplateChange({ custom_body: body })}
                    />
                  </HorizontalFormItem>
                </>
              )}
              <HorizontalFormItem>
                <Button type="primary" onClick={this.save} disabled={!query} className="btn-create-alert">
                  {saving && (
                    <span role="status" aria-live="polite" aria-relevant="additions removals">
                      <i className="fa fa-spinner fa-pulse m-r-5" aria-hidden="true" />
                      <span className="sr-only">{i18n.t("alerts.saving")}</span>
                    </span>
                  )}
                  {i18n.t("alerts.createAlert")}
                </Button>
              </HorizontalFormItem>
            </Form>
            <HelpTrigger className="f-13" type="ALERT_SETUP">
              {i18n.t("alerts.setupInstructions")} <i className="fa fa-question-circle" aria-hidden="true" />
              <span className="sr-only">(help)</span>
            </HelpTrigger>
          </div>
        </div>
      </>
    );
  }
}

AlertNew.propTypes = {
  alert: AlertType.isRequired,
  queryResult: PropTypes.object, // eslint-disable-line react/forbid-prop-types,
  pendingRearm: PropTypes.number,
  onQuerySelected: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onRearmChange: PropTypes.func.isRequired,
  onCriteriaChange: PropTypes.func.isRequired,
  onNotificationTemplateChange: PropTypes.func.isRequired,
};

AlertNew.defaultProps = {
  queryResult: null,
  pendingRearm: null,
};
