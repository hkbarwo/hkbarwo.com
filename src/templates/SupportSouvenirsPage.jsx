import React from "react";

import Page from "../components/Page";
import SouvenirsSection from "../components/SouvenirsSection";

export default function SupportSouvenirsPage(props) {
  const { pageContext } = props;
  const { pageData } = pageContext;
  return (
    <Page {...props} isShowTitle={false}>
      <SouvenirsSection {...pageData} />
    </Page>
  )
}
