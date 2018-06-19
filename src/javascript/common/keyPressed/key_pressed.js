// @flow
/* eslint-disable no-console,no-use-before-define */

import type { KeyPressedEvent, KeyPressedOptions } from '../../type/key_pressed-type';

const keyPressedClass = (defaultOptions: KeyPressedOptions = {}) => {
  const prop: WeakMap<KeyPressed, KpUtils> = new WeakMap();

  class KpUtils {
    selector: ?string;
    keys: Array<number>;
    triggerOnce: boolean;
    element: EventTarget;
    stack: Object;
    globalKeyEvents: Object;
    upKeyEvents: Object;
    downKeyEvents: Object;
    addEventHandler: Function;
    globalEventHandler: Function;
    removeEventHandler: Function;

    constructor(options: KeyPressedOptions = {}) {
      this.setGlobalEventHandler();
      this.setAddEventHandler();
      this.setRemoveEventHandler();
      this.stack = {};
      this.keys = [];
      this.globalKeyEvents = {};
      this.upKeyEvents = {};
      this.downKeyEvents = {};
      this.selector = typeof options.selector === 'string' ? options.selector : null;
      this.keys = (typeof options.keys === 'object' && !(options.keys === null || options.keys === undefined)) ? options.keys : [];
      this.triggerOnce = typeof options.triggerOnce === 'boolean' ? options.triggerOnce : false;
      if (this.selector) {
        this.element = (document.querySelector(this.selector): any);
        if (this.element === null) {
          throw new Error('keyPressedClass : Valid selector is required');
        }
      } else {
        this.element = (document.querySelector('body'): any);
      }
      this.setKeyEvent();
    }

    setKeyEvent() {
      const keyupEvent = (e: KeyPressedEvent) => {
        const key: number = e.keyCode;
        if (!this.keys.length || this.keys.indexOf(key) > -1) {
          if (!this.triggerOnce || this.getKeyPressed().indexOf(key) > -1) {
            this.remove(key, e);
          }
        }
      };
      const keydownEvent = (e: KeyPressedEvent) => {
        const key: number = e.keyCode;
        if (!this.keys.length || this.keys.indexOf(key) > -1) {
          if (!this.triggerOnce || this.getKeyPressed().indexOf(key) === -1) {
            this.add(key, e);
          }
        }
      };
      (this.element.addEventListener: Function)('keyup', keyupEvent);
      (this.element.addEventListener: Function)('keydown', keydownEvent);
    }

    add(key: number, e: KeyPressedEvent) {
      this.stack[key] = true;
      e.keyPressed = this.getKeyPressed();
      this.addEventHandler(e);
      this.globalEventHandler(e);
      if (this.globalKeyEvents[key]) {
        this.globalKeyEvents[key](e);
      }
      if (this.downKeyEvents[key]) {
        this.downKeyEvents[key](e);
      }
    }

    remove(key: number, e: KeyPressedEvent) {
      delete this.stack[key];
      e.keyPressed = this.getKeyPressed();
      this.removeEventHandler(e);
      this.globalEventHandler(e);
      if (this.globalKeyEvents[key]) {
        this.globalKeyEvents[key](e);
      }
      if (this.upKeyEvents[key]) {
        this.upKeyEvents[key](e);
      }
    }

    setGlobalEventHandler(eventHandler: ?Function) {
      let handler = () => {
      };
      if (typeof eventHandler === 'function') {
        handler = eventHandler;
      }
      this.globalEventHandler = handler;
    }

    setAddEventHandler(eventHandler: ?Function) {
      let handler = () => {
      };
      if (typeof eventHandler === 'function') {
        handler = eventHandler;
      }
      this.addEventHandler = handler;
    }

    setRemoveEventHandler(eventHandler: ?Function) {
      let handler = () => {
      };
      if (typeof eventHandler === 'function') {
        handler = eventHandler;
      }
      this.removeEventHandler = handler;
    }

    getKeyPressed(): Array<number> {
      const arr = [];
      Object.keys(this.stack).forEach((elm) => {
        arr.push(Number(elm));
      });
      return arr;
    }

    setKeys(keys: Array<number>) {
      if (typeof keys === 'object' && !(keys.length === null || keys.length === undefined)) {
        this.keys = keys;
      } else if (keys === null) {
        this.keys = [];
      } else {
        throw new Error('setKeys : Only accept array or null value');
      }
    }

    getKeys(): Array<number> {
      return this.keys;
    }

    setOptions(options: KeyPressedOptions) {
      this.keys = (typeof options.keys === 'object' && !(options.keys === null || options.keys === undefined)) ? options.keys : this.keys;
      this.triggerOnce = typeof options.triggerOnce === 'boolean' ? options.triggerOnce : this.triggerOnce;
      if (options.selector) {
        const element = document.querySelector(options.selector);
        if (!element) {
          throw new Error('setOptions : Valid selector is required');
        }
        this.selector = options.selector;
        (this.element.removeEventListener: Function)('keydown');
        (this.element.removeEventListener: Function)('keyup');
        this.element = element;
        this.setKeyEvent();
      }
    }

    getOptions(): KeyPressedOptions {
      return {
        keys: this.keys,
        triggerOnce: this.triggerOnce,
        selector: this.selector,
      };
    }
  }

  class KeyPressed {
    version: string;
    methods: Object;

    constructor(options: KeyPressedOptions) {
      this.version = '1.0.0';
      this.methods = {
        on: 'function (events, eventHandler) ** Set global handlers',
      };
      prop.set(this, new KpUtils(options));
    }

    /**
     * Set global event handler on keydown, keyup, global and/or specific key number
     * @param events string || [string] || number || [number]
     * @param eventHandler function
     * @returns {KeyPressed}
     * */
    on(events: string | Array<string | number> | number, eventHandler: Function): KeyPressed {
      const eventsHandler = (event) => {
        switch (event) {
          case 'keydown':
            // $FlowFixMe
            prop.get(this).setAddEventHandler(eventHandler);
            break;
          case 'keyup':
            // $FlowFixMe
            prop.get(this).setRemoveEventHandler(eventHandler);
            break;
          case 'global':
            // $FlowFixMe
            prop.get(this).setGlobalEventHandler(eventHandler);
            break;
          default:
            if (typeof Number(event) === 'number' && !Number.isNaN(Number(event))) {
              // $FlowFixMe
              prop.get(this).globalKeyEvents[event] = eventHandler;
            } else {
              console.warn('on : event', event, 'is not supported');
            }
            break;
        }
      };
      if (typeof eventHandler !== 'function') {
        throw new Error('on : Event handler must be a function !');
      }
      if (Array.isArray(events) && events.length) {
        events.forEach((event) => {
          eventsHandler(event);
        });
      } else {
        eventsHandler(events);
      }
      return this;
    }

    off(events: Array<Function | number> | Function | number): KeyPressed {
      const eventsHandler = (event) => {
        switch (event) {
          case 'keydown':
            // $FlowFixMe
            prop.get(this).setAddEventHandler();
            break;
          case 'keyup':
            // $FlowFixMe
            prop.get(this).setRemoveEventHandler();
            break;
          case 'global':
            // $FlowFixMe
            prop.get(this).setGlobalEventHandler();
            break;
          default:
            if (typeof Number(event) === 'number' && !Number.isNaN(Number(event))) {
              // $FlowFixMe
              delete prop.get(this).globalKeyEvents[event];
              // $FlowFixMe
              delete prop.get(this).upKeyEvents[event];
              // $FlowFixMe
              delete prop.get(this).downKeyEvents[event];
              break;
            }
        }
      };
      if (Array.isArray(events) && events.length) {
        events.forEach((event) => {
          eventsHandler(event);
        });
      } else {
        eventsHandler(events);
      }
      return this;
    }

    up(keyCodes: Array<number> | number, eventHandler: Function): KeyPressed {
      const keyCodesHandler = (keyCode) => {
        if (typeof Number(keyCode) === 'number') {
          // $FlowFixMe
          prop.get(this).upKeyEvents[keyCode] = eventHandler;
        } else {
          console.warn('up : event', keyCode, 'is not supported');
        }
      };
      if (Array.isArray(keyCodes) && keyCodes.length) {
        keyCodes.forEach((keyCode) => {
          keyCodesHandler(keyCode);
        });
      } else {
        keyCodesHandler(keyCodes);
      }
      return this;
    }

    down(keyCodes: Array<number> | number, eventHandler: Function): KeyPressed {
      const keyCodesHandler = (keyCode) => {
        if (typeof Number(keyCode) === 'number') {
          // $FlowFixMe
          prop.get(this).downKeyEvents[keyCode] = eventHandler;
        } else {
          console.warn('up : event', keyCode, 'is not supported');
        }
      };
      if (Array.isArray(keyCodes) && keyCodes.length) {
        keyCodes.forEach((keyCode) => {
          keyCodesHandler(keyCode);
        });
      } else {
        keyCodesHandler(keyCodes);
      }
      return this;
    }

    setOptions(options: KeyPressedOptions): KeyPressed {
      // $FlowFixMe
      prop.get(this).setOptions(options);
      return this;
    }

    getOptions(): KeyPressedOptions {
      // $FlowFixMe
      return prop.get(this).getOptions();
    }

    getKeyPressed(): Array<number> {
      // $FlowFixMe
      return prop.get(this).getKeyPressed();
    }
  }

  return new KeyPressed(defaultOptions);
};

export const keyPressed = keyPressedClass();
