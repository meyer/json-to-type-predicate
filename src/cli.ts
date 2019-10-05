#!/usr/bin/env node

import chalk from 'chalk';
import * as util from 'util';
import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
  Options,
} from 'quicktype-core';
import * as fs from 'fs';
import * as path from 'path';
import * as prettier from 'prettier';
import { CustomTypeScriptTargetLanguage } from './CustomTypescriptTargetLanguage';

class FormattedError extends Error {
  constructor(message: string, ...args: any[]) {
    super(util.format(message, ...args));
  }
}

class InfoError extends FormattedError {}

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const commonQuicktypeOptions: Partial<Options> = {
  alphabetizeProperties: true,
  inferBooleanStrings: false,
  inferDateTimes: false,
  inferEnums: true,
  inferIntegerStrings: false,
  inferMaps: true,
  inferUuids: false,
};

const joinLines = (lines: string[]): string =>
  lines.map(line => `${line}\n`).join('');

(async argv => {
  try {
    if (
      // if no args passed...
      argv.length === 0 ||
      // or you clearly need help...
      (argv.length === 1 &&
        (argv[0] === 'help' ||
          argv[0] === '-h' ||
          argv[0] === '-help' ||
          argv[0] === '--help'))
    ) {
      // ...then print out some info and bail.
      throw new InfoError(
        'How to use this thing: `%s [path(s) to JSON files]`',
        process.argv[1]
      );
    }

    if (argv.some(arg => !arg.endsWith('.json'))) {
      throw new Error('this thing only deals with files that end in `.json`');
    }

    const filePromises = argv.map(async filename => {
      const fileContent = await readFileAsync(
        path.join(process.cwd(), filename),
        'utf8'
      );

      const basename = path.basename(filename, '.json');

      const name = `${basename[0].toUpperCase()}${basename.slice(1)}`;
      const fnName = `is${name}`;
      const schemaName = `${basename}Schema`;

      const outputFilename = path.join(
        process.cwd(),
        path.dirname(filename),
        `${fnName}.ts`
      );

      const src = { name, samples: [fileContent] };

      const inputData = new InputData();

      await inputData.addSource('json', src, () =>
        jsonInputForTargetLanguage('schema', undefined, false)
      );

      const schemaResult = await quicktype({
        lang: 'schema',
        inputData,
        ...commonQuicktypeOptions,
      });

      const tsLang = new CustomTypeScriptTargetLanguage();

      const typescriptResult = await quicktype({
        lang: tsLang,
        inputData,
        ...commonQuicktypeOptions,
        rendererOptions: { 'just-types': 'true' },
      });

      const generatedSchema = joinLines(schemaResult.lines);
      const generatedTS = joinLines(typescriptResult.lines);

      const doc = `
      // @generated

      import * as Ajv from 'ajv';

      ${generatedTS}

      const ${schemaName} = ${generatedSchema};

      const ajv = new Ajv();
      ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));
      let validate: Ajv.ValidateFunction | undefined;

      export const ${fnName} = (data: any): data is ${name} => {
        if (!validate) {
          validate = ajv.compile(${schemaName});
        }

        // the cast here is necessary because Ajv.ValidateFunction's return value
        //   is typed for both sync and async cases.
        return validate(${schemaName}, data) as boolean;
      }
      `;

      await writeFileAsync(
        outputFilename,
        prettier.format(doc, { parser: 'typescript' }),
        'utf8'
      );
    });

    await Promise.all(filePromises);
  } catch (err) {
    if (err instanceof InfoError) {
      console.info(chalk.yellow.bold(err.message));
    } else if (err instanceof FormattedError || err instanceof Error) {
      console.error(chalk.red.bold(err.message));
    } else {
      console.error(chalk.red.bold(err + ''));
    }
  }
})(process.argv.slice(2));
