import React from "react";

import StrikethroughHeading from "./StrikethroughHeading";

export default function CreditsSection(props) {
  const items = props.items || [];
  return (
    <section className={props.className}>
      <StrikethroughHeading className="mb-72">{props.title}</StrikethroughHeading>

      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-72 gap-y-48 max-w-screen-lg w-full mx-auto">
        {items.map(logo => (
          <li className="flex justify-center items-center">
            <img 
              className="block w-full"
              src={logo}
              alt=""
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
