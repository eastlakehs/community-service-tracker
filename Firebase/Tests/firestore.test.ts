// root
import * as firebase from "@firebase/testing";

describe("non-user docs should reject", () => {
  // signed in as student-a@lwsd.org
  const app = firebase.initializeTestApp({
    projectId: "community-ser",
    auth: { uid: "test-student", email: "student-a@lwsd.org" },
  });
  const db = app.firestore();

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
  const app = firebase.initializeTestApp({
    projectId: "community-ser",
    auth: { uid: "test-student", email: "student-a@lwsd.org" },
  });
  const db = app.firestore();

  // signed in as student-a, reading to student-b should fail
  it("reading to student-a as student-a", async () => {
    const nonUserDoc = db.collection("users").doc("student-a@lwsd.org");
    expect(await firebase.assertSucceeds(nonUserDoc.get()));
  });
  // signed in as student-a, writing to student-b should fail
  it("writing to student-a as student-a", async () => {
    const nonUserDoc = db.collection("users").doc("student-a@lwsd.org");
    expect(await firebase.assertSucceeds(nonUserDoc.set({})));
  });
});

describe("non lwsd docs should reject", () => {
  // signed in as student-a@lwsd.org
  const app = firebase.initializeTestApp({
    projectId: "community-ser",
    auth: { uid: "test-student", email: "student-a@domain.org" },
  });
  const db = app.firestore();

  // signed in as student-a, reading to student-b should fail
  it("reading to student-a as student-a", async () => {
    const nonUserDoc = db.collection("users").doc("student-a@domain.org");
    expect(await firebase.assertFails(nonUserDoc.get()));
  });
  // signed in as student-a, writing to student-b should fail
  it("writing to student-a as student-a", async () => {
    const nonUserDoc = db.collection("users").doc("student-a@domain.org");
    expect(await firebase.assertFails(nonUserDoc.set({})));
  });
});
