// @generated

import * as Ajv from "ajv";

export interface SimpleObject {
  arrayOfObjects: ArrayOfObject[];
  hello: boolean;
}

export interface ArrayOfObject {
  key: string;
}

const simpleObjectSchema = {
  $schema: "http://json-schema.org/draft-06/schema#",
  $ref: "#/definitions/SimpleObject",
  definitions: {
    SimpleObject: {
      type: "object",
      additionalProperties: false,
      properties: {
        arrayOfObjects: {
          type: "array",
          items: {
            $ref: "#/definitions/ArrayOfObject"
          }
        },
        hello: {
          type: "boolean"
        }
      },
      required: ["arrayOfObjects", "hello"],
      title: "SimpleObject"
    },
    ArrayOfObject: {
      type: "object",
      additionalProperties: false,
      properties: {
        key: {
          type: "string"
        }
      },
      required: ["key"],
      title: "ArrayOfObject"
    }
  }
};

const ajv = new Ajv();
ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-06.json"));
let validate: Ajv.ValidateFunction | undefined;

export const isSimpleObject = (data: any): data is SimpleObject => {
  if (!validate) {
    validate = ajv.compile(simpleObjectSchema);
  }

  // the cast here is necessary because Ajv.ValidateFunction's return value
  //   is typed for both sync and async cases.
  return validate(simpleObjectSchema, data) as boolean;
};
