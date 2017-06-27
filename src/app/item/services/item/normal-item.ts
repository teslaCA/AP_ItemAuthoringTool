import {JsonConvert, JsonProperty} from "json2typescript";

import {ItemTransaction} from "./item-transaction";
import {SaItem} from "./sa-item";
import {WerItem} from "./wer-item";
import {Item} from "./item";

/**
 * NormalItem base class for models that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
export abstract class NormalItem extends Item {
  // TODO: IAT-55 - Uncomment when IMS supports linkedStimulusId item property
  //@JsonProperty("linkedStimulusId", String)
  //linkedStimulusId: string = undefined;             // Initialize to undefined so that field is mapped
  linkedStimulusId = "123456FAKE";
}
