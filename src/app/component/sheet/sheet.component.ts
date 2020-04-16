import { Component, Input, OnInit } from "@angular/core";
import { Note } from "src/app/data/note";

declare const Vex: any;

const VF = Vex.Flow;
const STAVE_OUTPUT = 10;
const STAVE_WIDTH = 656;
const TREBLE_WIDTH = 50;
const STAVE_HEIGHT = 240;

@Component({
  selector: "app-sheet",
  templateUrl: "./sheet.component.html",
  styleUrls: ["./sheet.component.css"],
})
export class SheetComponent implements OnInit {
  constructor() {}

  private context: any;
  private _listeNotes: Array<Note>;

  ngOnInit(): void {
    // Create an SVG renderer and attach it to the DIV element named "boo".
    const div = document.getElementById("boo");
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

    this.context = renderer.getContext();
    renderer.resize(STAVE_WIDTH, STAVE_HEIGHT);
    this.context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
  }

  get listeNotes(): Array<Note> {
    return this._listeNotes;
  }

  @Input() set listeNotes(listeNotes: Array<Note>) {
    if (listeNotes.length > 0) {
      console.log(listeNotes);
      this._listeNotes = listeNotes;

      this.context.clear();

      // ================================================================
      // ================================================================

      // Create a stave at position 10, 0 of width 400 on the canvas.
      const staveTreble = new VF.Stave(
        STAVE_OUTPUT,
        0,
        STAVE_WIDTH - STAVE_OUTPUT
      );

      // Add a clef and time signature.
      staveTreble.addClef("treble");

      // Connect it to the rendering context and draw!
      staveTreble.setContext(this.context).draw();

      // Create a voice in 4/4 and add above notes
      const voiceTreble = new VF.Voice({
        num_beats: listeNotes.length,
        beat_value: 4,
      });
      voiceTreble.addTickables(
        listeNotes.map(
          (note) =>
            new VF.StaveNote({
              clef: "treble",
              keys: [note.vexFlowName + "/" + note.vexFlowOctave],
              duration: "q",
            })
        )
      );

      // ================================================================
      // ================================================================

      // ================================================================
      // ================================================================

      // Create a stave at position 10, 0 of width 400 on the canvas.
      const staveBass = new VF.Stave(
        STAVE_OUTPUT,
        90,
        STAVE_WIDTH - STAVE_OUTPUT
      );

      // Add a clef and time signature.
      staveBass.addClef("bass");

      // Connect it to the rendering context and draw!
      staveBass.setContext(this.context).draw();

      // Create a voice in 4/4 and add above notes
      const voiceBass = new VF.Voice({
        num_beats: listeNotes.length,
        beat_value: 4,
      });
      voiceBass.addTickables(
        listeNotes.map(
          (note) =>
            new VF.StaveNote({
              clef: "bass",
              keys: [note.vexFlowName + "/" + (note.vexFlowOctave - 2)],
              duration: "q",
            })
        )
      );

      // ================================================================
      // ================================================================

      // Format and justify the notes to 400 pixels.
      new VF.Formatter()
        .joinVoices([voiceTreble])
        .joinVoices([voiceBass])
        .format([voiceTreble, voiceBass], STAVE_WIDTH - TREBLE_WIDTH);

      // Render voice
      voiceTreble.draw(this.context, staveTreble);
      voiceBass.draw(this.context, staveBass);
    }
  }
}
