/**
 *  Used to render helpful UI based on email
 *  Should match server rules in Firebase/firestore.rules
 */
export const isAdmin = (userEmail: string | null | undefined): boolean =>
  userEmail
    ? [
        "daniel@sudzilouski.com",
        "eastlakekey@gmail.com",
        "s-jizhang@lwsd.org",
      ].includes(userEmail)
    : false;
