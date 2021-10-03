//YOUR FIREBASE LINKS
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
var room_name = localStorage.getItem("Room_name");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value = "";
}


function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);

                        name = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];

                        name_with_tag = "<h4>" + name + "<img src='tick.png' class='user_tick'></h4>";

                        messgae_with_tag = "<h4 class='messsage_h4'>" + message + "</h4>";

                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLikes(this.id)'>";

                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Likes : " + like + "</span></button><hr>";

                        row = name_with_tag + messgae_with_tag + like_button + span_with_tag;

                        document.getElementById("output").innerHTML += row;

                        //End code
                  }
            });
      });
}

getData();

function updateLikes(message_id) {
      console.log("clicked like button : " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;

      updated_likes = Number(like) + 1;
      firebase.database().ref(room_name).child(message_id).update({
            like:updated_likes
      });
}

function logout() {
      localStorage.removeItem("Room_name");
      localStorage.removeItem("userName");
      window.location = "index.html";
}