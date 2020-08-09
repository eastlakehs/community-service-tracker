// Get the modal
var signupmodal = document.getElementById('signupmodal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == signupmodal) {
    signupmodal.style.display = "none";
  }
}
var loginmodal = document.getElementById('loginmodal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == loginmodal) {
    loginmodal.style.display = "none";
  }
}

function signup() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("psw").value;
    var pswRepeat = document.getElementById("psw-repeat").value;
    if(password == pswRepeat) {
        if(password.length >= 6) {
            if(email.endsWith("@lwsd.org") && email != '') {
                let errors = registerWithFB(email, password);
                console.log(errors);
                if(!errors) {       
                    setTimeout(function(){ window.location.replace('track.html'); }, 1500);
                }
            } else {
                alert('You need to use an lwsd.org email address');
            }
        } else {
            alert('Passwords must be at least 6 characters')
        }
    } else {
        alert('The entered passwords do not match');
    }
}

function registerWithFB(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        console.log(errorCode);
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
        return errorCode;
    });
}

function login() {
    var email = document.getElementById("loginemail").value;
    var password = document.getElementById("loginpsw").value;
    console.log(password);
    let errors = loginWithFB(email, password);
    console.log(errors);
    if(errors != 'auth/wrong-password') {       
        
        setTimeout(function(){ var user = firebase.auth().currentUser;
            if (user) {
                console.log('user signed in '+ user);
            } else {
            console.log('no user signed in');
            }
     }, 1500);
     db.collection('activities').add({
        GraduationYear: '2020',
        ActivityName: 'hi',
        CountForKeyClub: true,
        KeyClubEvent: false,
        ActivityDate: '2/2/20',
        ActivityDescription: 'asd',
        Hours: 2,
        ContactName: 'asdwads',
        ContactPhone: '234234',
        Accurate: true
    });
    console.log('add finished')
        // setTimeout(function(){ window.location.replace('track.html'); }, 1500);
    } else {
        alert('Username or password is incorrect. You may need to wait and try again in a few minutes');
    }
}

async function loginWithFB(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        console.log(errorCode);
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
        return errorCode;
    });
}

// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//         document.getElementById('loginout').innerHTML = 
//         '<a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" onclick="document.getElementById(\'loginmodal\').style.display=\'block\'">Login</a>';
//     } else {
//         '<a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" onclick="document.getElementById(\'loginmodal\').style.display=\'block\'">Log Out</a>';
//     }
//   });
//   <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" onclick="document.getElementById('loginmodal').style.display='block'">Login</a></li>
