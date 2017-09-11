import {JsonProperty} from "json2typescript";

/**
 * ItemCore model that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
export abstract class ItemCore {
  @JsonProperty("workflowStatusCode", String)
  workflowStatusCode: string = undefined;       // Initialize to undefined so that field is mapped

  abstract get supportsPreview(): boolean;

  abstract get supportsStimulus(): boolean;

  abstract get supportsTutorial(): boolean;

  get supportsWorkflow(): boolean {
    return true;
  }
}

export abstract class AssessmentItemCore extends ItemCore {
  @JsonProperty("stimulusId", String)
  stimulusId: string = undefined;               // Initialize to undefined so that field is mapped

  @JsonProperty("tutorialId", String)
  tutorialId: string = undefined;               // Initialize to undefined so that field is mapped

  get supportsPreview(): boolean {
    return true;
  }

  get supportsStimulus(): boolean {
    return true;
  }

  get supportsTutorial(): boolean {
    return true;
  }
}

export abstract class OtherItemCore extends ItemCore {
  get supportsPreview(): boolean {
    return false;
  }

  get supportsStimulus(): boolean {
    return false;
  }

  get supportsTutorial(): boolean {
    return false;
  }
}
