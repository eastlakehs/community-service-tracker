import { traverseDbObject } from "@ehs-service/firebase-firestore/src/import-utils/traverseDbObject.js";
import {
  dbType,
  fieldValueType,
} from "@ehs-service/firebase-firestore/src/import-utils/dbType.js";

const exampleDB: dbType = {
  collection1: {
    doc1: {
      fieldValues: {
        fielda: "a",
        fieldb: 1,
        fieldc: false,
        fieldd: {
          fielde: "e",
          fieldf: "f",
        },
      },
      subCollections: {
        collection2: {
          doc2: {
            fieldValues: {
              fieldg: 1,
            },
            subCollections: {},
          },
        },
        collection3: {},
      },
    },
  },
};

describe("traverseDbObject", () => {
  it("works on example case", () => {
    const visitedNodes: [string[], fieldValueType][] = [];
    traverseDbObject(exampleDB, (path, data) => {
      visitedNodes.push([path, data]);
    });

    expect(visitedNodes).toStrictEqual([
      [
        ["collection1", "doc1"],
        {
          fielda: "a",
          fieldb: 1,
          fieldc: false,
          fieldd: {
            fielde: "e",
            fieldf: "f",
          },
        },
      ],
      [
        ["collection1", "doc1", "collection2", "doc2"],
        {
          fieldg: 1,
        },
      ],
    ]);
  });
});
