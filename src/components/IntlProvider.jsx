import React from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import { Helmet } from "react-helmet";

import messages from "../intl";

export default function IntlProvider({ language, children }) {
  return (
    <ReactIntlProvider messages={messages[language]} locale={language} defaultLocale="zh">
      <Helmet htmlAttributes={{ lang: language }} />
      {children}
    </ReactIntlProvider>
  );
}
