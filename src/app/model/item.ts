export class Item {
  public id: number;
  public type: string;
  public description: string;
  public version: number;
  public beingCreatedBy: any;
  public beingEditedBy: any;

  public attributes: Attributes[];
  public contents: Contents[];

  constructor() { }
}

export class Attributes {
  public attid: string;
  public name: string;
  public val: number;
  public desc: string;

  constructor() { }
}

export class Contents {
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
