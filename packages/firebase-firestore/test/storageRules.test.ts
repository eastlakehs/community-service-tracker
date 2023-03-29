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

  import {assert, expect, should} from "chai"
  
  import { getStorage, ref, deleteObject, getStream, uploadBytes, FirebaseStorage, getDownloadURL, uploadString } from "firebase/storage";

  
  let testEnv: RulesTestEnvironment | undefined = undefined;
  beforeEach(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: "community-ser",
      hub: {host: "127.0.0.1",      port:4400},
      storage:{ host: "127.0.0.1",  port:5002},
    });
  });
  
  afterEach(async () => {
    await testEnv!.clearStorage();
    await testEnv!.cleanup();
  });
  
  const initStorage = (email: string, authContext: TokenOptions): FirebaseStorage => {
    const rulesEnv = testEnv!.authenticatedContext(email, {
      email: email,
      ...authContext,
    });
    return rulesEnv.storage();
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
      await assertFails(getDownloadURL(ref(storage(), "users/student-b@lwsd.org")));
    });
    // signed in as student-a, writing to student-b should fail
    it("writing to student-b as student-a", async () => {
      const nonUserDoc = ref(storage(), "users/student-b@lwsd.org");
      await assertFails(uploadString(nonUserDoc, "foobar"));
    });
    // signed in as student-a, deleting to student-b should fail
    it("deleting to student-b as student-a", async () => {
      const nonUserDoc = ref(storage(), "users/student-b@lwsd.org");
      await assertFails(deleteObject(nonUserDoc));
    });
  });

  
  /*
  describe("own docs should resolve", () => {
    // signed in as student-a@lwsd.org
    const storage = () => initStorage("student-a@lwsd.org", tokenValid);
  
    // signed in as student-a, reading to student-a should pass
    it("reading to student-a as student-a", async () => {
      const nonUserDoc = doc(db(), "users/student-a@lwsd.org");
      expect(await assertSucceeds(getDoc(nonUserDoc)));
    });
    // signed in as student-a, writing to student-a should pass
    it("writing to student-a as student-a", async () => {
      const nonUserDoc = doc(db(), "users/student-a@lwsd.org");
      expect(await assertSucceeds(setDoc(nonUserDoc, {})));
    });
  });
  */
   /*
  
  describe("own docs not resolve with non-verified email", () => {
    // signed in as student-a@lwsd.org
    const storage = () => initStorage("student-a@lwsd.org", tokenNotVerified);
  
    // signed in as student-a, reading to student-a should fail with non-verified email
    it("reading to student-a as student-a", async () => {
      const nonUserDoc = doc(db(), "users/student-a@lwsd.org");
      expect(await assertFails(getDoc(nonUserDoc)));
    });
    // signed in as student-a, writing to student-a should fail with non-verified email
    it("writing to student-a as student-a", async () => {
      const nonUserDoc = doc(db(), "users/student-a@lwsd.org");
      expect(await assertFails(setDoc(nonUserDoc, {})));
    });
  });
  
  describe("own docs not resolve with non-password-based auth", () => {
    // signed in as student-a@lwsd.org
    const storage = () => initStorage("student-a@lwsd.org", tokenNotPasswordAuth);
  
    // signed in as student-a, reading to student-a should fail with non-password-based auth
    it("reading to student-a as student-a", async () => {
      const nonUserDoc = doc(db(), "users/student-a@lwsd.org");
      expect(await assertFails(getDoc(nonUserDoc)));
    });
    // signed in as student-a, writing to student-a should fail with non-password-based auth
    it("writing to student-a as student-a", async () => {
      const nonUserDoc = doc(db(), "users/student-a@lwsd.org");
      expect(await assertFails(setDoc(nonUserDoc, {})));
    });
  });
  
  describe("non valid school email docs should reject", () => {
    // signed in as student-a@lwsd.org
    const storage = () => initStorage("student-a@domain.org", tokenValid);
  
    // non valid school email read should reject
    it("reading to student-a as student-a (@domain.org)", async () => {
      const nonUserDoc = doc(db(), "users/student-a@domain.org");
      expect(await assertFails(getDoc(nonUserDoc)));
    });
    // non lwsd school email write should reject
    it("writing to student-a as student-a (@domain.org)", async () => {
      const nonUserDoc = doc(db(), "users/student-a@domain.org");
      expect(await assertFails(setDoc(nonUserDoc, {})));
    });
  });
  
  describe("bellevue college student emails should pass", () => {
    // signed in as student-a@bellevuecollege.edu
    const storage = () => initStorage("student-a@bellevuecollege.edu", tokenValid);
  
    // whitelisted non lwsd email read should pass
    it("reading to student-a as student-a (@bellevuecollege.edu)", async () => {
      const nonUserDoc = doc(db(), "users/student-a@bellevuecollege.edu");
      expect(await assertSucceeds(getDoc(nonUserDoc)));
    });
    // whitelisted non lwsd email write should pass
    it("writing to student-a as student-a (@bellevuecollege.edu)", async () => {
      const nonUserDoc = doc(db(), "users/student-a@bellevuecollege.edu");
      expect(await assertSucceeds(setDoc(nonUserDoc, {})));
    });
  });
  
  describe("admins should be able to do anything", () => {
    // signed in as admin (eastlakekey@gmail.com)
    const storage = () => initStorage("eastlakekey@gmail.com", tokenValid);
  
    const randomDoc1 = () => doc(db(), "users/dsaklk");
    const randomDoc2 = () => doc(db(), "dsagafdsa/321fdssa");
    const randomDoc3 = () => doc(db(), "ddsadsa/fsakl.dsa/dsak.k.dfsa/dsads.kvk");
  
    it("reading to anything as admin", async () => {
      expect(await assertSucceeds(getDoc(randomDoc1())));
      expect(await assertSucceeds(getDoc(randomDoc2())));
      expect(await assertSucceeds(getDoc(randomDoc3())));
    });
  
    it("writing to anything as admin", async () => {
      expect(await assertSucceeds(setDoc(randomDoc1(), {})));
      expect(await assertSucceeds(setDoc(randomDoc2(), {})));
      expect(await assertSucceeds(setDoc(randomDoc3(), {})));
    });
  
    it("deleting anything as admin", async () => {
      expect(await assertSucceeds(deleteDoc(randomDoc1())));
      expect(await assertSucceeds(deleteDoc(randomDoc2())));
      expect(await assertSucceeds(deleteDoc(randomDoc3())));
    });
  });
  */
 

  