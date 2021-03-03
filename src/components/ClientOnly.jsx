import { createElement, Fragment } from "react";

import useClientOnly from "../utils/react-hooks/useClientOnly";

export default function ClientOnly({ children }) {
  const hasMounted = useClientOnly();

  if (!hasMounted) {
    return null;
  }

  return createElement(Fragment, { children });
}
