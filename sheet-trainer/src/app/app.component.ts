import {
  AfterViewInit,
  Component,
  OnInit,
  ApplicationRef,
  OnDestroy,
} from "@angular/core";
import { combineLatest, Subscription } from "rxjs";
import { Note } from "./data/note";
import { SheetReading } from "./data/sheet-reading";
import { SpeakersReady } from "./data/speakers-ready";
import { TeacherService } from "./service/teacher.service";
import { NoteInputService } from "./service/note-input.service";
import { NoteOutputService } from "./service/note-output.service";
import { NotePlayed } from "./data/note-played";
import { Result } from "./data/result";
import { NoteHeard } from "./data/note-heard";

export const NB_NOTES = 8;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private noteInputService: NoteInputService,
    private noteOutputService: NoteOutputService,
    private teacherService: TeacherService,
    private rf: ApplicationRef
  ) {}

  title = "sheet-trainer";
  listeNotes: Array<Note> = [];
  sub = new Subscription();

  ngOnInit(): void {
    this.sub.add(
      combineLatest([
        this.noteOutputService.loadPianoSound(),
        this.noteInputService.loadMidiDevice(),
      ]).subscribe(
        ([speakersReady, notePlayed]: [SpeakersReady, NotePlayed]) => {
          console.log("instrument used", speakersReady.instrumentName);
          this.noteOutputService.outputNoteEvent(notePlayed);
        }
      )
    );
    this.sub.add(
      this.noteOutputService.spectator.subscribe((noteHeard: NoteHeard) => {
        this.teacherService.checkIfRightNote(noteHeard.note);
      })
    );
    this.sub.add(
      this.teacherService.teacher.subscribe((result: Result) => {
        switch (result.sheetReading) {
          case SheetReading.END_SHEET:
            console.log("end sheet");
            this.generateNotes();
            this.rf.tick();
        }
      })
    );
  }

  ngAfterViewInit(): void {
    // we must wait for the div to appear to generate the sheet
    this.generateNotes();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private generateNotes() {
    this.listeNotes = this.teacherService.generateRandomNoteList(NB_NOTES);
  }
}
