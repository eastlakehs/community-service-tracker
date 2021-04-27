import { dataJsonType } from "../../../ReportGeneration/src/data";
/**
 *  Some data from the database get read a lot but dosn't necessarily need fast read access
 *  For example, the admin page requres a list of all student names/emails
 *  However, querying the entire database each time would be expensive
 *  Instead, we can bundle the result into a single db entry
 *  Cache bundles updating once every 24 hours should be reasonble for most cases
 *
 *
 *  Note:
 *  I am aware of an official method for doing this (https://firebase.google.com/docs/firestore/bundles)
 *  However, the official method only allows for bundling queries
 *  Since the profile info is nested under a sub-collection, I don't see a way to make this work with solely bundling queries
 *
 *  WARNING:
 *  The databaseClone object should not be mutated to allow for potentially multiple cache builders to run on the same database object
 */
export type ICacheBuilder<T> = (databaseClone: dataJsonType) => T;
