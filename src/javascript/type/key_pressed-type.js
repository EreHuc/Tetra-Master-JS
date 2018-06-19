// @flow

export type KeyPressedEvent = KeyboardEvent & {
 keyPressed: Array<number>;
}

export type KeyPressedOptions = {
  selector?: ?string,
  keys?: ?Array<number>,
  triggerOnce?: ?boolean,
}
