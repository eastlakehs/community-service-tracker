/**
 *  About: this file contains security unit testing in order to ensure that our app is secured from un-authorized outside access
 */

import {
  initializeTestEnvironment,
  TestEnvironmentConfig,
  TokenOptions,
  assertFails,
  assertSucceeds,
} from "@firebase/rules-unit-testing";

import { Firestore, getDoc, deleteDoc, setDoc, doc } from "firebase/firestore";

const conf: TestEnvironmentConfig = {
  projectId: "community-ser",
};

const initDB = async (
  email: string,
  authContext: TokenOptions
): Promise<Firestore> => {
  const testEnv = await initializeTestEnvironment(conf);
  const rulesEnv = testEnv.authenticatedContext(email, authContext);
  return rulesEnv.firestore();
};

const tokenValid: TokenOptions = {
  firebase: {
    sign_in_provider: "password",
  },
  email_verified: true,
};

const tokenNotVerified: TokenOptions = {
  firebase: {
    sign_in_provider: "password",
  },
  email_verified: false,
};

const tokenNotPasswordAuth: TokenOptions = {
  firebase: {
    sign_in_provider: "something else",
  },
  email_verified: true,
};

describe("non-user docs should reject", () => {
  // signed in as student-a@lwsd.org
  const db = initDB("student-a@lwsd.org", tokenValid);

  // signed in as student-a, reading to student-b should fail
  it("reading to student-b as student-a", async () => {
    await assertFails(getDoc(doc(await db, "users/student-b@lwsd.org")));
  });
  // signed in as student-a, writing to student-b should fail
  it("writing to student-b as student-a", async () => {
    const nonUserDoc = db.collection("users").doc("student-b@lwsd.org");
    await assertFails(nonUserDoc.set({}));
  });
  // signed in as student-a, deleting to student-b should fail
  it("deleting to student-b as student-a", async () => {
    const nonUserDoc = db.collection("users").doc("student-b@lwsd.org");
    await assertFails(nonUserDoc.delete());
  });
});

describe("own docs should resolve", () => {
  // signed in as student-a@lwsd.org
  const db = initDB("student-a@lwsd.org", tokenValid);

  // signed in as student-a, reading to student-a should pass
  it("reading to student-a as student-a", async () => {
    const nonUserDoc = db.collection("users").doc("student-a@lwsd.org");
    expect(await assertSucceeds(nonUserDoc.get()));
  });
  // signed in as student-a, writing to student-a should pass
  it("writing to student-a as student-a", async () => {
    const nonUserDoc = db.collection("users").doc("student-a@lwsd.org");
    expect(await assertSucceeds(nonUserDoc.set({})));
  });
});

describe("own docs not resolve with non-verified email", () => {
  // signed in as student-a@lwsd.org
  const db = initDB("student-a@lwsd.org", tokenNotVerified);

  // signed in as student-a, reading to student-a should fail with non-verified email
  it("reading to student-a as student-a", async () => {
    const nonUserDoc = db.collection("users").doc("student-a@lwsd.org");
    expect(await assertFails(nonUserDoc.get()));
  });
  // signed in as student-a, writing to student-a should fail with non-verified email
  it("writing to student-a as student-a", async () => {
    const nonUserDoc = db.collection("users").doc("student-a@lwsd.org");
    expect(await assertFails(nonUserDoc.set({})));
  });
});

describe("own docs not resolve with non-password-based auth", () => {
  // signed in as student-a@lwsd.org
  const db = initDB("student-a@lwsd.org", tokenNotPasswordAuth);

  // signed in as student-a, reading to student-a should fail with non-password-based auth
  it("reading to student-a as student-a", async () => {
    const nonUserDoc = db.collection("users").doc("student-a@lwsd.org");
    expect(await assertFails(nonUserDoc.get()));
  });
  // signed in as student-a, writing to student-a should fail with non-password-based auth
  it("writing to student-a as student-a", async () => {
    const nonUserDoc = db.collection("users").doc("student-a@lwsd.org");
    expect(await assertFails(nonUserDoc.set({})));
  });
});

describe("non valid school email docs should reject", () => {
  // signed in as student-a@lwsd.org
  const db = initDB("student-a@domain.org", tokenValid);

  // non valid school email read should reject
  it("reading to student-a as student-a (@domain.org)", async () => {
    const nonUserDoc = doc(await db, "users/student-a@domain.org");
    expect(await assertFails(getDoc(nonUserDoc)));
  });
  // non lwsd school email write should reject
  it("writing to student-a as student-a (@domain.org)", async () => {
    const nonUserDoc = doc(await db, "users/student-a@domain.org");
    expect(await assertFails(setDoc(nonUserDoc, {})));
  });
});

describe("bellevue college student emails should pass", () => {
  // signed in as student-a@bellevuecollege.edu
  const db = initDB("student-a@bellevuecollege.edu", tokenValid);

  // whitelisted non lwsd email read should pass
  it("reading to student-a as student-a (@bellevuecollege.edu)", async () => {
    const nonUserDoc = doc(await db, "users/student-a@bellevuecollege.edu");
    expect(await assertSucceeds(getDoc(nonUserDoc)));
  });
  // whitelisted non lwsd email write should pass
  it("writing to student-a as student-a (@bellevuecollege.edu)", async () => {
    const nonUserDoc = doc(await db, "users/student-a@bellevuecollege.edu");
    expect(await assertSucceeds(setDoc(nonUserDoc, {})));
  });
});

describe("admins should be able to do anything", () => {
  // signed in as admin (eastlakekey@gmail.com)
  const db = initDB("eastlakekey@gmail.com", tokenValid);

  const randomDoc1 = (firestore: Firestore) => doc(firestore, "users/dsaklk");
  const randomDoc2 = (firestore: Firestore) =>
    doc(firestore, "dsagafdsa/321fdssa");
  const randomDoc3 = (firestore: Firestore) =>
    doc(firestore, "ddsadsadsa/fsakl.dfsa/dsak.k.dfsa/dsads.kvk");

  it("reading to anything as admin", async () => {
    expect(await assertSucceeds(getDoc(randomDoc1(await db))));
    expect(await assertSucceeds(getDoc(randomDoc2(await db))));
    expect(await assertSucceeds(getDoc(randomDoc3(await db))));
  });

  it("writing to anything as admin", async () => {
    expect(await assertSucceeds(setDoc(randomDoc1(await db), {})));
    expect(await assertSucceeds(setDoc(randomDoc2(await db), {})));
    expect(await assertSucceeds(setDoc(randomDoc3(await db), {})));
  });

  it("deleting anything as admin", async () => {
    expect(await assertSucceeds(deleteDoc(randomDoc1(await db))));
    expect(await assertSucceeds(deleteDoc(randomDoc2(await db))));
    expect(await assertSucceeds(deleteDoc(randomDoc3(await db))));
  });
});
