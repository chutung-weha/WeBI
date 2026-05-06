import React, { useCallback, useEffect, useMemo, useRef } from "react";
import cx from "classnames";
import { useTranslation } from "react-i18next";

import routeWithUserSession from "@/components/ApplicationArea/routeWithUserSession";
import Link from "@/components/Link";
import PageHeader from "@/components/PageHeader";
import Paginator from "@/components/Paginator";
import DynamicComponent from "@/components/DynamicComponent";
import { QueryTagsControl } from "@/components/tags-control/TagsControl";
import SchedulePhrase from "@/components/queries/SchedulePhrase";

import { wrap as itemsList, ControllerType } from "@/components/items-list/ItemsList";
import useItemsListExtraActions from "@/components/items-list/hooks/useItemsListExtraActions";
import { ResourceItemsSource } from "@/components/items-list/classes/ItemsSource";
import { UrlStateStorage } from "@/components/items-list/classes/StateStorage";

import * as Sidebar from "@/components/items-list/components/Sidebar";
import ItemsTable, { Columns } from "@/components/items-list/components/ItemsTable";

import Layout from "@/components/layouts/ContentWithSidebar";

import { Query } from "@/services/query";
import { clientConfig, currentUser } from "@/services/auth";
import location from "@/services/location";
import routes from "@/services/routes";

import QueriesListEmptyState from "./QueriesListEmptyState";

import "./queries-list.css";

function buildSidebarMenu(t) {
  return [
    {
      key: "all",
      href: "queries",
      title: t("queries.all"),
      icon: () => <Sidebar.MenuIcon icon="fa fa-code" />,
    },
    {
      key: "my",
      href: "queries/my",
      title: t("queries.my"),
      icon: () => <Sidebar.ProfileImage user={currentUser} />,
    },
    {
      key: "favorites",
      href: "queries/favorites",
      title: t("queries.favorites"),
      icon: () => <Sidebar.MenuIcon icon="fa fa-star" />,
    },
    {
      key: "archive",
      href: "queries/archive",
      title: t("queries.archived"),
      icon: () => <Sidebar.MenuIcon icon="fa fa-archive" />,
    },
  ];
}

function buildListColumns(t) {
  return [
    Columns.favorites({ className: "p-r-0" }),
    Columns.custom.sortable(
      (text, item) => (
        <React.Fragment>
          <Link className="table-main-title" href={"queries/" + item.id}>
            {item.name}
          </Link>
          <QueryTagsControl className="d-block" tags={item.tags} isDraft={item.is_draft} isArchived={item.is_archived} />
        </React.Fragment>
      ),
      {
        title: t("queries.name"),
        field: "name",
        width: null,
      }
    ),
    Columns.custom((text, item) => item.user.name, { title: t("queries.createdBy"), width: "1%" }),
    Columns.dateTime.sortable({ title: t("queries.createdAt"), field: "created_at", width: "1%" }),
    Columns.dateTime.sortable({
      title: t("queries.lastExecutedAt"),
      field: "retrieved_at",
      orderByField: "executed_at",
      width: "1%",
    }),
    Columns.custom.sortable((text, item) => <SchedulePhrase schedule={item.schedule} isNew={item.isNew()} />, {
      title: t("queries.schedule"),
      field: "schedule",
      width: "1%",
    }),
  ];
}

function QueriesListExtraActions(props) {
  return <DynamicComponent name="QueriesList.Actions" {...props} />;
}

function QueriesList({ controller }) {
  const { t, i18n: i18nInstance } = useTranslation();
  const sidebarMenu = useMemo(() => buildSidebarMenu(t), [t, i18nInstance.language]);
  const baseListColumns = useMemo(() => buildListColumns(t), [t, i18nInstance.language]);
  const controllerRef = useRef();
  controllerRef.current = controller;

  const updateSearch = useCallback(
    (searchTemm) => {
      controller.updateSearch(searchTemm, { isServerSideFTS: !clientConfig.multiByteSearchEnabled });
    },
    [controller]
  );

  useEffect(() => {
    const unlistenLocationChanges = location.listen((unused, action) => {
      const searchTerm = location.search.q || "";
      if (action === "PUSH" && searchTerm !== controllerRef.current.searchTerm) {
        updateSearch(searchTerm);
      }
    });

    return () => {
      unlistenLocationChanges();
    };
  }, [updateSearch]);

  let usedListColumns = baseListColumns;
  if (controller.params.currentPage === "favorites") {
    usedListColumns = [
      ...usedListColumns,
      Columns.dateTime.sortable({ title: t("queries.starredAt"), field: "starred_at", width: "1%" }),
    ];
  }
  const {
    areExtraActionsAvailable,
    listColumns: tableColumns,
    Component: ExtraActionsComponent,
    selectedItems,
  } = useItemsListExtraActions(controller, usedListColumns, QueriesListExtraActions);

  return (
    <div className="page-queries-list">
      <div className="container">
        <PageHeader
          title={
            {
              all: t("queries.pageTitle"),
              favorites: t("queries.favoritesTitle"),
              my: t("queries.myTitle"),
              archive: t("queries.archivedTitle"),
            }[controller.params.currentPage] || controller.params.pageTitle
          }
          actions={
            currentUser.hasPermission("create_query") ? (
              <Link.Button block type="primary" href="queries/new">
                <i className="fa fa-plus m-r-5" aria-hidden="true" />
                {t("queries.newQuery")}
              </Link.Button>
            ) : null
          }
        />
        <Layout>
          <Layout.Sidebar className="m-b-0">
            <Sidebar.SearchInput
              placeholder={t("queries.search")}
              label={t("queries.searchLabel")}
              value={controller.searchTerm}
              onChange={updateSearch}
            />
            <Sidebar.Menu items={sidebarMenu} selected={controller.params.currentPage} />
            <Sidebar.Tags url="api/queries/tags" onChange={controller.updateSelectedTags} showUnselectAll />
          </Layout.Sidebar>
          <Layout.Content>
            {controller.isLoaded && controller.isEmpty ? (
              <QueriesListEmptyState
                page={controller.params.currentPage}
                searchTerm={controller.searchTerm}
                selectedTags={controller.selectedTags}
              />
            ) : (
              <React.Fragment>
                <div className={cx({ "m-b-10": areExtraActionsAvailable })}>
                  <ExtraActionsComponent selectedItems={selectedItems} />
                </div>
                <div className="bg-white tiled table-responsive">
                  <ItemsTable
                    items={controller.pageItems}
                    loading={!controller.isLoaded}
                    columns={tableColumns}
                    orderByField={controller.orderByField}
                    orderByReverse={controller.orderByReverse}
                    toggleSorting={controller.toggleSorting}
                    setSorting={controller.setSorting}
                  />
                  <Paginator
                    showPageSizeSelect
                    totalCount={controller.totalItemsCount}
                    pageSize={controller.itemsPerPage}
                    onPageSizeChange={(itemsPerPage) => controller.updatePagination({ itemsPerPage })}
                    page={controller.page}
                    onChange={(page) => controller.updatePagination({ page })}
                  />
                </div>
              </React.Fragment>
            )}
          </Layout.Content>
        </Layout>
      </div>
    </div>
  );
}

QueriesList.propTypes = {
  controller: ControllerType.isRequired,
};

const QueriesListPage = itemsList(
  QueriesList,
  () =>
    new ResourceItemsSource({
      getResource({ params: { currentPage } }) {
        return {
          all: Query.query.bind(Query),
          my: Query.myQueries.bind(Query),
          favorites: Query.favorites.bind(Query),
          archive: Query.archive.bind(Query),
        }[currentPage];
      },
      getItemProcessor() {
        return (item) => new Query(item);
      },
    }),
  ({ ...props }) => new UrlStateStorage({ orderByField: props.orderByField ?? "created_at", orderByReverse: true })
);

routes.register(
  "Queries.List",
  routeWithUserSession({
    path: "/queries",
    title: "Queries",
    render: (pageProps) => <QueriesListPage {...pageProps} currentPage="all" />,
  })
);
routes.register(
  "Queries.Favorites",
  routeWithUserSession({
    path: "/queries/favorites",
    title: "Favorite Queries",
    render: (pageProps) => <QueriesListPage {...pageProps} currentPage="favorites" orderByField="starred_at" />,
  })
);
routes.register(
  "Queries.Archived",
  routeWithUserSession({
    path: "/queries/archive",
    title: "Archived Queries",
    render: (pageProps) => <QueriesListPage {...pageProps} currentPage="archive" />,
  })
);
routes.register(
  "Queries.My",
  routeWithUserSession({
    path: "/queries/my",
    title: "My Queries",
    render: (pageProps) => <QueriesListPage {...pageProps} currentPage="my" />,
  })
);
