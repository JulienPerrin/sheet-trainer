import { NotePlayed } from "../data/note-played";
import { UpDown } from "../data/up-down";
import { NoteInputService } from "./note-input.service";

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

  const simulateKeyDownC4 = () => {
    midiInputs[0].inputs.get("input-0").onmidimessage({ data: [144, 60, 127] });
  };
  const simulateKeyUpC4 = () => {
    midiInputs[0].inputs.get("input-0").onmidimessage({ data: [128, 60, 127] });
  };
  const simulateKeyUpC4Bis = () => {
    midiInputs[0].inputs.get("input-0").onmidimessage({ data: [144, 60, 0] });
  };
  const simulateKeyUpC4Tris = () => {
    midiInputs[0].inputs.get("input-0").onmidimessage({ data: [144, 60] });
  };
  const simulateSustain = () => {
    midiInputs[0].inputs.get("input-0").onmidimessage({ data: [176, 64, 127] });
  };
  const simulateStopSustain = () => {
    midiInputs[0].inputs.get("input-0").onmidimessage({ data: [176, 64, 0] });
  };
  const simulateUnknownCommand = () => {
    midiInputs[0].inputs.get("input-0").onmidimessage({ data: [-1, 0, 0] });
  };

  beforeEach(() => {
    navigator.requestMIDIAccess = () => {
      return midiInputs;
    };
  });

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

  it("should load the piano that is connected to the PC, detect sustain, sustain notes and stop sustaining them", (done) => {
    service.loadMidiDevice();

    simulateSustain();

    const sub1 = service.pianist.subscribe((notePlayed: NotePlayed) => {
      expect(notePlayed.note.name).toBe("C4");
      expect(notePlayed.upDown).toBe(UpDown.DOWN);
      expect(notePlayed.velocity).toBe(127);
    });
    simulateKeyDownC4();
    sub1.unsubscribe();

    const sub2 = service.pianist.subscribe((notePlayed: NotePlayed) => {
      expect(false).toBeTrue();
    });
    simulateKeyUpC4();
    sub2.unsubscribe();

    const sub3 = service.pianist.subscribe((notePlayed: NotePlayed) => {
      expect(notePlayed.note.name).toBe("C4");
      expect(notePlayed.upDown).toBe(UpDown.UP);
      expect(notePlayed.velocity).toBe(0);
      done();
    });
    simulateStopSustain();
    sub3.unsubscribe();

    const sub4 = service.pianist.subscribe((notePlayed: NotePlayed) => {
      expect(notePlayed.note.name).toBe("C4");
      expect(notePlayed.upDown).toBe(UpDown.DOWN);
      expect(notePlayed.velocity).toBe(127);
    });
    simulateKeyDownC4();
    sub4.unsubscribe();

    const sub5 = service.pianist.subscribe((notePlayed: NotePlayed) => {
      expect(notePlayed.note.name).toBe("C4");
      expect(notePlayed.upDown).toBe(UpDown.UP);
      expect(notePlayed.velocity).toBe(0);
      done();
    });
    simulateKeyUpC4Tris();
    sub5.unsubscribe();
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

  it("should not load the piano if it is not connected to the PC", () => {
    spyOn(console, "warn");
    navigator.requestMIDIAccess = () => {
      return [
        {
          inputs: new Map(),
        },
      ];
    };
    const sub = service.loadMidiDevice().subscribe((notePlayed: NotePlayed) => {
      expect(false).toBeTrue();
    });
    expect(console.warn).toHaveBeenCalledWith("No MIDI instrument connected. ");
    sub.unsubscribe();
  });

  it("should load the piano if it is connected to the PC and warn on unknown command", () => {
    spyOn(console, "warn");
    const sub = service.loadMidiDevice().subscribe((notePlayed: NotePlayed) => {
      expect(false).toBeTrue();
    });
    simulateUnknownCommand();
    expect(console.warn).toHaveBeenCalledWith("unknown command", {
      data: [-1, 0, 0],
    });
    sub.unsubscribe();
  });
});
