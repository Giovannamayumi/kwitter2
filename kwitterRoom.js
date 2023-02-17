
//ADICIONE SEUS LINKS FIREBASE
 const firebaseConfig = {

  apiKey: "AIzaSyBgJvo4DS8_lvVXYcaZ483X5MBRpXtzB1Y",

  authDomain: "kwitter-cea73.firebaseapp.com",

  databaseURL: "https://kwitter-cea73-default-rtdb.firebaseio.com",

  projectId: "kwitter-cea73",

  storageBucket: "kwitter-cea73.appspot.com",

  messagingSenderId: "683271444987",

  appId: "1:683271444987:web:181d4fb608ef627a23135e"

};


firebase.initializeApp(firebaseConfig);

userName = localStorage.getItem("userName");

document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";

function addRoom() {
  roomName = document.getElementById("roomName").value;

  firebase.database().ref("/").child(roomName).update({
    criador:userName
  });

  localStorage.setItem("roomName", roomName);

  window.location = "kwitterPage.html";
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      roomNames = childKey;
      console.log("Nome da Sala - " + roomNames);
      row = "<div class='roomName' id=" + roomNames + " onclick='redirectToRoomName(this.id)' >#" + roomNames + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("roomName", name);
  window.location = "kwitterPage.html";
}

function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("roomName");
  window.location = "index.html";
}
