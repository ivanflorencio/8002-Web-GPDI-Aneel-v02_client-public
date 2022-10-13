import { AppService } from "@app/services/app.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-gestao-ped",
  templateUrl: "./gestao-ped.component.html",
  styleUrls: ["./gestao-ped.component.scss"],
})
export class GestaoPeDComponent implements OnInit {
  i: number;
  adp = 1;

  constructor(protected app: AppService) {}

  ngOnInit() {}
}
