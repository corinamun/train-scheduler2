
// Firebase Initialization
var config = {
    apiKey: "AIzaSyCksT6qVi9SaWkKHcszYS1moNgWwbKV11k",
    authDomain: "train-scheduler-119c1.firebaseapp.com",
    databaseURL: "https://train-scheduler-119c1.firebaseio.com",
    projectId: "train-scheduler-119c1",
    storageBucket: "",
    messagingSenderId: "163224569853"
};

firebase.initializeApp(config);

var database = firebase.database();

// When "Add" button is clicked
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

//Creates variables for user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStartTime = moment($("#time-input").val().trim(), "HH");
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStartTime,
    frequency: trainFrequency
  };

  // Uploads to database
  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.trainStartTime);
  console.log(newTrain.trainFrequency);

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");

});

// Firebase event for adding employee to the database and a row in the Train Table
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStart);
  console.log(trainFrequency);

  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
  empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
});