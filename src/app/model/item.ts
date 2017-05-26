export class Item {
  public id: number;
  public type: string;
  public description: string;
  public version: number;
  public beingCreatedBy: any;
  public beingEditedBy: any;

  public attributes: Attribute[];
  public contents: Content[];

  constructor() { }

}

export class Attribute {
  public attid: string;
  public name: string;
  public val: number;
  private _desc: string;

  constructor() { }

}

export class Content {
  public language: string;
  public stem: string;
  public rubrics: Rubric[];

  constructor() { }
}

export class Rubric {
  public name: string;
  public val: any;
  public scorepoint: any;
  public minVal: any;
  public maxVal: any;

  public samples: Sample[];

  constructor() { }
}

export class Sample {
  public id: number;
  public name: string;
  public samplecontent: string;
  public purpose: string;
  public scorepoint: any;

  constructor() { }
}
