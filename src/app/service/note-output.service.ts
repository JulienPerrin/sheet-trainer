import { EventEmitter, Injectable } from "@angular/core";

import MIDIMessageEvent from "web-midi-api";
import { NoteGeneratorService } from "./note-generator.service";
import { Notes } from "../data/notes";
import { NotePlayed } from "../data/note-played";
import { Note } from "../data/note";
import { Result } from "../data/result";

declare const MIDI: any;

@Injectable({
  providedIn: "root"
})
export class NoteOutputService {
  constructor(private noteGeneratorService: NoteGeneratorService) {}

  notePlayedEmitter = new EventEmitter<NotePlayed>();

  public jouerNote(note: string): void {
    const noteAsNote: Note = Notes.getNoteByName(note);
    this.playNote(noteAsNote);
    MIDI.setVolume(0, 127);
    MIDI.noteOn(0, noteAsNote.midi, 127);
    MIDI.noteOff(0, noteAsNote.midi, 127, 1);
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
          this.playNote(noteAsNote);
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

  private playNote(note: Note): void {
    this.notePlayedEmitter.emit(
      new NotePlayed(
        note,
        this.noteGeneratorService.checkIfRightNote(note)
          ? Result.RIGHT
          : Result.WRONG
      )
    );
  }
}
