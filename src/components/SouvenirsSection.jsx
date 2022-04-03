import React, { useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import classNames from "classnames";

import BlueButton from "./BlueButton";
import FormInput from "./FormInput";
import StrikethroughHeading from "./StrikethroughHeading";
import { SouvenirGallery } from "./SouvenirGallery";
import { SouvenirsSlideshow } from "./SouvenirsSlideshow";

function SouvenirSelectRow({ className, items, index, isHidden }) {
  const intl = useIntl();
  const [selectedItemCode, setSelectedItemCode] = useState('');
  const selectedItem = useMemo(
    () => items.find(item => item.slug === selectedItemCode),
    [items, selectedItemCode]
  );

  const handleSelectItemChange = (event) => {
    setSelectedItemCode(event.target.value);
  };
  return (
    <div className={classNames("flex items-stretch", className, isHidden ? 'h-0 overflow-hidden' : 'mt-20')}>
      <div className="relative flex-grow block w-full p-12 pl-24 text-center border pr-36 border-gray-70 text-14 rounded-8">
        <svg
          className="absolute w-12 h-12 transition-transform duration-300 transform right-16 top-16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 12 12"
        >
          <path
            d="M10.83 5.84L6 10.67 1.17 5.83M6 1.33v9.3"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {selectedItem ? (
          `${selectedItem.title} (${selectedItem.slug})`
        ) : (
          <FormattedMessage id="souvenir.placeholder.item" />
        )}
        <select
          className="absolute inset-0 w-full h-full opacity-0"
          name={`item-${index}`}
          placeholder={`${intl.formatMessage({ id: 'souvenir.placeholder.item' })}*`}
          required={index === 0}
          value={selectedItemCode}
          onChange={handleSelectItemChange}
          onBlur={handleSelectItemChange}
        >
          <option value="" disabled>
            {intl.formatMessage({ id: 'souvenir.placeholder.item' })}
          </option>
          {items.map(item => (
            <option
              key={item.slug}
              value={item.slug}
            >{item.title} ({item.slug})</option>
          ))}
        </select>
      </div>
      <FormInput
        className="ml-12"
        name={`quantity-${index}`}
        rows={6}
        type="number"
        min="1"
        placeholder={`${intl.formatMessage({ id: 'souvenir.placeholder.quantity' })}*`}
        required={!!selectedItemCode}
        style={{ maxWidth: 120 }}
      />
    </div>
  )
}

function SouvenirsForm(props) {
  const intl = useIntl();
  const items = props.items || [];
  const [visibleInputCount, setVisibleInputCount] = useState(1)

  return (
    <form
      className={props.className}
      name="sovenir"
      method="POST"
      netlify-honeypot="bot-field"
      data-netlify="true"
    >
      <input type="hidden" name="bot-field" />
      <input type="hidden" name="form-name" value="sovenir" />
      <div className="p-24">
        <FormInput
          name="name"
          placeholder={`${intl.formatMessage({ id: 'souvenir.placeholder.name' })}*`}
          required
        />
        <FormInput
          className="mt-20"
          type="email"
          name="email"
          placeholder={`${intl.formatMessage({ id: 'souvenir.placeholder.email' })}*`}
          required
        />
        <FormInput
          className="mt-20"
          type="tel"
          name="tel"
          placeholder={`${intl.formatMessage({ id: 'souvenir.placeholder.tel' })}*`}
          required
        />
        <FormInput
          className="mt-20"
          name="content"
          rows={6}
          placeholder={`${intl.formatMessage({ id: 'souvenir.placeholder.address' })}*`}
          required
        />
        {items.map((item, index) => (
          <SouvenirSelectRow
            key={item.slug}
            items={items}
            index={index}
            isHidden={index > visibleInputCount - 1}
          />
        ))}
        <div className={classNames("flex justify-start mt-10", { 'opacity-0 pointer-events-none': visibleInputCount === items.length })}>
          <button
            className="flex cursor-pointer text-14 text-primary"
            type="button"
            onClick={() => setVisibleInputCount(Math.min(visibleInputCount + 1, items.length))}
          >
            +{' '}
            <FormattedMessage id="souvenir.button.add" />
          </button>
        </div>
        <div className="justify-end mt-20 md:flex">
          <BlueButton
            className="justify-center w-full px-64 text-center md:w-auto"
            tagName="button"
            type="submit"
          >
            <FormattedMessage id="send" />
          </BlueButton>
        </div>
      </div>
    </form>
  );
}

function SouvenirGridItem({ code, title, image, price, gallery }) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <div className="aspect-w-1 aspect-h-1">
        <img
          className="object-cover w-full h-full cursor-pointer"
          src={image}
          alt={title}
          onClick={() => {
            setIsOpen(true)
          }}
        />
      </div>
      <div className="flex items-center justify-between mt-16 text-14">
        <FormattedMessage
          id="souvenir.code"
          values={{ code }}
        />
        <span className="font-bold text-primary text-24">${price}</span>
      </div>
      <div className="mt-8 font-bold text-18">{title}</div>
      <SouvenirGallery
        isOpen={isOpen}
        items={[image, ...gallery]}
        onClose={() => {
          setIsOpen(false)
        }}
      />
    </div>
  );
}

function SouvenirGrid(props) {
  const items = props.items || [];
  return (
    <div
      className={classNames(
        'grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-40',
        props.className
      )}
    >
      {items.map(({ slug, title, thumbnail, price, gallery }) => (
        <SouvenirGridItem
          key={slug}
          title={title}
          code={slug}
          image={thumbnail}
          price={price}
          gallery={gallery}
        />
      ))}
    </div>
  );
}

export default function SouvenirsSection(props) {
  return (
    <section className={props.className}>
      <StrikethroughHeading id="souvenirs" className="mb-72">{props.title}</StrikethroughHeading>

      <SouvenirsSlideshow
        className="-mx-16 mt-80 mb-96 md:-mx-60"
        items={props.items}
      />

      <SouvenirGrid
        className="w-full max-w-screen-lg mx-auto"
        items={props.items}
      />

      <div className="w-full max-w-screen-lg mx-auto md:flex mt-96">
        <div className="flex-grow w-full p-24 whitespace-pre-wrap">
          <h3 className="max-w-sm font-serif font-bold text-primary text-32">{props.contentTitle}</h3>
          <div className="mt-24">{props.content}</div>
        </div>

        <SouvenirsForm
          className="w-full max-w-lg mx-auto"
          items={props.items}
        />
      </div>

    </section>
  );
}
