import React, { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import Card from "antd/lib/card";
import Button from "antd/lib/button";
import Typography from "antd/lib/typography";
import { clientConfig } from "@/services/auth";
import Link from "@/components/Link";
import HelpTrigger from "@/components/HelpTrigger";
import DynamicComponent from "@/components/DynamicComponent";
import OrgSettings from "@/services/organizationSettings";

const Text = Typography.Text;

function BeaconConsent() {
  const { t } = useTranslation();
  const [hide, setHide] = useState(false);

  if (!clientConfig.showBeaconConsentMessage || hide) {
    return null;
  }

  const hideConsentCard = () => {
    clientConfig.showBeaconConsentMessage = false;
    setHide(true);
  };

  const confirmConsent = (confirm) => {
    let message = "🙏 Thank you.";

    if (!confirm) {
      message = "Settings Saved.";
    }

    OrgSettings.save({ beacon_consent: confirm }, message)
      // .then(() => {
      //   // const settings = get(response, 'settings');
      //   // this.setState({ settings, formValues: { ...settings } });
      // })
      .finally(hideConsentCard);
  };

  return (
    <DynamicComponent name="BeaconConsent">
      <div className="m-t-10 tiled">
        <Card
          title={
            <>
              {t("beacon.title")}{" "}
              <HelpTrigger type="USAGE_DATA_SHARING" />
            </>
          }
          bordered={false}
        >
          <Text>{t("beacon.description")}</Text>
          <div className="m-t-5">
            <ul>
              <li> {t("beacon.item1")}</li>
              <li> {t("beacon.item2")}</li>
            </ul>
          </div>
          <Text>{t("beacon.aggregated")}</Text>
          <div className="m-t-5">
            <Button type="primary" className="m-r-5" onClick={() => confirmConsent(true)}>
              {t("common.yes")}
            </Button>
            <Button type="default" onClick={() => confirmConsent(false)}>
              {t("common.no")}
            </Button>
          </div>
          <div className="m-t-15">
            <Text type="secondary">
              <Trans
                i18nKey="beacon.settingsHint"
                components={{ link: <Link href="settings/general" /> }}
              />
            </Text>
          </div>
        </Card>
      </div>
    </DynamicComponent>
  );
}

export default BeaconConsent;
