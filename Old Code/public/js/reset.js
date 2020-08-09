function pswreset() {
    var emailAddress = document.getElementById('resetemail').value;
    resetWithFB(emailAddress);      
    alert('A reset email has been sent to '+ emailAddress);
    setTimeout(function(){ window.location.replace('index.html'); }, 1500);
   
}

async function resetWithFB(emailAddress) {
    var auth = firebase.auth();
    auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
        console.log('Email Sent');
        }).catch(function(error) {
        // An error happened.
        console.log(error);
        });
        return 1;
}