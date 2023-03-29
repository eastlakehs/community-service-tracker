/**
 *  About: this file contains security unit testing in order to ensure that our app is secured from un-authorized outside access
 */

import {
  initializeTestEnvironment,
  TokenOptions,
  assertFails,
  assertSucceeds,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";

import { assert, expect, should } from "chai";

import {
  getStorage,
  ref,
  deleteObject,
  getStream,
  uploadBytes,
  FirebaseStorage,
  getDownloadURL,
  uploadString,
} from "firebase/storage";

let testEnv: RulesTestEnvironment | undefined = undefined;
beforeEach(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: "community-ser",
    hub: { host: "127.0.0.1", port: 4400 },
    storage: { host: "127.0.0.1", port: 5002 },
  });
});

afterEach(async () => {
  await testEnv!.clearStorage();
  await testEnv!.cleanup();
});

const initStorage = (
  email: string,
  authContext: TokenOptions
): FirebaseStorage => {
  const rulesEnv = testEnv!.authenticatedContext(email, {
    email: email,
    ...authContext,
  });
  return rulesEnv.storage("community-ser.appspot.com");
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
    sign_in_provider: "anonymous",
  },
  email_verified: true,
};

describe("non-user storage items should reject", () => {
  // signed in as student-a@lwsd.org
  const storage = () => initStorage("student-a@lwsd.org", tokenValid);

  // signed in as student-a, reading to student-b should fail
  it("reading to student-b as student-a", async () => {
    await assertFails(
      getDownloadURL(ref(storage(), "pictures/student-b@lwsd.org"))
    );
  });
  // signed in as student-a, writing to student-b should fail
  it("writing to student-b as student-a", async () => {
    const nonUserDoc = ref(storage(), "pictures/student-b@lwsd.org");
    await assertFails(uploadString(nonUserDoc, "foobar"));
  });
  // signed in as student-a, deleting to student-b should fail
  it("deleting to student-b as student-a", async () => {
    const nonUserDoc = ref(storage(), "pictures/student-b@lwsd.org");
    await assertFails(deleteObject(nonUserDoc));
  });
});

describe("own storage items docs should resolve", () => {
  // signed in as student-a@lwsd.org
  const storage = () => initStorage("student-a@lwsd.org", tokenValid);

  // signed in as student-a, writing to student-a should pass
  it("writing to student-a as student-a", async () => {
    const userDoc = ref(storage(), "pictures/student-a@lwsd.org");
    expect(await assertSucceeds(uploadString(userDoc, "foobar")));
  });

  // signed in as student-a, reading to student-a should pass
  it("reading to student-a as student-a", async () => {
    const nonUserDoc = ref(storage(), "pictures/student-a@lwsd.org");
    expect(
      await assertSucceeds(
        getDownloadURL(ref(storage(), "pictures/student-a@lwsd.org"))
      )
    );
  });
});
