$(document).ready(function() {
  // Set current day of year
  var day = moment().dayOfYear();

  var dayObj = JSON.parse(localStorage.getItem(day)) || [];

  function getDay() {
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    return (
      days[moment().day()] +
      ", " +
      months[moment().month()] +
      " " +
      moment().date() +
      " " +
      moment().year()
    );
  }

  function buildDay() {
    // get 8AM
    var hour = moment()
      .set("hour", 8)
      .startOf("hour");
    // get current hour
    var currHour = moment().startOf("hour");

    for (var i = 0; i < 10; i++) {
      // Create new elements
      var otherDays = $("<div>");
      var newRow = $("<div>");
      var newHour = $("<div>");
      var newTimeBlock = $("<div>");
      var newTextArea = $("<textarea>");
      var newSaveBtn = $("<div>");

      // Assign IDs
      otherDays.attr("id", "otherDays");
      newSaveBtn.attr("id", hour.hour());
      newTextArea.attr("id", "hour" + hour.hour());

      // Assign classes
      newRow.addClass("row");
      newHour.addClass("hour col-md-2");
      newTimeBlock.addClass("time-block");
      newSaveBtn.addClass("saveBtn col-md-2");
      if (hour.isBefore(currHour)) {
        newTimeBlock.addClass("time-block past col-md-8");
      } else if (hour.isSame(currHour)) {
        newTimeBlock.addClass("time-block present col-md-8");
      } else if (hour.isAfter(currHour)) {
        newTimeBlock.addClass("time-block future col-md-8");
      }

      //Fill content
      $("#currentDay").text(getDay());
      otherDays.html(
        "<span id='prevDay'><<< Prev Day</span><span id='nextDay'>Next Day >>></span>"
      );
      // Create day object if it does not exist.
      // If it does exist and there's info in a task, put it in the textarea
      //console.log(dayObj[i].hour + " " + dayObj[i].task);
      if (dayObj.length <= 10) {
        dayObj.push({ hour: hour.hour(), task: "" });
      } else if (dayObj[i].task != "") {
        newTextArea.val(dayObj[i].task);
      }
      console.log(dayObj[i].hour + " " + dayObj[i].task);

      // Label hour
      newHour.text(hour.format("ha"));
      newSaveBtn.html('<i class="far fa-calendar-plus"></i>');

      // Append elements to page
      $("#currentDay").append(otherDays);
      prevDay.append(nextDay);
      newRow.append(newHour);
      newTimeBlock.append(newTextArea);
      newRow.append(newTimeBlock);
      newRow.append(newSaveBtn);
      $(".container").append(newRow);

      // Iterate hour
      hour.add(1, "hour").format("ha");
    }

    $(".saveBtn").on("click", function() {
      // get hour to update
      var hourId = parseInt($(this).attr("id"));
      // get task value
      var task = $("#hour" + hourId).val();
      // get index of task
      var index = dayObj
        .map(function(e) {
          return e.hour;
        })
        .indexOf(hourId);
      // Update task
      dayObj[index].task = task;
      // update obj in localStorage
      localStorage.setItem(day, JSON.stringify(dayObj));
    });
  }

  // build day
  buildDay(day);

  $("#prevDay").on("click", function() {
    day -= 1;
    buildDay(day);
  });
});
