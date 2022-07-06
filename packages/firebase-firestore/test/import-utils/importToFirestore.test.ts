import { initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { Settings } from "firebase/firestore";

import { dbType } from "@ehs-service/firebase-firestore/src/import-utils/dbType.js";
import { importToFirestore } from "@ehs-service/firebase-firestore/src/import-utils/importToFirestore.js";

describe("test importToFirestore", () => {
  it("imports an example DB correctly", async () => {
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
    const testEnv = await initializeTestEnvironment({
      projectId: "community-ser",
    });

    const settings: firebase.firestore.Settings = {};

    return await testEnv.withSecurityRulesDisabled(async (context) => {
      await importToFirestore(exampleDB, context.firestore({}));
    });
  });
});
//FIREBASE_EMULATOR_HUB
