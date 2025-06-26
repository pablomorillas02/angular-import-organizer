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
  [ImportCategory.ANGULAR_CORE]: "// 1. Angular Core",
  [ImportCategory.THIRD_PARTY]: "// 2. Third-party Libraries",
  [ImportCategory.INTERFACES_TYPES]: "// 3. Application Interfaces/Types",
  [ImportCategory.CONSTANTS_CONFIGS]: "// 4. Constants/Configs",
  [ImportCategory.SERVICES]: "// 5. Services",
  [ImportCategory.HELPERS]: "// 6. Helpers",
  [ImportCategory.COMPONENTS]: "// 7. Components",
  [ImportCategory.UNKNOWN]: "// 8. Unknown",
};
