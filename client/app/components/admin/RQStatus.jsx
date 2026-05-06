import { map } from "lodash";
import React from "react";
import PropTypes from "prop-types";
import i18n from "@/i18n";

import Badge from "antd/lib/badge";
import Card from "antd/lib/card";
import Spin from "antd/lib/spin";
import Table from "antd/lib/table";
import { Columns } from "@/components/items-list/components/ItemsTable";

// CounterCard

export function CounterCard({ title, value, loading }) {
  return (
    <Spin spinning={loading}>
      <Card>
        {title}
        <div className="f-20">{value}</div>
      </Card>
    </Spin>
  );
}

CounterCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  loading: PropTypes.bool.isRequired,
};

CounterCard.defaultProps = {
  value: "",
};

// Tables

const queryJobsColumns = [
  { title: i18n.t("admin.queue"), dataIndex: "origin" },
  { title: i18n.t("admin.queryId"), dataIndex: ["meta", "query_id"] },
  { title: i18n.t("admin.orgId"), dataIndex: ["meta", "org_id"] },
  { title: i18n.t("admin.dataSourceId"), dataIndex: ["meta", "data_source_id"] },
  { title: i18n.t("admin.userId"), dataIndex: ["meta", "user_id"] },
  Columns.custom(scheduled => scheduled.toString(), { title: i18n.t("admin.scheduled"), dataIndex: ["meta", "scheduled"] }),
  Columns.timeAgo({ title: i18n.t("admin.startTime"), dataIndex: "started_at" }),
  Columns.timeAgo({ title: i18n.t("admin.enqueueTime"), dataIndex: "enqueued_at" }),
];

const otherJobsColumns = [
  { title: i18n.t("admin.queue"), dataIndex: "origin" },
  { title: i18n.t("admin.jobName"), dataIndex: "name" },
  Columns.timeAgo({ title: i18n.t("admin.startTime"), dataIndex: "started_at" }),
  Columns.timeAgo({ title: i18n.t("admin.enqueueTime"), dataIndex: "enqueued_at" }),
];

const workerColumnDefs = [
  ["Hostname", "hostname", "admin.hostname"],
  ["PID", "pid", "admin.pid"],
  ["Name", "name", "admin.name"],
  ["Queues", "queues", "admin.queues"],
  ["Current Job", "current_job", "admin.currentJob"],
  ["Successful Jobs", "successful_jobs", "admin.successfulJobs"],
  ["Failed Jobs", "failed_jobs", "admin.failedJobs"],
];

const workersColumns = [
  Columns.custom(
    value => (
      <span>
        <Badge status={{ busy: "processing", idle: "default", started: "success", suspended: "warning" }[value]} />{" "}
        {value}
      </span>
    ),
    { title: i18n.t("admin.state"), dataIndex: "state" }
  ),
]
  .concat(
    workerColumnDefs.map(([, dataIndex, key]) => ({
      title: i18n.t(key),
      dataIndex,
    }))
  )
  .concat([
    Columns.dateTime({ title: i18n.t("admin.birthDate"), dataIndex: "birth_date" }),
    Columns.duration({ title: i18n.t("admin.totalWorkingTime"), dataIndex: "total_working_time" }),
  ]);

const queuesColumns = [
  { title: i18n.t("admin.name"), dataIndex: "name" },
  { title: i18n.t("admin.started"), dataIndex: "started" },
  { title: "Queued", dataIndex: "queued" },
];

const TablePropTypes = {
  loading: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export function WorkersTable({ loading, items }) {
  return (
    <Table
      loading={loading}
      columns={workersColumns}
      rowKey="name"
      dataSource={items}
      pagination={{
        defaultPageSize: 25,
        pageSizeOptions: ["10", "25", "50"],
        showSizeChanger: true,
      }}
    />
  );
}

WorkersTable.propTypes = TablePropTypes;

export function QueuesTable({ loading, items }) {
  return (
    <Table
      loading={loading}
      columns={queuesColumns}
      rowKey="name"
      dataSource={items}
      pagination={{
        defaultPageSize: 25,
        pageSizeOptions: ["10", "25", "50"],
        showSizeChanger: true,
      }}
    />
  );
}

QueuesTable.propTypes = TablePropTypes;

export function QueryJobsTable({ loading, items }) {
  return (
    <Table
      loading={loading}
      columns={queryJobsColumns}
      rowKey="id"
      dataSource={items}
      pagination={{
        defaultPageSize: 25,
        pageSizeOptions: ["10", "25", "50"],
        showSizeChanger: true,
      }}
    />
  );
}

QueryJobsTable.propTypes = TablePropTypes;

export function OtherJobsTable({ loading, items }) {
  return (
    <Table
      loading={loading}
      columns={otherJobsColumns}
      rowKey="id"
      dataSource={items}
      pagination={{
        defaultPageSize: 25,
        pageSizeOptions: ["10", "25", "50"],
        showSizeChanger: true,
      }}
    />
  );
}

OtherJobsTable.propTypes = TablePropTypes;
