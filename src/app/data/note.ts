/*
//NoteGenerator
let reformatEnVexFlow = s => {
  if (s.length == 2) return ["" + s[0], "" + s[1]];
  else return ["" + s[0] + s[1], "" + s[2]];
};

JSON.stringify(Object.entries(MIDI.keyToNote).map(entry => {
  return {
    name: entry[0],
    vexFlowName: reformatEnVexFlow(entry[0].toUpperCase())[0],
    vexFlowOctave: reformatEnVexFlow(entry[0].toUpperCase())[1],
    midi: entry[1]
  };
}));
*/
export class Note {
  constructor(
    public readonly name: string,
    public readonly vexFlowName: string,
    public readonly vexFlowOctave: number,
    public readonly midi: number
  ) {
    this.name = name;
    this.vexFlowName = vexFlowName;
    this.vexFlowOctave = vexFlowOctave;
    this.midi = midi;
  }
  public tostring(): string {
    return `Note(name : ${this.name}, midi : ${this.midi})`;
  }
}
