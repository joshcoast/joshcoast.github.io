// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDPl0Eai36x9dWt4Uuj1qgqlNyfknmYYeA",
    authDomain: "reservation-site-6e944.firebaseapp.com",
    databaseURL: "https://reservation-site-6e944.firebaseio.com",
    storageBucket: "reservation-site-6e944.appspot.com",
    messagingSenderId: "775127443195"
  };
  firebase.initializeApp(config);
// End Initialize Firebase


var database = firebase.database();



// create reservationData object which will be populated with user input
var reservationData = { };

// set the day when an option is clicked on
$('.reservation-day option').on('click', function() {
  reservationData.day = $(this).text();
});


//set the name when form submits
$('.reservation-form').on('submit', function(e) {
  e.preventDefault();
  reservationData.name = $('.reservation-name').val();
  
  // create a section for reservations data in your db
  var reservationsReference = database.ref('reservations');
  reservationsReference.push(reservationData);
});

function getReservations(){
  database.ref('reservations').on('value', function (results) {
    // Code to execute when a value changes goes here
    var allReservations = results.val();
  });
}


// retrieve reservations data when page loads and when reservations are added
function getReservations() {

  // use reference to database to listen for changes in reservations data
  database.ref('reservations').on('value', function(results) {

      // Get all reservations stored in the results we received back from Firebase
      var allReservations = results.val();

      // remove all list reservations from DOM before appending list reservations
      $('.reservations').empty();
    
    // iterate (loop) through all reservations coming from database call
    for (var reservation in allReservations) {
      // Create an object literal with the data we'll pass to Handlebars
      var context = {
        name: allReservations[reservation].name,
        day: allReservations[reservation].day,
        reservationId: reservation
      };
      
      // Get the HTML from our Handlebars reservation template
      var source = $("#reservation-template").html();
      
      // Compile our Handlebars template
      var template = Handlebars.compile(source);
      
      // Pass the data for this reservation (context) into the template
      var reservationListItem = template(context);
      
      // Append newly created reservation to reservations list.
      $('.reservations').append(reservationListItem);

    }

  });
}

// When page loads, get reservations
getReservations();
