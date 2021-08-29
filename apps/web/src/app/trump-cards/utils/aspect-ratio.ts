export class AspectRatio {
  public height: number;
  constructor(public value = 1.9814, public width: number = window.innerWidth) {
    this.height = width / value;
  }
}
