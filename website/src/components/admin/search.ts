import { profileAndEmail } from "../../Firebase/firestore/getListOfAllUsers";

/**
 *  Take input query from admin view search
 *  If each word in the query is a substring of some property in the profile then keep it
 */
export const filterAdminResult = (query: string, data: profileAndEmail[]) => {
  let dataRef = data;
  const wordinQuery = query.split(" ");
  for (let word of wordinQuery) {
    word = word.toLowerCase(); // don't care about casing of search
    dataRef = dataRef.filter((profile) => {
      let wordMatchesAProperty = false;
      for (let [, propertyValueUntyped] of Object.entries(profile)) {
        let propertyValue = propertyValueUntyped as string; //https://github.com/Microsoft/TypeScript/issues/26010 oof object.entries types are broken
        propertyValue = propertyValue.toLowerCase(); // don't care about casing of search
        if (propertyValue.indexOf(word) === 0) {
          wordMatchesAProperty = true;
        }
      }
      return wordMatchesAProperty;
    });
  }
  return dataRef;
};
