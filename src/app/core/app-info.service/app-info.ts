import {AppInfoDto} from "./app-info-dto";
import {Build} from "./build";

export class AppInfo implements AppInfoDto {
  build: Build;

  static fromDto(appInfoDto: AppInfoDto): AppInfo {
    const appInfo = new AppInfo();
    appInfo.build = Build.fromDto(appInfoDto.build);
    return appInfo;
  }
}
