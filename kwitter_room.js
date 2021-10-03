var firebaseConfig = {
      apiKey: "AIzaSyCJo8rvNX0TEK1mlgMA8lW2IbpxrVQL2Fc",
      authDomain: "kwitter1-4aaba.firebaseapp.com",
      databaseURL: "https://kwitter1-4aaba-default-rtdb.firebaseio.com",
      projectId: "kwitter1-4aaba",
      storageBucket: "kwitter1-4aaba.appspot.com",
      messagingSenderId: "507365703434",
      appId: "1:507365703434:web:14855a8fe885ca71df84f3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var user_name = localStorage.getItem("userName");

document.getElementById("name_of_user").innerHTML = "Welcome " + user_name + "!";

function addRoom() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      });
      localStorage.setItem("room_name", room_name);
      window.location = "Message.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log("room_names =" + Room_names);
                  row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
                  //End code
            });
      });
}
getData();

function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("Room_name", name);
      window.location = "Message.html";
}
function logout(){
      localStorage.removeItem("Room_name");
      localStorage.removeItem("userName");
      window.location="index.html";
}