// variable to store and loop through scheduler
var myDay = [
    {
        id: "0",
        hour: "08",
        time: "09",
        meridiem: "am",
        reminder: "",
    },
    {
        id: "1",
        hour: "09",
        time: "09",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "10",
        time: "10",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "11",
        time: "11",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "4",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "01",
        time: "13",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "02",
        time: "14",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "03",
        time: "15",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "04",
        time: "16",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "9",
        hour: "05",
        time: "17",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "10",
        hour: "06",
        time: "18",
        meridiem: "pm",
        reminder: ""
    },
    
]

// gets data for todays date in main header
function getTodaysDate() {
    var todaysDate = moment().format('dddd, MMMM Do, YYYY');
    $("#currentDay").text(todaysDate);
}

// saves data to localStorage
function saveReminders() {
    localStorage.setItem("myDay", JSON.stringify(myDay));
}

// sets any data in localStorage to the view
function displayReminders() {
    myDay.forEach(function (_currentHour) {
        $(`#${_currentHour.id}`).val(_currentHour.reminder);
    })
}

// sets any existing localStorage data to the view if it exists
function loadData() {
    var storedDay = JSON.parse(localStorage.getItem("myDay"));

    if (storedDay) {
        myDay = storedDay;
    }

    saveReminders();
    displayReminders();
}

// loads header date
getTodaysDate();

// creates the visuals for the scheduler body
myDay.forEach(function(currentHour) {
    // creates timeblocks row
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    // creates time field
    var hourField = $("<div>")
        .text(`${currentHour.hour}${currentHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });

    // creates schdeduler data
    var hourPlan = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attr("id", currentHour.id);
    if (currentHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (currentHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (currentHour.time > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }
    // creates save button
    var saveButton = $("<i class='fas fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourField, hourPlan, savePlan);
})

// loads any existing localstorage data after content created
loadData();


// saves data to be used in localStorage
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    myDay[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    saveReminders();
    displayReminders();
})