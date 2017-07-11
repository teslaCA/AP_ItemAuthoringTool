import {JsonProperty} from "json2typescript";
import {Item} from "./item";

/**
 * OtherItem base class for models that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
export abstract class OtherItem extends Item {
  get supportsPreview(): boolean {
    return false;
  }
}
