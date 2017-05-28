// TODO: Convert this item representation to a class hierarchy of item types
// TODO: Remove all fields not used by front-end from class hierarchy types
// TODO: Add mappers called at service layer to map between remote JSON and this class hierarchy

export class Item {
  public id: number;
  public type: string;
  public description: string;
  public version: number;
  public beingCreatedBy: any;
  public beingEditedBy: any;
  public attributes: Attribute[] = [];
  public contents: Content[] = [];
}

export class Attribute {
  public attid: string;
  public name: string;
  public val: number;
}

export class Content {
  public language: string;
  public stem: string;            // TODO: Need to hook into changes to this field to trigger auto-save
  public rubrics: Rubric[] = [];  // TODO: Need to hook into changes to this field to trigger auto-save
}

export class Rubric {
  public name: string;            // TODO: Need to hook into changes to this field to trigger auto-save
  public val: any;
  public scorepoint: any;
  public minVal: any;
  public maxVal: any;
  public samples: Sample[] = [];
}

export class Sample {
  public id: number;
  public name: string;
  public samplecontent: string;
  public purpose: string;
  public scorepoint: any;
}
