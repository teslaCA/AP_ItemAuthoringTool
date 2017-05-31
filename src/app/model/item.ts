/*
 * Copyright 2017 Regents of the University of California.
 *
 * Licensed under the Educational Community License, Version 2.0 (the "license");
 * you may not use this file except in compliance with the License. You may
 * obtain a copy of the license at
 *
 * https://opensource.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// TODO: Convert this item representation to a class hierarchy of item types
// TODO: Remove all fields not used by front-end from class hierarchy types
// TODO: Add mappers called at service layer to map between remote JSON and this class hierarchy

export class Item {

  attributes: Attribute[] = [];

  beingCreatedBy: any;

  beingEditedBy: any;

  contents: Content[] = [];

  description: string;

  id: number;

  type: string;

  version: number;
}

export class Attribute {

  attid: string;

  name: string;

  val: number;
}

export class Content {

  language: string;

  rubrics: Rubric[] = [];  // TODO: Need to hook into changes to this field to trigger auto-save

  stem: string;            // TODO: Need to hook into changes to this field to trigger auto-save
}

export class Rubric {

  maxVal: any;

  minVal: any;

  name: string;            // TODO: Need to hook into changes to this field to trigger auto-save

  val: any;

  samples: Sample[] = [];

  scorepoint: any;
}

export class Sample {

  name: string;

  purpose: string;

  samplecontent: string;

  scorepoint: any;
}
