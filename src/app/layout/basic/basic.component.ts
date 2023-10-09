import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService, User } from '@delon/theme';
import { LayoutDefaultOptions } from '@delon/theme/layout-default';
import { environment } from '@env/environment';

@Component({
  selector: 'layout-basic',
  templateUrl: `./basic.component.html`,
  styleUrls: [`basic.component.less`]
})
export class LayoutBasicComponent {
  options: LayoutDefaultOptions = {
    logoExpanded: `./assets/images/panorama.png`,
    logoCollapsed: `./assets/images/panorama.png`
  };
  searchToggleStatus = false;
  showSettingDrawer = !environment.production;
  isCollapsed = false;
  menuData: any[] = [];

  get user(): User {
    return this.settings.user;
  }

  constructor(
    private settings: SettingsService,
    private router: Router
  ) {
    // this.menuData = settings.user["listMenus"];
  }

  isSelected(route: string): boolean {
    if (this.router.url.includes(route)) {
      return true;
    }
    return false;
  }
}
