import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { round } from '@delon/util';

@Component({
  selector: 'app-vr360-tool',
  templateUrl: './vr360-tool.component.html',
  styleUrls: ['./vr360-tool.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VR360ToolComponent implements OnInit {
  pannellumViewer: any;

  tabs = [
    {
      name: 'Tab 1',
      icon: 'apple'
    },
    {
      name: 'Tab 2',
      icon: 'android'
    }
  ];

  ngOnInit() {
    this.pannellumViewer = (window as any).pannellum.viewer('panorama', {
      default: {
        author: 'Matthew Petroff',
        sceneFadeDuration: 200,
        firstScene: 'root'
      },
      // dynamicUpdate: true,
      // dynamic: true,
      hotSpotDebug: false,
      // type: 'equirectangular',
      // panorama: '../assets/images/3.jpg',
      autoLoad: true,
      compass: true,
      keyboardZoom: true,
      disableKeyboardCtrl: true,
      scenes: {
        root: {
          title: 'Mason Circle',
          type: 'equirectangular',
          panorama: '../assets/images/1.jpg',
          hotSpots: [
            // {
            //   "pitch": 14.1,
            //   "yaw": 1.5,
            //   "type": "info",
            //   "text": "Baltimore Museum of Art",
            // },
            {
              type: 'scene',
              text: 'Spring House or Dairy',
              sceneId: 'house'
            }
          ]
        },
        house: {
          title: 'Spring House or Dairy',
          type: 'equirectangular',
          panorama: '../assets/images/2.jpg',
          hotSpots: [
            {
              type: 'scene',
              text: 'Mason Circle',
              sceneId: 'root'
            }
          ]
        }
      }
    });
    this.pannellumViewer.on('mouseup', this.mouseupViewer);
  }

  mouseupViewer = (event: MouseEvent) => {
    try {
      if (!event.ctrlKey) return;
      // coords[0] is pitch, coords[1] is yaw
      var coords = this.pannellumViewer.mouseEventToCoords(event);
      var inputText = `pitch: ${round(coords[0], 2)}, yaw:   ${round(coords[1], 2)} `;

      var currentPitch = coords[0];
      var currentYaw = coords[1];

      console.log(this.pannellumViewer.getScene());
      // this.pannellumViewer.addScene(
      //   'house', {
      //   title: "New Scene",
      //   type: "equirectangular",
      //   autoload: true,
      //   panorama: '../assets/images/1.jpg',
      //   "hotSpots": [
      //     {
      //       "type": "scene",
      //       "text": "New Scene",
      //       "sceneId": "house"
      //     }
      //   ]
      // });

      this.pannellumViewer.addHotSpot({
        pitch: currentPitch,
        yaw: currentYaw,
        type: 'info',
        text: inputText,
        cssClass: 'custom-hotspot',
        createTooltipFunc: this.hotspot,
        createTooltipArgs: inputText
      });

      // this.pannellumViewer.setUpdate(true);
      // this.pannellumViewer.loadScene('circle');

      console.log(this.pannellumViewer.getConfig().scenes);
    } catch (error) {
      console.log(error);
    }
  };

  // Hot spot creation function
  hotspot = (hotSpotDiv: any, args: any) => {
    var a = document.createElement('a');
    hotSpotDiv.appendChild(a);

    hotSpotDiv.classList.add('custom-tooltip');
    var span = document.createElement('span');
    span.innerHTML = args;
    hotSpotDiv.appendChild(span);
    span.style.width = `${span.scrollWidth + 20}px`;
    span.style.padding = `${6}px`;
    span.style.marginLeft = `${-(span.scrollWidth + 46) / 2}px`;
    span.style.marginTop = `${-a.scrollHeight - 6}px`;
  };
}
