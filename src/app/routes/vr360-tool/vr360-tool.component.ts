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
        firstScene: 'circle',
        author: 'Matthew Petroff',
        sceneFadeDuration: 250
      },
      hotSpotDebug: false,
      type: 'equirectangular',
      panorama: '../assets/images/3.jpg',
      autoLoad: true,
      compass: true,
      keyboardZoom: true,
      disableKeyboardCtrl: true
      // "pitch": 2.3,
      // "yaw": -135.4,
      // "hfov": 120,
      // "hotSpots": [
      //   {
      //     "pitch": 14.1,
      //     "yaw": 1.5,
      //     "type": "info",
      //     "text": "Baltimore Museum of Art",
      //     "URL": "https://artbma.org/"
      //   },
      //   {
      //     "pitch": -9.4,
      //     "yaw": 222.6,
      //     "type": "info",
      //     "text": "Art Museum Drive"
      //   },
      //   {
      //     "pitch": -0.9,
      //     "yaw": 144.4,
      //     "type": "info",
      //     "text": "North Charles Street"
      //   }
      // ],
      // scenes: {
      //   circle: {
      //     title: 'Mason Circle',
      //     hfov: 110,
      //     pitch: -3,
      //     yaw: 117,
      //     type: 'equirectangular',
      //     panorama: '/images/from-tree.jpg',
      //     hotSpots: [
      //       {
      //         pitch: -2.1,
      //         yaw: 132.9,
      //         type: 'scene',
      //         text: 'Spring House or Dairy',
      //         sceneId: 'house'
      //       }
      //     ]
      //   },

      //   house: {
      //     title: 'Spring House or Dairy',
      //     hfov: 110,
      //     yaw: 5,
      //     type: 'equirectangular',
      //     panorama: '/images/bma-0.jpg',
      //     hotSpots: [
      //       {
      //         pitch: -0.6,
      //         yaw: 37.1,
      //         type: 'scene',
      //         text: 'Mason Circle',
      //         sceneId: 'circle',
      //         targetYaw: -23,
      //         targetPitch: 2
      //       }
      //     ]
      //   }
      // }
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

      this.pannellumViewer.addHotSpot({
        pitch: currentPitch,
        yaw: currentYaw,
        type: 'info',
        text: inputText,
        cssClass: 'custom-hotspot',
        createTooltipFunc: this.hotspot,
        createTooltipArgs: inputText
      });
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
