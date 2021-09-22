import React from "react";
import AniLink from "gatsby-plugin-transition-link/AniLink"

export default function Link(props) {
  return (
    <AniLink
      cover
      direction="bottom"
      duration={1}
      top="exit"
      bg="
        url('/images/bg/pattern-light.svg')
        center / 32px 27px
        repeat
        fixed
        padding-box
        content-box
        #caa846
      "
      {...props}
    />
  );
}
