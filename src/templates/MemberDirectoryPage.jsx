import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import Modal from 'react-modal';

import MemberDetailsView from "../components/MemberDetailsView";
import Page from "../components/Page";

export default function MemberDirectoryPage(props) {
  const { pageContext } = props;
  const { pageData } = pageContext;
  const { directory, members } = pageData;

  const [activeMember, setActiveMember] = useState(null);

  return (
    <Page {...props}>
      <ul className="mt-48">
        {directory.map(group => (
          <li key={group.key}>
            <h2 className="font-bold text-secondary mb-12">
              {!Number.isNaN(Number(group.key)) ? (
                <FormattedMessage
                  id="member.directory.header"
                  values={{
                    key: group.key,
                    stroke1: group.key,
                    stroke2: Number(group.key) + 4,
                  }}
                />
              ) : group.key}
            </h2>
            <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-40 gap-y-20 font-serif">
              {group.members.map(memberSlug => {
                const member = members[memberSlug];
                return (
                  <li key={memberSlug}>
                    <button
                      className="text-left leading-normal text-18 font-bold hover:text-primary"
                      onClick={() => setActiveMember(member)}
                    >{member.title}</button>
                  </li>
                );
              })}
            </ul>
            <hr className="my-32 border-gray-e5" />
          </li>
        ))}
      </ul>
      <div>
        <Modal
          isOpen={!!activeMember}
          style={{
            content: {
              zIndex: 100,
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              padding: 16,
              border: 'none',
              borderRadius: 0,
              backgroundColor: 'transparent',
            },
            overlay: {
              zIndex: 20,
              backgroundColor: "rgba(36, 36 ,36 , 0.8)",
            },
          }}
        >
          {!!activeMember && (
            <MemberDetailsView
              className="relative shadow-outline w-full mx-auto bg-white"
              {...activeMember}
              style={{ marginTop: 144, maxWidth: 800 }}
              onClose={() => setActiveMember(null)}
            />
          )}
        </Modal>
      </div>
    </Page>
  );
}
