// @generated

import * as Ajv from "ajv";

export interface SeasonData {
  _links: Links;
  endDate: string;
  episodeOrder: number | null;
  id: number;
  image: Image | null;
  name: string;
  network: Network;
  number: number;
  premiereDate: string;
  summary: null | string;
  url: string;
  webChannel: null;
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

export interface Network {
  country: Country;
  id: number;
  name: string;
}

export interface Country {
  code: string;
  name: string;
  timezone: string;
}

const seasonDataSchema = {
  $schema: "http://json-schema.org/draft-06/schema#",
  type: "array",
  items: {
    $ref: "#/definitions/SeasonDatum"
  },
  definitions: {
    SeasonDatum: {
      type: "object",
      additionalProperties: false,
      properties: {
        _links: {
          $ref: "#/definitions/Links"
        },
        endDate: {
          type: "string",
          format: "date"
        },
        episodeOrder: {
          anyOf: [
            {
              type: "integer"
            },
            {
              type: "null"
            }
          ]
        },
        id: {
          type: "integer"
        },
        image: {
          anyOf: [
            {
              $ref: "#/definitions/Image"
            },
            {
              type: "null"
            }
          ]
        },
        name: {
          type: "string"
        },
        network: {
          $ref: "#/definitions/Network"
        },
        number: {
          type: "integer"
        },
        premiereDate: {
          type: "string",
          format: "date"
        },
        summary: {
          anyOf: [
            {
              type: "null"
            },
            {
              type: "string"
            }
          ]
        },
        url: {
          type: "string",
          format: "uri",
          "qt-uri-protocols": ["http"]
        },
        webChannel: {
          type: "null"
        }
      },
      required: [
        "_links",
        "endDate",
        "episodeOrder",
        "id",
        "image",
        "name",
        "network",
        "number",
        "premiereDate",
        "summary",
        "url",
        "webChannel"
      ],
      title: "SeasonDatum"
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
    Network: {
      type: "object",
      additionalProperties: false,
      properties: {
        country: {
          $ref: "#/definitions/Country"
        },
        id: {
          type: "integer"
        },
        name: {
          type: "string"
        }
      },
      required: ["country", "id", "name"],
      title: "Network"
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
    }
  }
};

const ajv = new Ajv();
ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-06.json"));
let validate: Ajv.ValidateFunction | undefined;

export const isSeasonData = (data: any): data is SeasonData => {
  if (!validate) {
    validate = ajv.compile(seasonDataSchema);
  }

  // the cast here is necessary because Ajv.ValidateFunction's return value
  //   is typed for both sync and async cases.
  return validate(seasonDataSchema, data) as boolean;
};
