import { Injectable } from "@angular/core";
import { Observable, Subject, AsyncSubject, ReplaySubject } from "rxjs";
import { Note } from "../data/note";
import { NoteHeard } from "../data/note-heard";
import { NotePlayed } from "../data/note-played";
import { Notes } from "../data/notes";
import { SpeakersReady } from "../data/speakers-ready";
import { UpDown } from "../data/up-down";

declare const MIDI: any;

@Injectable({
  providedIn: "root",
})
export class NoteOutputService {
  constructor() {}

  private pianoPreparator = new ReplaySubject<SpeakersReady>(1);
  private _spectator = new Subject<NoteHeard>();

  public loadPianoSound(): Observable<SpeakersReady> {
    MIDI.loadPlugin({
      soundfontUrl: "assets/soundfont/",
      instrument: "acoustic_grand_piano",
      onerror: (e: any) => {
        console.error("Instrument cannot be loaded.", e);
        throw Error("Instrument cannot be loaded.");
      },
      onsuccess: () => {
        console.log("loadPianoSound success");
        this.pianoPreparator.next(new SpeakersReady("acoustic_grand_piano"));
      },
    });
    return this.pianoPreparator.asObservable();
  }

  public get spectator() {
    return this._spectator.asObservable();
  }

  public playNote(note: string): void {
    const noteAsNote: Note = Notes.getNoteByName(note);
    MIDI.setVolume(0, 127);
    MIDI.noteOn(0, noteAsNote.midi, 127);
    MIDI.noteOff(0, noteAsNote.midi, 127, 1);
    this._spectator.next(new NoteHeard(noteAsNote));
  }

  public outputNoteEvent(notePlayed: NotePlayed): void {
    console.log("note played", notePlayed);
    switch (notePlayed.upDown) {
      case UpDown.DOWN:
        MIDI.noteOn(0, notePlayed.note.midi, notePlayed.velocity);
        this._spectator.next(new NoteHeard(notePlayed.note));
        break;
      case UpDown.UP:
        MIDI.noteOff(0, notePlayed.note.midi);
        break;
      default:
        throw new Error("You should not be here!");
    }
  }
}
