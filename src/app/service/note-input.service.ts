import { Injectable } from "@angular/core";
import { from } from "rxjs";
import { first, map } from "rxjs/operators";
import { MIDIInput, MIDIMessageEvent, MIDIAccess } from "web-midi-api";

declare const navigator: any;

@Injectable({
  providedIn: "root"
})
export class NoteInputService {
  constructor() {}

  private device: MIDIInput;

  public loadMidiDevice(onMidiMessage: (message: MIDIMessageEvent) => any) {
    from(navigator.requestMIDIAccess())
      .pipe(
        map((midi: MIDIAccess) => {
          return midi.inputs.values().next().value;
        }), // convert from iterable
        first() // grab just the MIDIInput
      )
      .subscribe((device: MIDIInput) => {
        if (typeof device !== "undefined") {
          this.device = device;
          this.device.onmidimessage = onMidiMessage;
        } else {
          console.warn("No MIDI instrument connected. ");
        }
      });
  }
}
