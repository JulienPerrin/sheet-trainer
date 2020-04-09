import { NotePlayed } from "../data/note-played";
import { NoteInputService } from "./note-input.service";
import { UpDown } from "../data/up-down";

declare const navigator: any;

describe("NoteInputService", () => {
  const service: NoteInputService = new NoteInputService();

  const midiInputs = [
    {
      inputs: new Map([
        [
          "input-0",
          {
            name: "Piano USB",
            onmidimessage: (message: any) => {
              throw new Error("not implemented");
            },
          },
        ],
      ]),
    },
  ];

  navigator.requestMIDIAccess = () => {
    return midiInputs;
  };

  const simulateKeyDownC4 = () => {
    midiInputs[0].inputs.get("input-0").onmidimessage({ data: [144, 60, 127] });
  };
  const simulateKeyUpC4 = () => {
    midiInputs[0].inputs.get("input-0").onmidimessage({ data: [128, 60, 127] });
  };
  const simulateKeyUpC4Bis = () => {
    midiInputs[0].inputs.get("input-0").onmidimessage({ data: [144, 60, 0] });
  };

  it("should load the piano that is connected to the PC and detect key down", (done) => {
    const sub = service.loadMidiDevice().subscribe((notePlayed: NotePlayed) => {
      expect(notePlayed.note.name).toBe("C4");
      expect(notePlayed.upDown).toBe(UpDown.DOWN);
      expect(notePlayed.velocity).toBe(127);
      done();
    });
    simulateKeyDownC4();
    sub.unsubscribe();
  });

  it("should load the piano that is connected to the PC and detect key up", (done) => {
    const sub = service.loadMidiDevice().subscribe((notePlayed: NotePlayed) => {
      expect(notePlayed.note.name).toBe("C4");
      expect(notePlayed.upDown).toBe(UpDown.UP);
      expect(notePlayed.velocity).toBe(0);
      done();
    });
    simulateKeyUpC4();
    sub.unsubscribe();
  });

  it("should load the piano that is connected to the PC and detect key up (bis)", (done) => {
    const sub = service.loadMidiDevice().subscribe((notePlayed: NotePlayed) => {
      expect(notePlayed.note.name).toBe("C4");
      expect(notePlayed.upDown).toBe(UpDown.UP);
      expect(notePlayed.velocity).toBe(0);
      done();
    });
    simulateKeyUpC4Bis();
    sub.unsubscribe();
  });
});
