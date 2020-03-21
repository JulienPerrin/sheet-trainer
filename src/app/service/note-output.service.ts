import { Injectable } from "@angular/core";

import MIDIMessageEvent from "web-midi-api";
import { NoteGeneratorService } from "./note-generator.service";
import { Notes } from "../data/notes";

declare const MIDI: any;

@Injectable({
  providedIn: "root"
})
export class NoteOutputService {
  constructor(private noteGeneratorService: NoteGeneratorService) {}

  public jouerNote(note: string): void {
    this.noteGeneratorService.checkIfRightNote(Notes.getNoteByName(note));
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

  public outputMIDIMessage(message: MIDIMessageEvent): string {
    const command = message.data[0];
    const noteJouee = message.data[1];
    const velocityNoteJouee = message.data.length > 2 ? message.data[2] : 0;
    switch (command) {
      case 144:
        if (velocityNoteJouee > 0) {
          console.log(
            "push : ",
            Notes.getNoteByMidi(noteJouee),
            velocityNoteJouee
          );
          MIDI.noteOn(0, noteJouee, velocityNoteJouee);
          this.noteGeneratorService.checkIfRightNote(
            Notes.getNoteByMidi(noteJouee)
          );
          return noteJouee;
        } else {
          console.log("release : ", Notes.getNoteByMidi(noteJouee));
          MIDI.noteOff(0, noteJouee);
        }
        break;
      case 128:
        console.log("release : ", Notes.getNoteByMidi(noteJouee));
        MIDI.noteOff(0, noteJouee);
        break;
    }
    return null;
  }
}
