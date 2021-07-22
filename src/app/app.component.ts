import { Component, OnInit } from "@angular/core";
import {
  RestService,
  AppService,
  EventEmitterService,
  EventData,
  ExternalInterfaceService,
} from "./core/services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "antakshari-client";
  isRecordingOn = false;
  recordedLyrics =
    "Tu Hi To Jannat Meri Tu Hi Mera Junoon Tu Hi To Mannat Meri Tu Hi ruh ka sukun";
  currentQuestion;

  constructor(
    private restService: RestService,
    private appService: AppService,
    private eventEmitterService: EventEmitterService,
    private externalInterfaceService: ExternalInterfaceService
  ) {}

  ngOnInit(): void {
    this.getEventSubscription();
    this.restSet();
  }

  restSet() {
    this.isRecordingOn = false;
    this.currentQuestion = {};
    this.recordedLyrics = "";
    this.getQuestion();
    // this.appService.set
  }

  getEventSubscription() {
    this.eventEmitterService.subscribe((event: EventData) => {
      if (event.type === "TEXT_FROM_NATIVE") {
        alert(JSON.stringify(event.data));
        if (
          !["hello", "asr_error", "asrerror"].includes(event.data.toLowerCase())
        ) {
          this.isRecordingOn = false;
          this.recordedLyrics = event.data;
          alert(this.recordedLyrics);
          this.makeCompareLyricsRequest(this.recordedLyrics);
        } else {
          this.restSet();
        }
      }
    });
  }

  getQuestion() {
    this.currentQuestion =
      this.appService.getContent().lyrics[this.getRandomInt(3)];
    console.log(this.currentQuestion);
  }

  checkRecroding() {
    if (this.isRecordingOn) {
      return;
    }
    this.isRecordingOn = true;
    this.externalInterfaceService.requestMicrophone();
    setTimeout(() => {
      this.isRecordingOn = true;
    }, 50000);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  makeCompareLyricsRequest(recordedLyrics) {
    // console.log(this.appService.getConfigParam("API_HOST"));
    // this.restService.post(this.appService.getConfigParam("API_HOST")+ '/compareLyrics',
    //   {
    //     lyrics: this.hardcodedLyrics
    //   })
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
  }
}
