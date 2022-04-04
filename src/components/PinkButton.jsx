import React from 'react';
import classNames from 'classnames';
import Link from './Link';

export function PinkButton({ isActive, className, children, ...props }) {
  return (
    <Link
      className={classNames(
        'block min-w-144 text-center rounded-8 border border-tertiary px-14 py-8 hover:bg-tertiary hover:text-white active:bg-tertiary transition-colors duration-300',
        isActive ? 'bg-tertiary-dark text-white hover:bg-tertiary' : 'text-tertiary',
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
