import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vr360-tool',
  templateUrl: './vr360-tool.component.html',
  styleUrls: ['./vr360-tool.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VR360ToolComponent implements OnInit {
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
    (window as any).pannellum.viewer('panorama', {
      default: {
        firstScene: 'circle',
        author: 'Matthew Petroff',
        sceneFadeDuration: 250
      },
      type: 'equirectangular',
      panorama: '../assets/images/3.jpg',
      autoLoad: true,
      compass: true,
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
      scenes: {
        circle: {
          title: 'Mason Circle',
          hfov: 110,
          pitch: -3,
          yaw: 117,
          type: 'equirectangular',
          panorama: '/images/from-tree.jpg',
          hotSpots: [
            {
              pitch: -2.1,
              yaw: 132.9,
              type: 'scene',
              text: 'Spring House or Dairy',
              sceneId: 'house'
            }
          ]
        },

        house: {
          title: 'Spring House or Dairy',
          hfov: 110,
          yaw: 5,
          type: 'equirectangular',
          panorama: '/images/bma-0.jpg',
          hotSpots: [
            {
              pitch: -0.6,
              yaw: 37.1,
              type: 'scene',
              text: 'Mason Circle',
              sceneId: 'circle',
              targetYaw: -23,
              targetPitch: 2
            }
          ]
        }
      }
    });
  }
}
