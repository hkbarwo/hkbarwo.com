import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import Modal from 'react-modal';

import Page from "../components/Page";

export default function MemberDirectoryPage(props) {
  const { pageContext } = props;
  const { pageData } = pageContext;
  const { directory, members } = pageData;

  const [activeMember, setActiveMember] = useState(null);

  return (
    <Page {...props}>
      <ul>
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
            <div
              className="relative shadow-outline md:flex items-start w-full mx-auto bg-white"
              style={{ marginTop: 144, maxWidth: 800 }}
            >
              <div className="p-20 sm:p-40">
                <img
                  src={activeMember.photo}
                  alt={activeMember.title}
                  style={{ width: 190 }}
                />
              </div>
              <div className="grid grid-cols-2 flex-grow p-20 sm:p-40 gap-x-10 gap-y-32">
                <div className="col-span-1">
                  <h3 className="text-secondary text-14 font-bold">
                    <FormattedMessage id="member.directory.name" />
                  </h3>
                  <div>{activeMember.title}</div>
                </div>
                <div className="col-span-1">
                  <h3 className="text-secondary text-14 font-bold">
                    <FormattedMessage id="member.directory.gender" />
                  </h3>
                  <div>
                    <FormattedMessage
                      id={activeMember.gender === 'm'
                        ? 'member.directory.gender.male'
                        : 'member.directory.gender.female'
                      }
                    />
                  </div>
                </div>
                {activeMember.alias && (
                  <div className="col-span-1">
                    <h3 className="text-secondary text-14 font-bold">
                      <FormattedMessage id="member.directory.alias" />
                    </h3>
                    <div>{activeMember.alias}</div>
                  </div>
                )}
                <div className="col-span-1">
                  <h3 className="text-secondary text-14 font-bold">
                    <FormattedMessage id="member.directory.role" />
                  </h3>
                  <div>{activeMember.role}</div>
                </div>
                <div className="col-span-full">
                  <h3 className="text-secondary text-14 font-bold">
                    <FormattedMessage id="member.directory.position" />
                  </h3>
                  <div>{activeMember.position}</div>
                </div>
                {activeMember.description && (
                  <div className="col-span-full">
                    <h3 className="text-secondary text-14 font-bold">
                      <FormattedMessage id="member.directory.description" />
                    </h3>
                    <div>{activeMember.description}</div>
                  </div>
                )}
                {activeMember.thoughts && (
                  <div className="col-span-full">
                    <h3 className="text-secondary text-14 font-bold">
                      <FormattedMessage id="member.directory.thoughts" />
                    </h3>
                    <div>{activeMember.thoughts}</div>
                  </div>
                )}
              </div>
              <button
                className="absolute top-20 right-20 sm:top-36 sm:right-36 block w-28 h-28"
                onClick={() => setActiveMember(null)}
              >
                <svg className="inset-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
                  <path d="M27,1,1,27M1,1,27,27" fill="none" stroke="currentColor"/>
                </svg>
              </button>
            </div>
          )}
        </Modal>
      </div>
    </Page>
  );
}
