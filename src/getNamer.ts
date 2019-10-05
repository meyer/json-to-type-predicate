import { firstUpperWordStyle, splitIntoWords } from 'quicktype-core';
import { Namer } from 'quicktype-core/dist/Naming';
import { isES3IdentifierStart } from 'quicktype-core/dist/language/JavaScriptUnicodeMaps';
import { capitalize, combineWords } from 'quicktype-core/dist/support/Strings';

const pascalCaseNameStyle = (original: string): string => {
  const words = splitIntoWords(original);

  return combineWords(
    words,
    s => s,
    firstUpperWordStyle,
    firstUpperWordStyle,
    capitalize,
    s => s,
    '',
    isES3IdentifierStart
  );
};

const originalNameStyle = (orig: string) => orig;

export const getNamer = (
  name: string,
  prefixes: string[] = ['A', 'B', 'C']
): Namer => {
  const nameStyle =
    name === 'properties' ? originalNameStyle : pascalCaseNameStyle;

  return new Namer(name, nameStyle, prefixes);
};
