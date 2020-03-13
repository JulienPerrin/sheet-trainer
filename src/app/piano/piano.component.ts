import { Component, OnInit } from "@angular/core";
import { from } from "rxjs";
import { first, map } from "rxjs/operators";
import * as MIDI from "web-midi-api";

@Component({
  selector: "app-piano",
  templateUrl: "./piano.component.html",
  styleUrls: ["./piano.component.css"]
})
export class PianoComponent implements OnInit {
  constructor() {}
  private device: MIDI.MIDIInput;
  private output: MIDI.MIDIOutput;

  ngOnInit(): void {
    from(MIDI.requestMIDIAccess())
      .pipe(
        map((midi: MIDI.MIDIAccess) => {
          return midi.inputs.values().next().value;
        }), // convert from iterable
        first() // grab just the MIDIInput
      )
      .subscribe((device: MIDI.MIDIInput) => {
        this.device = device;
        console.log(device);
        this.initMidiStream();
      });
  }

  jouerNote(note: string) {
    console.log("this.output.noteOn(0, ", note, 0);
  }

  private initMidiStream() {
    this.device.onmidimessage = this.getMIDIMessage;
  }

  private getMIDIMessage(message) {
    const command = message.data[0];
    const noteJouee = message.data[1];
    const velocityNoteJouee = message.data.length > 2 ? message.data[2] : 0;
    //this.output.send([command, noteJouee, velocityNoteJouee]);
    switch (command) {
      case 144:
        if (velocityNoteJouee > 0) {
          console.log("this.output.noteOn(0, ", noteJouee, velocityNoteJouee);
        } else {
          console.log("this.output.noteOff(0, ", noteJouee);
        }
        break;
      case 128:
        console.log("this.output.noteOff(0, ", noteJouee);
        break;
    }
  }
}
