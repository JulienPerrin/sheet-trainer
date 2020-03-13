import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SheetComponent } from "./sheet/sheet.component";
import { PianoComponent } from "./piano/piano.component";
import { RightWrongComponent } from "./right-wrong/right-wrong.component";

@NgModule({
  declarations: [
    AppComponent,
    SheetComponent,
    PianoComponent,
    RightWrongComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
