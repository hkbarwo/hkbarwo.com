import React from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";

import messages from "../intl";

export default function IntlProvider({ language, children }) {
  return (
    <ReactIntlProvider messages={messages[language]} locale={language} defaultLocale="en">
      {children}
    </ReactIntlProvider>
  );
}
