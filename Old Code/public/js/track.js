var config = {
    apiKey: "AIzaSyDNH42tsDocjFRXO28BZHm-_SWVFPptuqQ",
    authDomain: "eastlakecommunityservice.firebaseapp.com",
    databaseURL: "https://eastlakecommunityservice.firebaseio.com",
    projectId: "eastlakecommunityservice",
    storageBucket: "eastlakecommunityservice.appspot.com"
    // messagingSenderId: "sender-id",
    // appId: "app-id",
  };
firebase.initializeApp(config);
const db = firebase.firestore();
// setTimeout(function(){ 
//     firebase.auth().signInWithEmailAndPassword('hi@lwsd.org', 'testing').catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         console.log(errorCode);
//         var errorMessage = error.message;
//         console.log(errorMessage);
//     });
// }, 1500);
// console.log('should be signed in');
// var user = firebase.auth().currentUser;
// if (user) {
//     console.log('user signed in '+ user);
// } else {
//   console.log('no user signed in');
// }

function saveData() {
    console.log('clicked btn');
    // const cafeList = document.querySelector('#cafe-list');
    const form = document.querySelector('#activityform');

    // create element & render cafe
    // function renderCafe(doc){
    //     let li = document.createElement('li');
    //     let name = document.createElement('span');
    //     let city = document.createElement('span');

    //     li.setAttribute('data-id', doc.id);
    //     name.textContent = doc.data().name;
    //     city.textContent = doc.data().city;

    //     li.appendChild(name);
    //     li.appendChild(city);

    //     cafeList.appendChild(li);
    // }

    // getting data
    // db.collection('activities').get().then(snapshot => {
    //     snapshot.docs.forEach(doc => {
    //         renderCafe(doc);
    //     });
    // });

    // saving data
    console.log(form.accuracy.value);

    db.collection('activities').add({
        GraduationYear: form.gradYear.value,
        ActivityName: form.activityname.value,
        CountForKeyClub: form.count.value,
        KeyClubEvent: form.event.value,
        ActivityDate: form.date.value,
        ActivityDescription: form.description.value,
        Hours: form.hours.value,
        ContactName: form.contactname.value,
        ContactPhone: form.contactphone.value,
        Accurate: form.accuracy.value
    });
    console.log('add finished')
    // form.name.value = '';
    // form.city.value = '';
}