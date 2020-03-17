import { Injectable } from "@angular/core";

import MIDIMessageEvent from "web-midi-api";

declare var MIDI: any;

@Injectable({
  providedIn: "root"
})
export class NoteOutputService {
  constructor() {}

  public jouerNote(note: string): void {
    console.log("this.output.noteOn(0, ", MIDI.keyToNote[note], ",", 127, ")");
    MIDI.setVolume(0, 127);
    MIDI.noteOn(0, MIDI.keyToNote[note], 127, 5);
    MIDI.noteOff(0, MIDI.keyToNote[note], 127, 5);
  }

  public loadPianoSound(callback: () => void): void {
    MIDI.loadPlugin({
      soundfontUrl: "assets/soundfont/",
      instrument: "acoustic_grand_piano",
      onerror: e => {
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
    // console.log("delay?", message.timeStamp);
    switch (command) {
      case 144:
        if (velocityNoteJouee > 0) {
          console.log(
            "this.output.noteOn(0, ",
            noteJouee,
            ",",
            velocityNoteJouee,
            ")"
          );
          MIDI.noteOn(0, noteJouee, velocityNoteJouee);
        } else {
          console.log("this.output.noteOff(0, ", noteJouee, ")");
          MIDI.noteOff(0, noteJouee);
        }
        break;
      case 128:
        console.log("this.output.noteOff(0, ", noteJouee, ")");
        MIDI.noteOff(0, noteJouee);
        break;
    }
  }
}
