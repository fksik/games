import { Color, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';
import { User } from '../models/user';
import { Card, CARD_ASPECT_RATIO } from './card';

const Y_POSITION_PERCENT_FROM_TOP = 10;

export class RoundHigh {
  private roughHigh: { card?: Card; user?: User } = {};
  public mesh!: Mesh;
  private containerWidth!: number;
  private containerHeight!: number;

  constructor(tw: number, th: number) {
    this.calculateContainerWidthHeight(tw);
    const { containerWidth: cw, containerHeight: ch } = this;
    const { x, y } = this.calculatePosition(tw, th);
    const geometry = new PlaneGeometry(cw, ch, cw, ch);
    const material = new MeshBasicMaterial({
      color: new Color(125, 125, 125),
      transparent: true,
      opacity: 1,
    });
    this.mesh = new Mesh(geometry, material);
    this.mesh.name = 'Round High container';
    this.mesh.position.set(x, y, 0.1);
  }

  private calculateContainerWidthHeight(tw: number) {
    this.containerWidth = tw * 0.28;
    this.containerHeight = this.containerWidth / CARD_ASPECT_RATIO;
  }

  private calculatePosition(tw: number, th: number): { x: number; y: number } {
    const x = tw / 2 - this.containerWidth / 2;
    let y = th / 2 - this.containerHeight / 2;
    y = y - th * (Y_POSITION_PERCENT_FROM_TOP / 100);
    return { x, y };
  }
}
