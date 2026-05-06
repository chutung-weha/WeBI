import { includes } from "lodash";
import React, { useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";

import Alert from "antd/lib/alert";
import Link from "@/components/Link";
import routeWithUserSession from "@/components/ApplicationArea/routeWithUserSession";
import EmptyState, { EmptyStateHelpMessage } from "@/components/empty-state/EmptyState";
import DynamicComponent from "@/components/DynamicComponent";
import BeaconConsent from "@/components/BeaconConsent";
import PlainButton from "@/components/PlainButton";

import { axios } from "@/services/axios";
import recordEvent from "@/services/recordEvent";
import { messages } from "@/services/auth";
import notification from "@/services/notification";
import routes from "@/services/routes";

import { DashboardAndQueryFavoritesList } from "./components/FavoritesList";

import "./Home.less";

function DeprecatedEmbedFeatureAlert() {
  const { t } = useTranslation();
  return (
    <Alert
      className="m-b-15"
      type="warning"
      message={
        <>
          <Trans i18nKey="home.deprecatedEmbed" components={{ code: <code /> }} />{" "}
          <Link
            href="http://board.weha.vn/discuss/t/support-for-parameters-in-embedded-visualizations/3337"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("home.readMore")}
          </Link>
          .
        </>
      }
    />
  );
}

function EmailNotVerifiedAlert() {
  const { t } = useTranslation();
  const verifyEmail = () => {
    axios.post("verification_email/").then((data) => {
      notification.success(data.message);
    });
  };

  return (
    <Alert
      className="m-b-15"
      type="warning"
      message={
        <>
          {t("home.emailNotVerified")}{" "}
          <PlainButton type="link" onClick={verifyEmail}>
            {t("home.resendEmail")}
          </PlainButton>
          .
        </>
      }
    />
  );
}

export default function Home() {
  const { t } = useTranslation();
  useEffect(() => {
    recordEvent("view", "page", "personal_homepage");
  }, []);

  return (
    <div className="home-page">
      <div className="container">
        {includes(messages, "using-deprecated-embed-feature") && <DeprecatedEmbedFeatureAlert />}
        {includes(messages, "email-not-verified") && <EmailNotVerifiedAlert />}
        <DynamicComponent name="Home.EmptyState">
          <EmptyState
            header={t("home.welcome")}
            description={t("home.description")}
            illustration="dashboard"
            helpMessage={<EmptyStateHelpMessage helpTriggerType="GETTING_STARTED" />}
            showDashboardStep
            showInviteStep
            onboardingMode
          />
        </DynamicComponent>
        <DynamicComponent name="HomeExtra" />
        <DashboardAndQueryFavoritesList />
        <BeaconConsent />
      </div>
    </div>
  );
}

routes.register(
  "Home",
  routeWithUserSession({
    path: "/",
    title: "WE BOARD",
    render: (pageProps) => <Home {...pageProps} />,
  })
);
