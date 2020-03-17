import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SheetComponent } from "./sheet/sheet.component";
import { PianoComponent } from "./piano/piano.component";
import { RightWrongComponent } from "./right-wrong/right-wrong.component";
import { NoteInputService } from "./note.input.service";
import { NoteOutputService } from "./note.output.service";

@NgModule({
  declarations: [
    AppComponent,
    SheetComponent,
    PianoComponent,
    RightWrongComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [NoteInputService, NoteOutputService],
  bootstrap: [AppComponent]
})
export class AppModule {}
