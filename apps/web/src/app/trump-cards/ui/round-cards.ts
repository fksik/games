import { Group } from 'three';
import { Card } from './card';

type n = number;

const GUTTER = 2;
const ASPECT_RATIO = 0.8;
const TOTAL_COUNT = 10;
const HALF = TOTAL_COUNT / 2;

export class RoundCards {
  roundCards: Array<Card> = [];
  group: Group = new Group();
  xOffset: n;
  yOffset: n;

  containerHeight: number;

  constructor(othersCount: n, public containerWidth: n) {
    this.xOffset = -containerWidth / 2;
    const { cw, ch } = this.getDimensions(containerWidth);
    this.containerHeight = ch * 2 + GUTTER;
    this.yOffset = this.containerHeight / 2;

    for (let i = 0; i < othersCount; i++) {
      const { x, y } = this.getXYPosition(i, cw, ch);
      this.roundCards[i] = new Card(cw, ch, x, y);
    }

    this.addUsersToGroup();
  }

  addUsersToGroup() {
    this.roundCards.forEach((_) => {
      this.group.add(_.mesh);
    });
  }

  getDimensions(tw: n): { cw: n; ch: n } {
    const width = (tw - GUTTER * (HALF - 1)) / HALF;
    const height = width / ASPECT_RATIO;
    return { cw: width, ch: height };
  }

  getXYPosition(index: n, cw: n, ch: number): { x: number; y: number } {
    const row = ~~(index / HALF);
    const xPos = index % HALF;
    const x = xPos * (cw + GUTTER) + this.xOffset + cw / 2;
    const y = row * (-ch - GUTTER) + this.yOffset - ch / 2;
    return { x, y };
  }
}
