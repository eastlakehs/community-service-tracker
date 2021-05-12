/**
 *  About: this file contains security unit testing in order to ensure that our app is secured from un-authorized outside access
 */

import * as firebase from "@firebase/testing";
import { AppOptions } from "@firebase/testing/dist/src/api";

const initDB = (auth: AppOptions["auth"]) => {
  const app = firebase.initializeTestApp({
    projectId: "community-ser",
    auth: auth,
  });
  return app.firestore();
};

const tokenValid = {
  firebase: {
    sign_in_provider: "password",
  },
  email_verified: true,
};

const tokenNotVerified = {
  firebase: {
    sign_in_provider: "password",
  },
  email_verified: false,
};

const tokenNotPasswordAuth = {
  firebase: {
    sign_in_provider: "something else",
  },
  email_verified: true,
};

describe("non-user docs should reject", () => {
  // signed in as student-a@lwsd.org
  const db = initDB({
    uid: "test-student",
    email: "student-a@lwsd.org",
    ...tokenValid,
  });

  // signed in as student-a, reading to student-b should fail
  it("reading to student-b as student-a", async () => {
    const nonUserDoc = db.collection("users").doc("student-b@lwsd.org");
    await firebase.assertFails(nonUserDoc.get());
  });
  // signed in as student-a, writing to student-b should fail
  it("writing to student-b as student-a", async () => {
    const nonUserDoc = db.collection("users").doc("student-b@lwsd.org");
    await firebase.assertFails(nonUserDoc.set({}));
  });
  // signed in as student-a, deleting to student-b should fail
  it("deleting to student-b as student-a", async () => {
    const nonUserDoc = db.collection("users").doc("student-b@lwsd.org");
    await firebase.assertFails(nonUserDoc.delete());
  });
});

describe("own docs should resolve", () => {
  // signed in as student-a@lwsd.org
  const db = initDB({
    uid: "test-student",
    email: "student-a@lwsd.org",
    ...tokenValid,
  });

  // signed in as student-a, reading to student-a should pass
  it("reading to student-a as student-a", async () => {
    const nonUserDoc = db.collection("users").doc("student-a@lwsd.org");
    expect(await firebase.assertSucceeds(nonUserDoc.get()));
  });
  // signed in as student-a, writing to student-a should pass
  it("writing to student-a as student-a", async () => {
    const nonUserDoc = db.collection("users").doc("student-a@lwsd.org");
    expect(await firebase.assertSucceeds(nonUserDoc.set({})));
  });
});

describe("own docs not resolve with non-verified email", () => {
  // signed in as student-a@lwsd.org
  const db = initDB({
    uid: "test-student",
    email: "student-a@lwsd.org",
    ...tokenNotVerified,
  });

  // signed in as student-a, reading to student-a should fail with non-verified email
  it("reading to student-a as student-a", async () => {
    const nonUserDoc = db.collection("users").doc("student-a@lwsd.org");
    expect(await firebase.assertFails(nonUserDoc.get()));
  });
  // signed in as student-a, writing to student-a should fail with non-verified email
  it("writing to student-a as student-a", async () => {
    const nonUserDoc = db.collection("users").doc("student-a@lwsd.org");
    expect(await firebase.assertFails(nonUserDoc.set({})));
  });
});

describe("own docs not resolve with non-password-based auth", () => {
  // signed in as student-a@lwsd.org
  const db = initDB({
    uid: "test-student",
    email: "student-a@lwsd.org",
    ...tokenNotPasswordAuth,
  });

  // signed in as student-a, reading to student-a should fail with non-password-based auth
  it("reading to student-a as student-a", async () => {
    const nonUserDoc = db.collection("users").doc("student-a@lwsd.org");
    expect(await firebase.assertFails(nonUserDoc.get()));
  });
  // signed in as student-a, writing to student-a should fail with non-password-based auth
  it("writing to student-a as student-a", async () => {
    const nonUserDoc = db.collection("users").doc("student-a@lwsd.org");
    expect(await firebase.assertFails(nonUserDoc.set({})));
  });
});

describe("non valid school email docs should reject", () => {
  // signed in as student-a@lwsd.org
  const db = initDB({
    uid: "test-student",
    email: "student-a@domain.org",
    ...tokenValid,
  });

  // non valid school email read should reject
  it("reading to student-a as student-a (@domain.org)", async () => {
    const nonUserDoc = db.collection("users").doc("student-a@domain.org");
    expect(await firebase.assertFails(nonUserDoc.get()));
  });
  // non lwsd school email write should reject
  it("writing to student-a as student-a (@domain.org)", async () => {
    const nonUserDoc = db.collection("users").doc("student-a@domain.org");
    expect(await firebase.assertFails(nonUserDoc.set({})));
  });
});

describe("bellevue college student emails should pass", () => {
  // signed in as student-a@bellevuecollege.edu
  const db = initDB({
    uid: "test-student",
    email: "student-a@bellevuecollege.edu",
    ...tokenValid,
  });

  // whitelisted non lwsd email read should pass
  it("reading to student-a as student-a (@bellevuecollege.edu)", async () => {
    const nonUserDoc = db
      .collection("users")
      .doc("student-a@bellevuecollege.edu");
    expect(await firebase.assertSucceeds(nonUserDoc.get()));
  });
  // whitelisted non lwsd email write should pass
  it("writing to student-a as student-a (@bellevuecollege.edu)", async () => {
    const nonUserDoc = db
      .collection("users")
      .doc("student-a@bellevuecollege.edu");
    expect(await firebase.assertSucceeds(nonUserDoc.set({})));
  });
});

describe("admins should be able to do anything", () => {
  // signed in as admin (eastlakekey@gmail.com)
  const db = initDB({
    uid: "test-student",
    email: "eastlakekey@gmail.com",
    ...tokenValid,
  });

  const randomDoc1 = db.collection("users").doc("dsaklk");
  const randomDoc2 = db.collection("dsagafdsa").doc("321fdssa");
  const randomDoc3 = db
    .collection("ddsadsadsa")
    .doc("fsakl.dfsa")
    .collection("dsak.k.dfsa")
    .doc("dsads.kvk");

  it("reading to anything as admin", async () => {
    expect(await firebase.assertSucceeds(randomDoc1.get()));
    expect(await firebase.assertSucceeds(randomDoc2.get()));
    expect(await firebase.assertSucceeds(randomDoc3.get()));
  });

  it("writing to anything as admin)", async () => {
    expect(await firebase.assertSucceeds(randomDoc1.set({})));
    expect(await firebase.assertSucceeds(randomDoc2.set({})));
    expect(await firebase.assertSucceeds(randomDoc3.set({})));
  });

  it("deleting anything as admin)", async () => {
    expect(await firebase.assertSucceeds(randomDoc1.delete()));
    expect(await firebase.assertSucceeds(randomDoc2.delete()));
    expect(await firebase.assertSucceeds(randomDoc3.delete()));
  });
});
