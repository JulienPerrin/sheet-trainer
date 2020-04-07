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
          console.log("release : ", noteAsNote);
          this._pianist.next(new NotePlayed(noteAsNote, UpDown.UP, 0));
        }
        break;
      case 128:
        console.log("release : ", noteAsNote);
        this._pianist.next(new NotePlayed(noteAsNote, UpDown.UP, 0));
        break;
    }
  }
}
