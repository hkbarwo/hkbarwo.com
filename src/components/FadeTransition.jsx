import React from "react";
import {
  SwitchTransition,
  Transition,
} from 'react-transition-group';

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

export default function FadeTransition({ transitionKey, children }) {
  return (
    <SwitchTransition>
      <Transition
        key={transitionKey}
        in={true}
        timeout={300}
      >
        {state => children(transitionStyles[state])}
      </Transition>
    </SwitchTransition>
  )
}
