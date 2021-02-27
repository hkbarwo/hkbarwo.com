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

export default function FadeTransition({ inProp = true, transitionKey, children }) {
  if (transitionKey) {
    return (
      <SwitchTransition>
        <Transition
          key={transitionKey}
          in={inProp}
          timeout={300}
        >
          {state => children({
            style: transitionStyles[state],
            state,
          })}
        </Transition>
      </SwitchTransition>
    );
  }
  return (
    <Transition
      in={inProp}
      timeout={300}
    >
      {state => children({
        style: transitionStyles[state],
        state,
      })}
    </Transition>
  );
}
