// DOM elements
const activityList = document.querySelector('.activities');
const runningTotal = document.querySelector('.runningtotal');
const loginmessage = document.querySelector('.loginmessage');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin-actions');
let adminBlock = document.getElementById('allactivities');
let studentTotals = document.getElementById('studenttotals');
let hourCategories = document.getElementById('hourcategories');
const trackTime = document.querySelectorAll('.tracktime');
let userList = [];
let activityData = [];
let currentStudentTotalHours = 0;
let currentStudentActivityList = [];
// let isAdmin = false;

const setupUI = (user) => {
  if (user) {
    console.log('user deets: ' + JSON.stringify(user, null, 2));
    if (user.uid == 'AlCcpbFqFGepuFEfbtvEGkFjTGP2') {
      isAdmin = true;
      adminItems.forEach(item => item.style.display = 'block');
    } else {
      isAdmin = false;
      adminItems.forEach(item => item.style.display = 'none');
    }
    // account info
    db.collection('users').doc(user.uid).get().then(doc => {
      console.log('account info doc: ' + doc);
      let userData = doc.data();
      signedInUser = userData;
      let html = ''
      if(isAdmin){
        html += `
          <div>Logged in as ${user.email}</div>
          <div class="pink-text">${isAdmin ? 'Admin' : ''}</div>`;
      } else{
        html += `
        <div>Logged in as ${user.email}</div>
        <div>Graduation year: ${userData.graduationyear}</div>`;
      } 
      accountDetails.innerHTML = html;
    });
    // toggle user UI elements
    loginmessage.innerHTML = '';
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
    if(isAdmin){
      trackTime.forEach(item => item.style.display = 'none');
    }

    //setup admin view
    if(isAdmin){
      console.log('is admin here');
      getAdminActivityData();
    }
  } else {
      console.log('user is signed out');
      loginmessage.innerHTML = '<div style="color: white;"><h5 class="center-align">Login to track service activities</h5><br><p>First time here? Sign up with your lwsd account</p></div>'
    // clear account info
    accountDetails.innerHTML = '';
    // toggle user elements
    adminItems.forEach(item => item.style.display = 'none');
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

function getAdminActivityData(){
  db.collection("users").get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(userDoc) {
            let userObj = userDoc.data();
            userObj.id = userDoc.id;
            userList.push(userObj);
            // console.log(userDoc.id, " => ", userDoc.data());
          });
          userList.forEach(user => {
            db.collection("activities").where("UserID", "==", user.id).orderBy("ActivityDate", "desc").get()
            .then(function(querySnapshot) {
              querySnapshot.forEach(function(activityDoc) {
              // console.log(doc.id, " => ", doc.data());
              let activity = activityDoc.data();
              activity.studentName = user.firstname + ' ' + user.lastname;
              activity.id = activityDoc.id;
              // console.log('activity to pass to admin view: ' + JSON.stringify(activity, null, 2));
              activityData.push(activity);
              });
              console.log('time for setup view all');
              activityData.sort((a,b) => (a.studentName > b.studentName) ? 1 : ((b.studentName > a.studentName) ? -1 : 0)); 
              setupViewAllActivities(activityData);
            });
          });
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
}
// setup activities
const setupActivities = (data) => {
  console.log('setting up activities: ' + JSON.stringify(data, null, 2)) + '!';

  if (data.length > 0) {
    let html = `
    <table style="color: white;">
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Hours</th>
        <th>Date</th>
      </tr>
    `;
    let totalHours = 0;
    data.forEach(doc => {
      // console.log('activity '+activity);
      totalHours += parseFloat(doc.Hours);
      const li = `
        <tr>
          <td class="">${doc.ActivityName}</td>
          <td class="">${doc.ActivityDescription}</td>
          <td class="">${doc.Hours}</td>
          <td class="">${doc.ActivityDate}</td>
        </tr>
      `;
      html += li;
    });
    html += '</table>'
    let totalHoursHTML = `<h3>Total Hours: ${totalHours}</h3>`
    activityList.innerHTML = html;
    if (data.length > 0) {
      runningTotal.innerHTML = totalHoursHTML;
    } else {
      runningTotal.innerHTML = "";
    }
  } else {
    if(!isAdmin){
      activityList.innerHTML = '<div style="color: white;"><h5 class="center-align">There are no logged activities to display</h5></div>';
    } else{
      activityList.innerHTML = '';
    }
  }

};

const setupViewAllActivities = (data) => {
  console.log('setting up admin view: ' + JSON.stringify(data, null, 2));
  // view by student showing total and individual activities
  // view by hour category
  // view by counts towards key club
  // <a href="#" onclick="download_table_as_csv('my_id_table_to_export');">Download as CSV</a>

  // <button id="btnExport" onclick="exportTableToExcel();"> Export Table to Excel </button>
  if (data.length > 0) {
    let html = `
    <button id="btnExport" onclick="download_table_as_csv('tableexport');"> Export Table to CSV </button>
    <br>
    <table style="color: white;" id="tableexport">
      <tr>
        <th>Student Name</th>
        <th>Activity Name</th>
        <th>Description</th>
        <th>Hours</th>
        <th>Date</th>
        <th>Count for Key Club</th>
        <th>Key Club Event</th>
        <th>Contact Name</th>
        <th>Contact Phone</th>
        <th>Graduation Year</th>
        <th>Action<th>
        </tr>
        `;
    data.forEach(doc => {
      // console.log('activity '+doc);
      const tr = `
        <tr>
          <td class="custom-link"><a onclick="getStudentData(${"'" + doc.studentName.trim() + "'"})" class="modal-trigger" data-target="modal-student-detail">${doc.studentName}</a></td>
          <td class="">${doc.ActivityName}</td>
          <td class="">${doc.ActivityDescription}</td>
          <td class="">${doc.Hours}</td>
          <td class="">${doc.ActivityDate}</td>
          <td class="">${doc.CountForKeyClub}</td>
          <td class="">${doc.KeyClubEvent}</td>
          <td class="">${doc.ContactName}</td>
          <td class="">${doc.ContactPhone}</td>
          <td class="">${doc.GraduationYear}</td>
          <td ><button class="red" name="delete" onclick="deleteActivity('${doc.id}')">Delete</button></td>
        </tr>
      `;
      html += tr;
    });
    html += '</table>';
    console.log('html: ' + html);
    adminBlock.innerHTML = html;
    // console.log('admin items inner html: ' + adminBlock.innerHTML);
  } else {
    console.log('ugg');

  }

};

function getStudentData(studentName){
  console.log(studentName);
  currentStudentActivityList = [];
  currentStudentTotalHours = 0;
  let isKeyClubMember = "No";
  Array.prototype.forEach.call(activityData, activity => {
    if(activity.studentName == studentName){
      currentStudentActivityList.push(activity);
    }
  });
  Array.prototype.forEach.call(currentStudentActivityList, activity => {
    currentStudentTotalHours += parseFloat(activity.Hours);
    if(activity.CountForKeyClub == 'Yes'){
      isKeyClubMember = "Yes";
    }
  });
  // console.log('currentStudentTotalHours: ' + currentStudentTotalHours);
  // console.log('currentStudentTotalHours: ' + JSON.stringify(currentStudentActivityList, null, 2));
  let studentDetailModal = document.getElementById('studentdetail');
  let html = `
    <p><h5>Name: ${studentName}</h5><p>
    <p><h5>Total Service Hours: ${currentStudentTotalHours}</h5><p>
    <p><h5>Key Club Member: ${isKeyClubMember}</h5><p>
    <br>
    <table style="color: black;">
      <tr>
        <th>Activity Name</th>
        <th>Description</th>
        <th>Hours</th>
        <th>Date</th>
        <th>Count for Key Club</th>
      </tr>
    `;
    Array.prototype.forEach.call(currentStudentActivityList, activity => {
      const tr = `
        <tr>
          <td class="">${activity.ActivityName}</td>
          <td class="">${activity.ActivityDescription}</td>
          <td class="">${activity.Hours}</td>
          <td class="">${activity.ActivityDate}</td>
          <td class="">${activity.CountForKeyClub}</td>
        </tr>
      `;
      html += tr;
    });
    html += '</table>';
    studentDetailModal.innerHTML = html;
}

function deleteActivity(id){
  var confirmDelete = confirm('Are you sure you want to delete this activity?');
  if (confirmDelete){
    console.log('id in delete method: ' + id);
    db.collection("activities").doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
      location.reload();
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});

// // button functions
// function showAll(){
//   adminBlock.style.display = 'block';
// }
// function showTotals(){
//   studentTotals.style.display = 'block';
// }
// function showHourCategories(){
//   hourCategories.style.display = 'block';
// }

function exportTableToExcel(){
  var downloadLink;
  var dataType = 'application/vnd.ms-excel';
  var tableSelect = document.getElementById('tableexport');
  var copyTable = tableSelect;
  copyTable.style.color = 'black';
  var tableHTML = copyTable.outerHTML.replace(/ /g, '%20');
  
  // Specify file name
  var filename = 'ServiceDataExport';
  filename = filename?filename+'.xls':'excel_data.xls';
  
  // Create download link element
  downloadLink = document.createElement("a");
  
  document.body.appendChild(downloadLink);
  
  if(navigator.msSaveOrOpenBlob){
      var blob = new Blob(['\ufeff', tableHTML], {
          type: dataType
      });
      navigator.msSaveOrOpenBlob( blob, filename);
  }else{
      // Create a link to the file
      downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
  
      // Setting the file name
      downloadLink.download = filename;
      
      //triggering the function
      downloadLink.click();
  }
}

// Quick and simple export target #table_id into a csv
function download_table_as_csv(table_id) {
  // Select rows from table_id
  var rows = document.querySelectorAll('table#' + table_id + ' tr');
  // Construct csv
  var csv = [];
  for (var i = 0; i < rows.length; i++) {
      var row = [], cols = rows[i].querySelectorAll('td, th');
      for (var j = 0; j < cols.length; j++) {
          // Clean innertext to remove multiple spaces and jumpline (break csv)
          var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
          // Escape double-quote with double-double-quote (see https://stackoverflow.com/questions/17808511/properly-escape-a-double-quote-in-csv)
          data = data.replace(/"/g, '""');
          // Push escaped string
          row.push('"' + data + '"');
      }
      csv.push(row.join(','));
  }
  var csv_string = csv.join('\n');
  // Download it
  var filename = 'ServiceDataExport_' + new Date().toLocaleDateString() + '.csv';
  var link = document.createElement('a');
  link.style.display = 'none';
  link.setAttribute('target', '_blank');
  link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}