import { initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { dbType } from "@ehs-service/firebase-firestore/src/import-utils/dbType.js";
import {assert, expect, should} from "chai"
import { importToFirestore } from "@ehs-service/firebase-firestore/src/import-utils/importToFirestore.js";
import { exportFromFirestore } from "@ehs-service/firebase-firestore/src/import-utils/exportFromFirestore.js";

import { initializeApp, deleteApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const exampleDB1: dbType = {
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
      },
    },
  },
};

const exampleDB2: dbType = {
  collection1: {
    doc1: {
      fieldValues: {
        a: 1,
      },
      subCollections: {
        collection2: {
          doc2: {
            fieldValues: {
              a: 2,
            },
            subCollections: {
              collection3: {
                doc3: {
                  fieldValues: {
                    a: 3,
                  },
                  subCollections: {},
                },
              },
            },
          },
        },
      },
    },
  },
};

const importExportIdentity = async (seedDb: dbType) => {
  const testEnv = await initializeTestEnvironment({
    projectId: "community-ser",
  });
  await testEnv.withSecurityRulesDisabled(async (context) => {
    await importToFirestore(seedDb, context.firestore());
  });

  // admin sdk needed for export
  const app = initializeApp({
    projectId: "community-ser",
  });

  const exportData = await exportFromFirestore(getFirestore(app));
  console.log(JSON.stringify(exportData, null, 2));
  await deleteApp(app);
  await testEnv.clearFirestore();
  await testEnv.cleanup();
  expect(exportData).to.deep.equal(seedDb);
};

describe("test importToFirestore and exportToFirestore", () => {
  it("identity holds for import/export", async () => {
    await importExportIdentity(exampleDB1);
    await importExportIdentity(exampleDB2);
  });
});
