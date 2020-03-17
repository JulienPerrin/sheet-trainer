import { Injectable } from "@angular/core";

import MIDIMessageEvent from "web-midi-api";

declare var MIDI: any;

@Injectable({
  providedIn: "root"
})
export class NoteOutputService {
  constructor() {}

  public jouerNote(note: string): void {
    console.log("jouerNote : ", note, MIDI.keyToNote[note]);
    MIDI.setVolume(0, 127);
    MIDI.noteOn(0, MIDI.keyToNote[note], 127);
    MIDI.noteOff(0, MIDI.keyToNote[note], 127, 1);
  }

  public loadPianoSound(callback: () => void): void {
    MIDI.loadPlugin({
      soundfontUrl: "assets/soundfont/",
      instrument: "acoustic_grand_piano",
      onerror: (e: any) => {
        console.error("Instrument cannot be loaded.", e);
        throw Error("Instrument cannot be loaded.");
      },
      onsuccess: callback
    });
  }

  public outputMIDIMessage(message: MIDIMessageEvent): void {
    const command = message.data[0];
    const noteJouee = message.data[1];
    const velocityNoteJouee = message.data.length > 2 ? message.data[2] : 0;
    switch (command) {
      case 144:
        if (velocityNoteJouee > 0) {
          console.log(
            "push : ",
            MIDI.keyToNote[noteJouee],
            noteJouee,
            velocityNoteJouee
          );
          MIDI.noteOn(0, noteJouee, velocityNoteJouee);
        } else {
          console.log(
            "release : ",
            MIDI.keyToNote[noteJouee],
            noteJouee,
            velocityNoteJouee
          );
          MIDI.noteOff(0, noteJouee);
        }
        break;
      case 128:
        console.log("release : ", MIDI.keyToNote[noteJouee], noteJouee);
        MIDI.noteOff(0, noteJouee);
        break;
    }
  }
}
