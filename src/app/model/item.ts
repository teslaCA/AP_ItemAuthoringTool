export class Item {
  public id: number;
  public type: string;
  public description: string;

  public contents: Contents;

  constructor () {
    this.contents = new Contents();
  }
}

export class Contents  {
  public ENU: LanguageData;

  constructor() {
    this.ENU = new LanguageData();
  }
}

export class LanguageData {
  public language: string;
  public stem: string;
  public rubrics: Rubrics[];

  constructor() { }

}

export class Rubrics {
  public name: string;
  public val: any;
  public scorepoint: any;
  public minVal: any;
  public maxVal: any;

  public samples: Samples[];

  constructor() { }
}

export class Samples {
  public name: string;
  public sampleContent: string;
  public purpose: string;
  public scorepoint: any;

  constructor() { }
}
