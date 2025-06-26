import { ImportCategory } from "./categories";

export const IMPORT_PATTERNS: Record<ImportCategory, RegExp> = {
  [ImportCategory.ANGULAR_CORE]: /^@angular\//,
  [ImportCategory.THIRD_PARTY]: /^(@(?!angular)[^/]+\/|[^@\.\/])/,
  [ImportCategory.INTERFACES_TYPES]: /\.(model|interface|enum|type|dto)$/,
  [ImportCategory.CONSTANTS_CONFIGS]: /\.(const|config|environment)$/,
  [ImportCategory.SERVICES]: /\.service$/,
  [ImportCategory.HELPERS]: /\.(util|helper|functions?|utils)$/,
  [ImportCategory.COMPONENTS]: /\.component$/,
  [ImportCategory.UNKNOWN]: /.*/,
};
