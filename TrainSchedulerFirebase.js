
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAgeEG2dC6volBb7LoQQGS5J7OMHFl2CAw",
  authDomain: "train-81451.firebaseapp.com",
  databaseURL: "https://train-81451.firebaseio.com",
  projectId: "train-81451",
  storageBucket: "train-81451.appspot.com",
  messagingSenderId: "438917913580"
};
firebase.initializeApp(config);

var database = firebase.database();

// When "Add" button is clicked
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();


//Creates variables for user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStartTime = moment($("#time-input").val().trim(), "HH:mm").format("X");
  var trainFrequency = $("#frequency-input").val().trim();


  // Creates local "temporary" object for holding train data
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
  $("#train-table").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainStart + "</td><td>" + trainFrequency + "</td></tr>");
});
