import React, { useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Modal from 'react-modal';

import Page from "../components/Page";
import PhotoDetailsView from "../components/PhotoDetailsView";

function SearchBar(props) {
  const intl = useIntl();
  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg className="absolute w-16 h-16 top-16 left-16"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path d="M6.81,0a6.82,6.82,0,1,0,6.82,6.83h0A6.82,6.82,0,0,0,6.81,0Zm0,12.46a5.69,5.69,0,1,1,5.68-5.7v.06A5.68,5.68,0,0,1,6.81,12.46Zm9,2.2-3.1-3.1a7.74,7.74,0,0,1-.83.89L15,15.53a.6.6,0,0,0,.85,0,.6.6,0,0,0,0-.79Z"/>
      </svg>
      <input
        className="block w-full p-10 pl-48 pr-32 mt-48 text-center border border-gray-70 rounded-8"
        value={props.value}
        placeholder={intl.formatMessage({ id: 'photo.gallery.search.placeholder' })}
        onChange={(event) => {
          if (props.onChange) {
            props.onChange(event.target.value);
          }
        }}
      />
    </div>
  );
}

export default function ResourcesPublicationsPage(props) {
  const { pageContext } = props;
  const { pageData } = pageContext;
  const { galleryPhotos } = pageData;

  const [activeItem, setActiveItem] = useState(null);
  const [keyword, setKeyword] = useState('');

  const photos = useMemo(
    () => {
      if (!keyword) {
        return galleryPhotos;
      }
      return galleryPhotos.filter(
        ({
          title = '',
          description = '',
        }) => title.includes(keyword) || description.includes(keyword)
      );
    },
    [galleryPhotos, keyword],
  );

  return (
    <Page
      {...props}
      isEmpty={!galleryPhotos.length}
      emptyText={
        <FormattedMessage id="photo.gallery.list.empty" />
      }
    >
      <SearchBar value={keyword} onChange={setKeyword} />

      {!photos.length ? (
        <div className="font-serif font-light text-center py-72 text-36 text-gray-bc">
          <FormattedMessage id={keyword ? "list.empty" : "photo.gallery.list.empty"} />
        </div>
      ) : (
        <ul className="grid w-full max-w-screen-lg grid-cols-1 mx-auto mt-48 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-48">
          {photos.map((photo) => (
            <li key={photo.slug}>
              <button
                className="block w-full aspect-w-4 aspect-h-3"
                onClick={() => setActiveItem(photo)}
              >
                <img className="object-cover" src={photo.image} alt={photo.title} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <Modal
        isOpen={!!activeItem}
        closeTimeoutMS={200}
        style={{
          content: {
            zIndex: 100,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            padding: 0,
            border: 'none',
            borderRadius: 0,
            backgroundColor: 'transparent',
          },
          overlay: {
            zIndex: 20,
            backgroundColor: "transparent",
          },
        }}
      >
        {!!activeItem && (
          <PhotoDetailsView
            title={activeItem.title}
            src={activeItem.image}
            description={activeItem.description}
            onClose={() => setActiveItem(null)}
          />
        )}
      </Modal>
    </Page>
  );
}
