import React from "react";
import { Link } from "gatsby";
import classNames from "classnames";

export function LanguageButton({
  className,
  path,
  locale,
  targetLocale,
  children,
  isDisabled = false,
  activeClass = 'border-b',
  hoverClass,
}) {
  return (
    <Link
      className={classNames(
        'language-button',
        className,
        'py-2 hover:opacity-100',
        'transition',
        'ease-in',
        locale === targetLocale ? activeClass : hoverClass || 'opacity-40',
        {
          'pointer-events-none': isDisabled,
        },
      )}
      to={path.replace(locale, targetLocale)}
    >{children}</Link>
  )
}

export default LanguageButton;
