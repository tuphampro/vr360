import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { round } from '@delon/util';

@Component({
  selector: 'app-vr360-tool',
  templateUrl: './vr360-tool.component.html',
  styleUrls: ['./vr360-tool.component.less'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class VR360ToolComponent implements OnInit {
  pannellumViewer: any;
  scenes: any;
  hotSpots: any;

  tabs = [
    {
      name: 'Thiết kế',
      icon: 'edit'
    }
  ];

  validateForm: FormGroup<{
    note: FormControl<string | null>;
    gender: FormControl<'info' | 'info' | null>;
  }> = this.fb.group({
    note: this.fb.control<string | null>(null, Validators.required),
    gender: this.fb.control<'info' | 'info' | null>(null, Validators.required)
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  genderChange(value: string): void {
    this.validateForm.controls.note.setValue(value === 'info' ? 'Hi, man!' : 'Hi, lady!');
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.pannellumViewer = (window as any).pannellum.viewer('panorama', {
      default: {
        author: 'Matthew Petroff',
        sceneFadeDuration: 0,
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

      var coords = this.pannellumViewer.mouseEventToCoords(event);
      var inputText = `pitch: ${round(coords[0], 2)}, yaw:   ${round(coords[1], 2)} `;

      var currentPitch = coords[0];
      var currentYaw = coords[1];

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

      this.scenes = this.pannellumViewer.getConfig().scenes;
      this.hotSpots = this.pannellumViewer.getConfig().hotSpots;

      this.pannellumViewer.addHotSpot({
        pitch: currentPitch,
        yaw: currentYaw,
        type: 'info',
        text: inputText,
        cssClass: 'custom-hotspot',
        createTooltipFunc: this.hotspot,
        createTooltipArgs: inputText
      });

      console.log(this.scenes);
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
