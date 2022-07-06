/**
 * Firebase supports:
 *  string, number, boolean, map, array, null, timestamp, geopoint, and reference
 *  we only need a subset of these
 */
export type fieldValuePrimitive = string | number | boolean;
export type fieldValueType = {
  [key: string]: fieldValuePrimitive | fieldValueType;
};

/**
 * dbType represents the full state of an arbitrary firestore DB
 * using a subset of the supported firestore types
 */
export type dbType = {
  // collections
  [key: string]: {
    // documents in collections
    [key: string]: {
      // document value
      fieldValues: fieldValueType;
      // subcollection recursion
      subCollections: dbType;
    };
  };
};
