import {JsonObject, JsonProperty} from "json2typescript";
import {AssessmentItemCore} from "../base/item-core";
import {ItemContext} from "../base/item-context";
import {AssessmentItem} from "../base/item";

/**
 * EQ item context that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class EqItemContext extends ItemContext {
  @JsonProperty("item", EqItem)
  item: EqItem = undefined;                     // Initialize to undefined so that field is mapped
}

/**
 * EQ item that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class EqItem extends AssessmentItem {
  @JsonProperty("core", EqItemCore)
  core: EqItemCore = undefined;                 // Initialize to undefined so that field is mapped
}

/**
 * EQ item core that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class EqItemCore extends AssessmentItemCore {
  @JsonProperty("prompt", String)
  prompt: string = undefined;                   // Initialize to undefined so that field is mapped

  // TODO: IAT-26: Uncomment when server supports this field
  //@JsonProperty("equationEditorConfiguration", EqEquationEditorConfiguration)
  //equationEditorConfiguration: EqEquationEditorConfiguration = undefined;

  @JsonProperty("parts", [EqPart])
  parts: EqPart[] = undefined;
}

@JsonObject
export class EqEquationEditorConfiguration {
  @JsonProperty("code", String)
  code: string = undefined;

  @JsonProperty("label", String)
  label: string = undefined;

  @JsonProperty("numpadConfiguration", EqEquationEditorNumpadConfiguration)
  numpadConfiguration: EqEquationEditorNumpadConfiguration = undefined;

  @JsonProperty("variableRowConfiguration", EqEquationEditorVariableRowConfiguration)
  variableRowConfiguration: EqEquationEditorVariableRowConfiguration = undefined;

  @JsonProperty("basicMathRowConfiguration", EqEquationEditorBasicMathRowConfiguration)
  basicMathRowConfiguration: EqEquationEditorBasicMathRowConfiguration = undefined;

  @JsonProperty("comparisonRowConfiguration", EqEquationEditorComparisonRowConfiguration)
  comparisonRowConfiguration: EqEquationEditorComparisonRowConfiguration = undefined;

  @JsonProperty("advancedMathRowConfiguration", EqEquationEditorAdvancedMathRowConfiguration)
  advancedMathRowConfiguration: EqEquationEditorAdvancedMathRowConfiguration = undefined;

  @JsonProperty("trigonometryRowConfiguration", EqEquationEditorTrigonometryRowConfiguration)
  trigonometryRowConfiguration: EqEquationEditorTrigonometryRowConfiguration = undefined;
}

@JsonObject
export class EqEquationEditorNumpadConfiguration {
  @JsonProperty("isMinusVisible", Boolean)
  isMinusVisible: boolean = undefined;

  @JsonProperty("isFractionVisible", Boolean)
  isFractionVisible: boolean = undefined;
}

@JsonObject
export class EqEquationEditorVariableRowConfiguration {
  @JsonProperty("isRowVisible", Boolean)
  isRowVisible: boolean = undefined;

  @JsonProperty("variables", [String])
  variables: string[] = undefined;
}

@JsonObject
export class EqEquationEditorBasicMathRowConfiguration {
  @JsonProperty("isRowVisible", Boolean)
  isRowVisible: boolean = undefined;

  @JsonProperty("isPlusVisible", Boolean)
  isPlusVisible: boolean = undefined;

  @JsonProperty("isMinusVisible", Boolean)
  isMinusVisible: boolean = undefined;

  @JsonProperty("isMultiplyVisible", Boolean)
  isMultiplyVisible: boolean = undefined;

  @JsonProperty("isDivideVisible", Boolean)
  isDivideVisible: boolean = undefined;
}

@JsonObject
export class EqEquationEditorComparisonRowConfiguration {
  @JsonProperty("isRowVisible", Boolean)
  isRowVisible: boolean = undefined;

  @JsonProperty("isLessThanOrEqualVisible", Boolean)
  isLessThanOrEqualVisible: boolean = undefined;

  @JsonProperty("isLessThanVisible", Boolean)
  isLessThanVisible: boolean = undefined;

  @JsonProperty("isEqualVisible", Boolean)
  isEqualVisible: boolean = undefined;

  @JsonProperty("isGreaterThanVisible", Boolean)
  isGreaterThanVisible: boolean = undefined;

  @JsonProperty("isGreaterThanOrEqualVisible", Boolean)
  isGreaterThanOrEqualVisible: boolean = undefined;
}

@JsonObject
export class EqEquationEditorAdvancedMathRowConfiguration {
  @JsonProperty("isRowVisible", Boolean)
  isRowVisible: boolean = undefined;

  @JsonProperty("isFractionVisible", Boolean)
  isFractionVisible: boolean = undefined;

  @JsonProperty("isSuperscriptVisible", Boolean)
  isSuperscriptVisible: boolean = undefined;

  @JsonProperty("isSubscriptVisible", Boolean)
  isSubscriptVisible: boolean = undefined;

  @JsonProperty("isParenthesesVisible", Boolean)
  isParenthesesVisible: boolean = undefined;

  @JsonProperty("isAbsoluteValueVisible", Boolean)
  isAbsoluteValueVisible: boolean = undefined;

  @JsonProperty("isSquareRootVisible", Boolean)
  isSquareRootVisible: boolean = undefined;

  @JsonProperty("isNthRootVisible", Boolean)
  isNthRootVisible: boolean = undefined;

  @JsonProperty("isPiVisible", Boolean)
  isPiVisible: boolean = undefined;

  @JsonProperty("isImaginaryVisible", Boolean)
  isImaginaryVisible: boolean = undefined;
}

@JsonObject
export class EqEquationEditorTrigonometryRowConfiguration {
  @JsonProperty("isRowVisible", Boolean)
  isRowVisible: boolean = undefined;

  @JsonProperty("isSineVisible", Boolean)
  isSineVisible: boolean = undefined;

  @JsonProperty("isCosineVisible", Boolean)
  isCosineVisible: boolean = undefined;

  @JsonProperty("isTangentVisible", Boolean)
  isTangentVisible: boolean = undefined;

  @JsonProperty("isArcSineVisible", Boolean)
  isArcSineVisible: boolean = undefined;

  @JsonProperty("isArcCosineVisible", Boolean)
  isArcCosineVisible: boolean = undefined;

  @JsonProperty("isArcTangentVisible", Boolean)
  isArcTangentVisible: boolean = undefined;
}

@JsonObject
export class EqPart {
  @JsonProperty("label", String)
  label: string = undefined;

  @JsonProperty("labelPosition", String)
  labelPosition: string = undefined;  // Allowed values: "leftOfInput", "rightOfInput"

  @JsonProperty("exemplarResponses", [String])
  exemplarResponses: string[] = undefined;
}
