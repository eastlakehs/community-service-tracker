/** Type of our entire Firestore database */
export type dataJsonType = {
  users: {
    [key: string]: {
      entries?: {
        [key: string]: {
          _data: {
            Date: string;
            NHS: "Yes" | "No";
            Hours: string;
            Description: string;
            contactName: string;
            NHSofficer: string;
            Name: string;
            contactPhone: string;
            KeyClub: "Yes" | "No";
          };
        };
      };
      profile?: {
        info: {
          _data: {
            graduationYear: string;
            lastName: string;
            firstName: string;
          };
        };
      };
      _data: {};
    };
  };
};
