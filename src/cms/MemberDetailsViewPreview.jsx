import React from "react";

import IntlProvider from "../components/IntlProvider";
import MemberDetailsView from "../components/MemberDetailsView";

export default function MemberDetailsViewPreview({ entry }) {
  const title = entry.getIn(["data", "title"]);
  const alias = entry.getIn(["data", "alias"]);
  const photo = entry.getIn(["data", "photo"]);
  const gender = entry.getIn(["data", "gender"]);
  const role = entry.getIn(["data", "role"]);
  const position = entry.getIn(["data", "position"]);
  const description = entry.getIn(["data", "description"]);
  const thoughts = entry.getIn(["data", "thoughts"]);
  return (
    <IntlProvider language="zh">
      <MemberDetailsView
        title={title}
        alias={alias}
        photo={photo}
        gender={gender}
        role={role}
        position={position}
        description={description}
        thoughts={thoughts}
      />
    </IntlProvider>
  );
}
