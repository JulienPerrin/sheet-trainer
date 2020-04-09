export class Note {
  constructor(
    public readonly name: string,
    public readonly vexFlowName: string,
    public readonly vexFlowOctave: number,
    public readonly midi: number
  ) {}
  public tostring(): string {
    return `Note(name : ${this.name}, midi : ${this.midi})`;
  }
}
