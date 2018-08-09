// @flow

import Canvas from './canvas-constructor';
import AnimationSprite from './animations-constructor';

import { coinTiles, redFaceCoin, blueFaceCoin } from '../common/tiles/coin-tiles';
import { infiniteSequence } from '../common/generator/sequence-generator';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../common/variables';

import type { Store } from '../type/store-type';
import type { CoinTile } from '../type/tile-type';


export default class Coin extends Canvas {
  coinSequence: Iterator<number>;
  animation: AnimationSprite;
  currentCoinPosition: number;
  currentCoinTile: CoinTile;

  constructor({ store }: {store: Store}) {
    super({ store, type: 'coin' });
    this.currentCoinPosition = Math.floor(Math.random() * coinTiles.length);
    this.coinSequence = infiniteSequence(coinTiles.length);

    this.animation = new AnimationSprite(() => {
      this.clearImage(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      const tile = coinTiles.find((coin: CoinTile) => coin.value === this.currentCoinPosition);
      if (tile) {
        this.drawCoin({ tile });
        this.currentCoinTile = tile;
        const nextPosition = this.coinSequence.next().value;
        if (nextPosition) {
          this.currentCoinPosition = nextPosition;
        }
      }
    }, 1000 / 30);
  }

  drawCoin({ tile }:{tile: CoinTile}) {
    // `- 2` to better centered visualization of the coin
    const centeredWidth: number = ((CANVAS_WIDTH / 2) - (tile.width / 2)) - 2;
    const centeredHeight: number = (CANVAS_HEIGHT / 2) - (tile.height / 2);
    this.drawImage(
      tile.x,
      tile.y,
      tile.width,
      tile.height,
      centeredWidth,
      centeredHeight,
      tile.width,
      tile.height,
    );
  }

  printCoinFace({ color }:{color: 'red' | 'blue'}) {
    this.clearImage(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    if (color === 'red') {
      this.drawCoin({ tile: redFaceCoin });
    } else {
      this.drawCoin({ tile: blueFaceCoin });
    }
    setTimeout(() => {
      this.hideCanvas();
    }, 1000);
  }

  flipCoin() {
    this.animation.startAnimation();
  }

  stopCoin() {
    this.animation.stopAnimation();
    this.printCoinFace({ color: this.currentCoinTile.color });
  }
}
