import { Name, TypeScriptRenderer } from 'quicktype-core';
import { EnumType, Type, ClassType } from 'quicktype-core/dist/Type';
import { utf16StringEscape } from 'quicktype-core/dist/support/Strings';
import { directlyReachableSingleNamedType } from 'quicktype-core/dist/TypeUtils';

export class CustomTypeScriptRenderer extends TypeScriptRenderer {
  protected namedTypeToNameForTopLevel(type: Type): Type | undefined {
    return directlyReachableSingleNamedType(type);
  }

  protected makeNameForTopLevel(
    t: Type,
    givenName: string,
    maybeNamedType: Type | undefined
  ): Name {
    return super.makeNameForTopLevel(t, givenName, maybeNamedType);
  }

  protected emitEnum(e: EnumType, enumName: Name): void {
    this.emitDescription(this.descriptionForType(e));

    this.emitLine('export type ', enumName, ' = ');
    this.forEachEnumCase(e, 'none', (name, jsonName) => {
      this.emitLine(`| "${utf16StringEscape(jsonName)}"`);
    });
    this.emitLine(';');
  }

  protected emitClassBlock(c: ClassType, className: Name): void {
    this.emitBlock(['export interface ', className, ' '], '', () => {
      this.emitClassBlockBody(c);
    });
  }
}
