//LINKS FIREBASE
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
roomName = localStorage.getItem("roomName");

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(roomName).push({
        name: userName,
        message: msg,
        like: 0
    });
    document.getElementById("msg").value = "";
}

function getData() {
    firebase.database().ref("/" + roomName).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                firebaseMessageId = childKey;
                messageData = childData;
                //Início do código
                name = messageData["name"];
                message = messageData["message"];
                like = messageData["like"];
                nameWithTag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
                messageWithTag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebaseMessageId + " value=" + like + " onclick='updateLike(this.id)'>";
                spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";


                row = nameWithTag + messageWithTag + like_button + spanWithTag;
                document.getElementById("output").innerHTML += row;




                //Fim do código
            }
        });
    });
}
getData();
function updateLike(m) {
    console.log("botão like pressionado - " + m);
    button_id = m;
    likes = document.getElementById(button_id).value;
    updatel = Number(likes) + 1;


    firebase.database().ref(roomName).child(m).update({
        like: updatel
    });
}




    function logout() {
        localStorage.removeItem("userName");
        localStorage.removeItem("roomName");
        window.location = "index.html";
    }