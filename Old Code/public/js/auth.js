let isAdmin = false;
// // add admin cloud function
// const adminForm = document.querySelector('.admin-actions');
// adminForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const adminEmail = document.querySelector('#admin-email').value;
//   const addAdminRole = functions.httpsCallable('addAdminRole');
//   addAdminRole({ email: adminEmail }).then(result => {
//     console.log(result);
//   });
// });
let signedInUser;
let currentUser = '';
// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    user.getIdTokenResult().then(idTokenResult => {
      if (user.uid == 'AlCcpbFqFGepuFEfbtvEGkFjTGP2') {
        isAdmin = true;
      } else {
        isAdmin = false;
      }
      setupUI(user);
      currentUser = firebase.auth().currentUser;
    });
    refreshActivities();
    console.log('is admin? ' + isAdmin);
    if(!isAdmin){
      let data = [];
      db.collection("activities").where("UserID", "==", user.uid).orderBy("ActivityDate", "desc")
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // console.log('querySnapshot: ' + JSON.stringify(doc));
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              data.push(doc.data());
          });
          setupActivities(data);
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
    }
  } else {
    setupUI();
    setupActivities([]);
  }
});

const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let countForKeyClub = createForm.count.checked;
  if(countForKeyClub == true){
    countForKeyClub = 'Yes';
  } else{
    countForKeyClub = 'No';
  }
  let keyClubEvent = createForm.event.checked;
  if(keyClubEvent == true){
    keyClubEvent = 'Yes';
  } else{
    keyClubEvent = 'No';
  }
  db.collection('activities').add({
    UserID: currentUser.uid,
    // FirstName: currentUserFirstName,
    // LastName: currentUserLastName,
    GraduationYear: signedInUser.graduationyear,
    ActivityName: createForm.activityname.value,
    CountForKeyClub: countForKeyClub,
    KeyClubEvent: keyClubEvent,
    ActivityDate: createForm.date.value,
    ActivityDescription: createForm.description.value,
    Hours: createForm.hours.value,
    ContactName: createForm.contactname.value,
    ContactPhone: createForm.contactphone.value,
    Accurate: createForm.accurate.value
}).then(() => {
    // close the create modal & reset form
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
    refreshActivities();
  }).catch(err => {
    console.log(err.message);
  });
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user & add firestore data
  if(email.endsWith("@lwsd.org")) {
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      return db.collection('users').doc(cred.user.uid).set({
        firstname: signupForm['firstname'].value,
        lastname: signupForm['lastname'].value,
        graduationyear: signupForm['gradyear'].value
      });
    }).then(() => {
      // close the signup modal & reset form
      const modal = document.querySelector('#modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset();
      signupForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
      signupForm.querySelector('.error').innerHTML = err.message;
    });
    } else {
      alert('You need to use an lwsd.org email address');
    }
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
  location.reload();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  
  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML = '';
    db.collection('activites').onSnapshot(snapshot => {
      refreshUI(snapshot.docs);
    }, err => console.log(err.message));
  }).catch(err => {
    loginForm.querySelector('.error').innerHTML = err.message;
  });
});


function refreshActivities() {
  console.log('refreshing...')
  let data = [];
  if(currentUser && !isAdmin){
    db.collection("activities").where("UserID", "==", currentUser.uid).orderBy("ActivityDate", "desc")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // console.log('querySnapshot: ' + JSON.stringify(doc));
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            data.push(doc.data());
        });
        setupActivities(data);
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }
};



function refreshUI(data) {
  console.log('in refresh');
  console.log('user = ' +firebase.auth().currentUser.uid);
  const activityList = document.querySelector('.activities');
  console.log('activitylist '+activityList.childElementCount);

  if (data.length) {
    console.log('data longer than 1: ' + data);
    let html = '';
    data.forEach(doc => {
      const activity = doc.data();
      console.log('activity '+activity);
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${activities.ActivityName} </div>
          <div class="collapsible-body white"> ${activities.ActivityDescription} </div>
        </li>
      `;
      html += li;
    });
    activityList.innerHTML = html
  } else {
    console.log('nope')
    activityList.innerHTML = '<div style="color: white;"><h5 class="center-align">There are no logged activities to display</h5></div>';
  }

};