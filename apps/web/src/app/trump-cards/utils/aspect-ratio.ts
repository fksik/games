export class AspectRatio {
  public height: number;
  constructor(
    public value = 1920 / 969,
    public width: number = window.innerWidth
  ) {
    this.height = width / value;
  }
}
