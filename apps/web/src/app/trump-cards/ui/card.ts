import {
  Color,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Shape,
  TextureLoader,
} from 'three';
import { User } from '../models/user';

type n = number;

export const CARD_ASPECT_RATIO = 0.8;

export class Card {
  private image: string = '/assets/card1.jpg';
  mesh: Mesh;

  constructor(width: n, height: n, x: n, y: n, user: User) {
    const geometry = new PlaneGeometry(width, height, width, height);
    const material = new MeshBasicMaterial({
      color: new Color(125, 125, 125),
      transparent: true,
      opacity: 1,
    });
    this.mesh = new Mesh(geometry, material);
    this.mesh.name = `Card ${user.id}`;
    this.mesh.position.set(x, y, 0.1);
    this.addTexture();
  }

  private async addTexture() {
    const texture = await new TextureLoader().loadAsync(this.image);
    const material = new MeshBasicMaterial({ map: texture });
    this.mesh.material = material;
  }

  private getShape(width: n, height: n, x: n, y: n, radius = 2) {
    let shape = new Shape();
    shape.moveTo(x, y + radius);
    shape.lineTo(x, y + height - radius);
    shape.quadraticCurveTo(x, y + height, x + radius, y + height);
    shape.lineTo(x + width - radius, y + height);
    shape.quadraticCurveTo(
      x + width,
      y + height,
      x + width,
      y + height - radius
    );
    shape.lineTo(x + width, y + radius);
    shape.quadraticCurveTo(x + width, y, x + width - radius, y);
    shape.lineTo(x + radius, y);
    shape.quadraticCurveTo(x, y, x, y + radius);
    return shape;
  }
}
