import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RightWrongComponent } from "./component/right-wrong/right-wrong.component";
import { PianoComponent } from "./component/piano/piano.component";
import { SheetComponent } from "./component/sheet/sheet.component";
import { NoteInputService } from "./service/note-input.service";
import { NoteOutputService } from "./service/note-output.service";

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
