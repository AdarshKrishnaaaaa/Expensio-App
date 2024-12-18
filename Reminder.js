if ("Notification" in window) {
    Notification.requestPermission().then(function (permission) {
        if (Notification.permission !== "granted") {
            alert("Please allow notification access!")
            location.reload();
        }
    })
}

var timeoutIds =[];

function signOutBtn(){
    window.location.href = './LoginSignUp.html'
}

function scheduleReminder() {
    var title = document.getElementById('title').value; 
    var amount = document.getElementById('amount').value;                                             
    var date = document.getElementById('date').value; 
    var time = document.getElementById('time').value; 

    var dateTimeString = date + " " + time;
    var scheduleTime = new Date(dateTimeString);
    var currentTime = new Date();
    var timeDifference = scheduleTime - currentTime;

    if (timeDifference > 0) {
        addReminder(title,amount,dateTimeString);

        var timeoutId = setTimeout(function () {
            document.getElementById('notificationSound').play();

            var notification = new Notification(title,{
                body: amount,
                requireInteraction : true,
            })
        },timeDifference);

        timeoutIds.push(timeoutId)
    }else(
        alert("The scheduled time is in the past!")
    )
}

function addReminder(title,amount,dateTimeString) {
    var tableBody = document.getElementById("reminderTableBody");

    var row = tableBody.insertRow();

    var titleCell = row.insertCell(0);
    var amountCell = row.insertCell(1);
    var dateTimeCell = row.insertCell(2);
    var actionCell = row.insertCell(3);

    titleCell.innerHTML = title;
    amountCell.innerHTML = amount;
    dateTimeCell.innerHTML = dateTimeString;
    actionCell.innerHTML = '<button onclick = "deleteReminder(this);">Delete</button>'

}