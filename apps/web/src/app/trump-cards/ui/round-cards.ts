import { Group } from 'three';
import { User, Users } from '../models/user';
import { Card, CARD_ASPECT_RATIO } from './card';

type n = number;

const GUTTER = 2;
const TOTAL_COUNT = 10;
const HALF = TOTAL_COUNT / 2;

export class RoundCards {
  roundCards: Array<{ card?: Card; user: User }> = [];
  group: Group = new Group();
  xOffset: n;
  yOffset: n;

  containerHeight: number;

  constructor(otherUsers: Users, public containerWidth: n) {
    this.group.name = 'Round Cards Group';
    this.xOffset = -containerWidth / 2;
    const { ch } = this.getDimensions(containerWidth);
    this.containerHeight = ch * 2 + GUTTER;
    this.yOffset = this.containerHeight / 2;

    for (let i = 0; i < otherUsers.length; i++) {
      this.roundCards[i] = { user: otherUsers[i] };
    }
    this.resetWithAvailableUsers();
  }

  resetWithAvailableUsers() {
    this.roundCards.forEach((_, index) => {
      this.drawUserCard(index);
    });
  }

  drawUserCard(index: n) {
    const { cw, ch } = this.getDimensions(this.containerWidth);
    const { x, y } = this.getXYPosition(index, cw, ch);
    const { user } = this.roundCards[index];
    const card = new Card(cw, ch, x, y, user);
    this.roundCards[index].card = card;
    this.group.add(card.mesh);
  }

  getDimensions(tw: n): { cw: n; ch: n } {
    const width = (tw - GUTTER * (HALF - 1)) / HALF;
    const height = width / CARD_ASPECT_RATIO;
    return { cw: width, ch: height };
  }

  getXYPosition(index: n, cw: n, ch: number): { x: number; y: number } {
    const row = ~~(index / HALF);
    const xPos = index % HALF;
    const x = xPos * (cw + GUTTER) + this.xOffset + cw / 2;
    const y = row * (-ch - GUTTER) + this.yOffset - ch / 2;
    return { x, y };
  }

  removeUser(id: string) {
    const index = this.roundCards.findIndex((_) => _.user.id === id);
    this.roundCards.splice(index, 1);
    this.group.clear();
    this.resetWithAvailableUsers();
  }
}
