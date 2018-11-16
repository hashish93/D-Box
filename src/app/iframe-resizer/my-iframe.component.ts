import {Component, Input, ViewChild, ElementRef, HostListener} from "@angular/core";

@Component({
    selector: "my-iframe",
    templateUrl: "./my-iframe.component.html",
    styleUrls: ['./my-iframe.component.scss']
    // styles: ["iframe { margin-bottom: -4px; }"]
})
export class MyIFrameComponent {
    @Input() src: string;
    @ViewChild("frame") frameElement: ElementRef;
    containerMinWidth: number = 200;
    containerMinHeight: number = 200;
    containerWidth: number = 0;//this.containerMinWidth;
    containerHeight: number = 0;//this.containerMinHeight;
    public loading: boolean = false;

    ngOnInit() {
        //this.onResize(window.innerWidth, window.innerHeight);
    }

    @HostListener("window:resize", ["$event.target.innerWidth", "$event.target.innerHeight"])
    onResize(width: number, height: number): void {
        // let top = this.frameElement.nativeElement.offsetTop;
        // let left = this.frameElement.nativeElement.offsetLeft;

        this.containerWidth = this.frameElement.nativeElement.contentWindow.document.body.scrollWidth;
        this.containerHeight = this.frameElement.nativeElement.contentWindow.document.body.scrollHeight;
        // console.log(this.frameElement.nativeElement.contentWindow.document.documentElement.scrollHeight);
        // console.log(this.frameElement.nativeElement.contentWindow.document.documentElement.offsetHeight);
        // console.log(this.frameElement.nativeElement.contentWindow.document.body.scrollHeight);
        // console.log(this.frameElement.nativeElement.contentWindow.document.body.offsetHeight);
        // this.containerWidth = Math.max(width - left, this.containerMinWidth);
        // this.containerHeight = Math.max(height - top, this.containerMinHeight);
    }

    public setIframeReady() {
        this.loading = true;
        this.containerWidth = this.frameElement.nativeElement.contentWindow.document.body.scrollWidth;
        this.containerHeight = Math.max(this.frameElement.nativeElement.contentWindow.document.body.scrollHeight, this.containerMinWidth);
        // console.log(this.frameElement.nativeElement.contentWindow.document.documentElement.scrollWidth);
        // console.log(this.frameElement.nativeElement.contentWindow.document.documentElement.scrollWidth);
        // console.log(this.frameElement.nativeElement.contentWindow.document.body.scrollWidth);
        // console.log(this.frameElement.nativeElement.contentWindow.document.body.offsetHeight);
    }
}