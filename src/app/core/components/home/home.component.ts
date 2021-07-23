import { Component, OnInit } from "@angular/core";
import { AppService } from "../../services/app.service";
import {
  EventData,
  EventEmitterService,
} from "../../services/event-emitter.service";
import { ExternalInterfaceService } from "../../services/external-interface.service";
import { RestService } from "../../services/rest.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  title = "antakshari-client";
  isRecordingOn = false;
  recordedLyrics =
    "Tu Hi To Jannat Meri Tu Hi Mera Junoon Tu Hi To Mannat Meri Tu Hi ruh ka sukun";
  currentQuestion;
  micTapped = false;
  tasks = [
    {
      name: "Task1",
      question:
        "Reverse Song Played -> Sing correctly or create a sentence Hai Hota Kuch Kuch",
      ans: "Tum paas aaye yun muskuraye Tum paas aaye yun muskuraye Tumne na jaane kya sapne dikhaye Tum paas aaye yun muskuraye Tumne na jaane kya sapne dikhaye Ab to mera dil jaage na sota hai Kya karun haaye kuch kuch hota hai Kya karun haaye kuch kuch hota hai",
    },
    {
      name: "Task2",
      question:
        "Word Based Song -> Image will be given to the user -> Guess the Movie -> Sing the word based song from that movie.Dariya -> Kabir Singh Image will be provided",
      ans: "Dill ka dariya behe hi gaya",
    },
    {
      name: "Task3",
      question:
        "Identify the Song >> Amitabh Bachan played a role of friendly ghost and the song was sung by one of the famous rappers in India",
      ans: "Party with Bhoothnath",
    },
    {
      name: "Task4",
      question: "Sing a song sung by Shankar Mahadevan from the movie Don",
      ans: "Morya re",
    },
    {
      name: "Task5",
      question:
        "Sing a song from Shahrukh Khan/Anushka Sharma movie which has the line सजदे सर झुकता है",
      ans: "Tujhme rabb dikhta hai",
    },
  ];

  constructor(
    private restService: RestService,
    private appService: AppService,
    private eventEmitterService: EventEmitterService,
    private externalInterfaceService: ExternalInterfaceService
  ) {}

  ngOnInit(): void {
    this.currentQuestion = this.tasks[0];
    this.getEventSubscription();
    this.restSet();
  }

  restSet() {
    this.isRecordingOn = false;
    // this.currentQuestion = {};
    this.recordedLyrics = "";
    // this.getQuestion();
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
      // this.appService.getContent().lyrics[this.getRandomInt(3)];
      console.log(this.currentQuestion);
  }

  getQuestions() {}

  selectTask(task) {
    this.currentQuestion = task;
  }

  checkRecroding() {
    if (this.isRecordingOn) {
      return;
    }
    // this.isRecordingOn = true;
    this.micTapped = true;
    this.externalInterfaceService.requestMicrophone();
    setTimeout(() => {
      this.isRecordingOn = true;
      this.micTapped = false;
    }, 2000);
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
