import {BuildDto} from "./build-dto";

export class Build implements BuildDto {
  version: string;

  static fromDto(buildDto: BuildDto): Build {
    const build = new Build();
    build.version = buildDto.version;
    return build;
  }
}
