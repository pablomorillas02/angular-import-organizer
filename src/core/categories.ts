import { literals } from "./literals";

export enum ImportCategory {
  ANGULAR_CORE = 1,
  THIRD_PARTY = 2,
  INTERFACES_TYPES = 3,
  CONSTANTS_CONFIGS = 4,
  SERVICES = 5,
  HELPERS = 6,
  COMPONENTS = 7,
  UNKNOWN = 8,
}

export const CATEGORY_HEADERS: Record<ImportCategory, string> = {
  [ImportCategory.ANGULAR_CORE]: literals.categories.ANGULAR_CORE,
  [ImportCategory.THIRD_PARTY]: literals.categories.THIRD_PARTY,
  [ImportCategory.INTERFACES_TYPES]: literals.categories.INTERFACES_TYPES,
  [ImportCategory.CONSTANTS_CONFIGS]: literals.categories.CONSTANTS_CONFIGS,
  [ImportCategory.SERVICES]: literals.categories.SERVICES,
  [ImportCategory.HELPERS]: literals.categories.HELPERS,
  [ImportCategory.COMPONENTS]: literals.categories.COMPONENTS,
  [ImportCategory.UNKNOWN]: literals.categories.UNKNOWN,
};
