import {
  RenderContext,
  TypeScriptTargetLanguage,
  getOptionValues,
  tsFlowOptions,
} from 'quicktype-core';

import { CustomTypeScriptRenderer } from './CustomTypeScriptRenderer';

export class CustomTypeScriptTargetLanguage extends TypeScriptTargetLanguage {
  protected makeRenderer(
    renderContext: RenderContext,
    untypedOptionValues: { [name: string]: any }
  ): CustomTypeScriptRenderer {
    return new CustomTypeScriptRenderer(
      this,
      renderContext,
      getOptionValues(tsFlowOptions, untypedOptionValues)
    );
  }
}
