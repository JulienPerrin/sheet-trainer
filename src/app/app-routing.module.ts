import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SheetComponent } from "./component/sheet/sheet.component";

const routes: Routes = [
  // tslint:disable-next-line: quotemark
  { path: "", component: SheetComponent },
  // tslint:disable-next-line: quotemark
  { path: "*", component: SheetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
