// variable as an object to store and loop through hours
var myDay = [
    {
        id: "0",
        hour: "08",
        time: "08",
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
    {
        id: "11",
        hour: "07",
        time: "19",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "12",
        hour: "08",
        time: "20",
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
function saveToDos() {
    localStorage.setItem("myDay", JSON.stringify(myDay));
}

// sets any data in localStorage to the view
function displayToDos() {
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

    saveToDos();
    displayToDos();
}

// loads header date
getTodaysDate();

// creates the visuals for the scheduler body
myDay.forEach(function(currentHour) {
    // creates hour rows
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
    var plannerData = $("<textarea>");
    hourPlan.append(plannerData);
    plannerData.attr("id", currentHour.id);
    // creates color change based on current time
    if (currentHour.time < moment().format("HH")) {
        plannerData.attr ({
            "class": "past", 
        })
    } else if (currentHour.time === moment().format("HH")) {
        plannerData.attr({
            "class": "present"
        })
    } else if (currentHour.time > moment().format("HH")) {
        plannerData.attr({
            "class": "future"
        })
    }
    // creates save button
    var saveButton = $("<i class='fas fa-save fa-lg'></i>")
    var savePlannerData = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlannerData.append(saveButton);
    hourRow.append(hourField, hourPlan, savePlannerData);
})

// loads any existing localstorage data after content created
loadData();


// saves data to be used in localStorage
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    myDay[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    saveToDos();
    displayToDos();
})