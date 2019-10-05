// @generated

import * as Ajv from "ajv";

export interface CastData {
  character: Character;
  person: Person;
  self: boolean;
  voice: boolean;
}

export interface Character {
  _links: Links;
  id: number;
  image: Image;
  name: string;
  url: string;
}

export interface Links {
  self: Self;
}

export interface Self {
  href: string;
}

export interface Image {
  medium: string;
  original: string;
}

export interface Person {
  _links: Links;
  birthday: string;
  country: Country;
  deathday: null;
  gender: Gender;
  id: number;
  image: Image;
  name: string;
  url: string;
}

export interface Country {
  code: string;
  name: string;
  timezone: string;
}

export type Gender = "Female" | "Male";

const castDataSchema = {
  $schema: "http://json-schema.org/draft-06/schema#",
  type: "array",
  items: {
    $ref: "#/definitions/CastDatum"
  },
  definitions: {
    CastDatum: {
      type: "object",
      additionalProperties: false,
      properties: {
        character: {
          $ref: "#/definitions/Character"
        },
        person: {
          $ref: "#/definitions/Person"
        },
        self: {
          type: "boolean"
        },
        voice: {
          type: "boolean"
        }
      },
      required: ["character", "person", "self", "voice"],
      title: "CastDatum"
    },
    Character: {
      type: "object",
      additionalProperties: false,
      properties: {
        _links: {
          $ref: "#/definitions/Links"
        },
        id: {
          type: "integer"
        },
        image: {
          $ref: "#/definitions/Image"
        },
        name: {
          type: "string"
        },
        url: {
          type: "string",
          format: "uri",
          "qt-uri-protocols": ["http"]
        }
      },
      required: ["_links", "id", "image", "name", "url"],
      title: "Character"
    },
    Links: {
      type: "object",
      additionalProperties: false,
      properties: {
        self: {
          $ref: "#/definitions/Self"
        }
      },
      required: ["self"],
      title: "Links"
    },
    Self: {
      type: "object",
      additionalProperties: false,
      properties: {
        href: {
          type: "string",
          format: "uri",
          "qt-uri-protocols": ["http"]
        }
      },
      required: ["href"],
      title: "Self"
    },
    Image: {
      type: "object",
      additionalProperties: false,
      properties: {
        medium: {
          type: "string",
          format: "uri",
          "qt-uri-protocols": ["http"],
          "qt-uri-extensions": [".jpg"]
        },
        original: {
          type: "string",
          format: "uri",
          "qt-uri-protocols": ["http"],
          "qt-uri-extensions": [".jpg"]
        }
      },
      required: ["medium", "original"],
      title: "Image"
    },
    Person: {
      type: "object",
      additionalProperties: false,
      properties: {
        _links: {
          $ref: "#/definitions/Links"
        },
        birthday: {
          type: "string",
          format: "date"
        },
        country: {
          $ref: "#/definitions/Country"
        },
        deathday: {
          type: "null"
        },
        gender: {
          $ref: "#/definitions/Gender"
        },
        id: {
          type: "integer"
        },
        image: {
          $ref: "#/definitions/Image"
        },
        name: {
          type: "string"
        },
        url: {
          type: "string",
          format: "uri",
          "qt-uri-protocols": ["http"]
        }
      },
      required: [
        "_links",
        "birthday",
        "country",
        "deathday",
        "gender",
        "id",
        "image",
        "name",
        "url"
      ],
      title: "Person"
    },
    Country: {
      type: "object",
      additionalProperties: false,
      properties: {
        code: {
          type: "string"
        },
        name: {
          type: "string"
        },
        timezone: {
          type: "string"
        }
      },
      required: ["code", "name", "timezone"],
      title: "Country"
    },
    Gender: {
      type: "string",
      enum: ["Male", "Female"],
      title: "Gender"
    }
  }
};

const ajv = new Ajv();
ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-06.json"));
let validate: Ajv.ValidateFunction | undefined;

export const isCastData = (data: any): data is CastData => {
  if (!validate) {
    validate = ajv.compile(castDataSchema);
  }

  // the cast here is necessary because Ajv.ValidateFunction's return value
  //   is typed for both sync and async cases.
  return validate(castDataSchema, data) as boolean;
};
