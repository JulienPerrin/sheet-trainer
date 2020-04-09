import { NoteHeard } from "../data/note-heard";
import { NotePlayed } from "../data/note-played";
import { Notes } from "../data/notes";
import { SpeakersReady } from "../data/speakers-ready";
import { UpDown } from "../data/up-down";
import { NoteOutputService } from "./note-output.service";

let setVolume = 0;
let noteOn = 0;
let noteOff = 0;

declare global {
  interface Window {
    MIDI: any;
  }
}
window.MIDI = {
  loadPlugin: (o: any) => {
    if (o.instrument === "acoustic_grand_piano") {
      o.onsuccess();
    } else {
      o.onerror(new Error("unknown instrument"));
    }
  },
  setVolume: (channel, velocity) => {
    setVolume++;
  },
  noteOn: (channel, note, velocity) => {
    noteOn++;
  },
  noteOff: (channel, note, velocity, delay) => {
    noteOff++;
  },
};

describe("NoteOutputService", () => {
  const service: NoteOutputService = new NoteOutputService();

  it("should load the accoustic grand piano so that we can output sound", (done) => {
    service.loadPianoSound().subscribe((speakersReady: SpeakersReady) => {
      expect(speakersReady.instrumentName).toBe("acoustic_grand_piano");
      done();
    });
  });

  it("should play note so that the spectator can hear it", (done) => {
    service.spectator.subscribe((noteHeard: NoteHeard) => {
      expect(noteHeard.note.name).toBe("C4");
      done();
    });
    const setVolumeInit = setVolume;
    const noteOnInit = noteOn;
    const noteOffInit = noteOff;
    service.playNote("C4");
    expect(setVolume).toBe(setVolumeInit + 1);
    expect(noteOn).toBe(noteOnInit + 1);
    expect(noteOff).toBe(noteOffInit + 1);
  });

  it("should output MIDI event so that the spectator can hear it", (done) => {
    service.spectator.subscribe((noteHeard: NoteHeard) => {
      expect(noteHeard.note.name).toBe("C4");
      done();
    });
    const noteOnInit = noteOn;
    const noteOffInit = noteOff;
    service.outputNoteEvent(
      new NotePlayed(Notes.getNoteByName("C4"), UpDown.DOWN, 127)
    );
    expect(noteOn).toBe(noteOnInit + 1);
    expect(noteOff).toBe(noteOffInit);
    service.outputNoteEvent(
      new NotePlayed(Notes.getNoteByName("C4"), UpDown.UP, 127)
    );
    expect(noteOn).toBe(noteOnInit + 1);
    expect(noteOff).toBe(noteOffInit + 1);
  });
});
