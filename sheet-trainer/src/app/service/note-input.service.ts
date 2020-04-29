import { Injectable } from "@angular/core";
import { from, Observable, Subject } from "rxjs";
import { first, map } from "rxjs/operators";
import { MIDIAccess, MIDIInput, MIDIMessageEvent } from "web-midi-api";
import { Note } from "../data/note";
import { NotePlayed } from "../data/note-played";
import { Notes } from "../data/notes";
import { UpDown } from "../data/up-down";

declare const navigator: any;

@Injectable({
  providedIn: "root",
})
export class NoteInputService {
  constructor() {}

  private device: MIDIInput;
  private _pianist = new Subject<NotePlayed>();
  private sustain = false;
  private notesSustained: Note[] = [];

  public loadMidiDevice(): Observable<NotePlayed> {
    from<MIDIInput>(navigator.requestMIDIAccess())
      .pipe(
        map((midi: MIDIAccess) => {
          return midi.inputs.values().next().value;
        }), // convert from iterable
        first() // grab just the MIDIInput
      )
      .subscribe((device: MIDIInput) => {
        if (typeof device !== "undefined") {
          console.log("loadMidiDevice success");
          this.device = device;
          this.device.onmidimessage = (message: MIDIMessageEvent) =>
            this.dealWithMidiMessageEvent(message);
        } else {
          console.warn("No MIDI instrument connected. ");
        }
      });
    return this._pianist.asObservable();
  }

  public get pianist() {
    return this._pianist.asObservable();
  }

  private dealWithMidiMessageEvent(message: MIDIMessageEvent): void {
    console.log("message", message);
    const command = message.data[0];
    const notePlayed = message.data[1];
    const velocityNotePlayed = message.data.length > 2 ? message.data[2] : 0;
    const noteAsNote: Note = Notes.getNoteByMidi(notePlayed);
    switch (command) {
      case 144:
        if (velocityNotePlayed > 0) {
          console.log("push : ", noteAsNote, velocityNotePlayed);
          this._pianist.next(
            new NotePlayed(noteAsNote, UpDown.DOWN, velocityNotePlayed)
          );
        } else {
          this.releaseKey(noteAsNote);
        }
        break;
      case 128:
        this.releaseKey(noteAsNote);
        break;
      case 176: // sustain
        this.sustain = velocityNotePlayed > 0;
        console.log("sustain", this.sustain);
        if (!this.sustain) {
          for (const noteSustained of this.notesSustained) {
            this.releaseKey(noteSustained);
          }
          this.notesSustained = [];
        }
        break;
      default:
        console.warn("unknown command", message);
    }
  }

  private releaseKey(note: Note) {
    console.log("release : ", note);
    if (!this.sustain) {
      this._pianist.next(new NotePlayed(note, UpDown.UP, 0));
    } else {
      this.notesSustained.push(note);
    }
  }
}
