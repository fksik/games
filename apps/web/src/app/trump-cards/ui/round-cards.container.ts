import { Color, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';
import { RoundCards } from './round-cards';

const Y_POSITION_PERCENT_FROM_TOP = 10;

export class RoundCardsContainer {
  mesh: Mesh;
  roundCards: RoundCards;
  containerWidth!: number;
  containerHeight!: number;

  constructor(tw: number, th: number) {
    this.calculateContainerWidth(tw);
    const { containerWidth: cw } = this;
    this.roundCards = new RoundCards(10, cw);
    const { containerHeight } = this.roundCards;
    this.containerHeight = containerHeight;

    const geometry = new PlaneGeometry(cw, containerHeight);
    const material = new MeshBasicMaterial({
      color: new Color(0, 0, 0),
      transparent: true,
    });
    this.mesh = new Mesh(geometry, material);
    const { x, y } = this.getContainerPosition(tw, th);
    this.mesh.position.set(x, y, 0.1);
    this.mesh.add(this.roundCards.group);
  }

  private calculateContainerWidth(tw: number) {
    this.containerWidth = tw * 0.55;
  }

  getContainerPosition(tw: number, th: number): { x: number; y: number } {
    const x = this.containerWidth / 2 - tw / 2;
    let y = th / 2 - this.containerHeight / 2;
    y = y - th * (Y_POSITION_PERCENT_FROM_TOP / 100);
    return { x, y };
  }
}
