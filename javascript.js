$(document).ready(function() {
  // Set current day of year
  var day = moment().dayOfYear();
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

    console.log(getDay());

    for (var i = 0; i < 10; i++) {
      // Create new elements
      var newRow = $("<div>");
      var newHour = $("<div>");
      var newTimeBlock = $("<div>");
      var newTextArea = $("<textarea>");
      var newSaveBtn = $("<div>");

      // Assign IDs
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
      // Check localStorage for existing data
      // Create empty array if nothing found
      var data = JSON.parse(localStorage.getItem(day)) || [];
      if (data.hour === hour.hour()) newTextArea.val(data.task);

      // Label hour
      newHour.text(hour.format("ha"));
      newSaveBtn.html('<i class="far fa-calendar-plus"></i>');

      // Append elements to page
      newRow.append(newHour);
      newTimeBlock.append(newTextArea);
      newRow.append(newTimeBlock);
      newRow.append(newSaveBtn);
      $(".container").append(newRow);

      // Iterate hour
      hour.add(1, "hour").format("ha");
    }
  }

  // build day
  buildDay();

  $(".saveBtn").on("click", function() {
    // create array for object
    var arrObj = [];
    // get hour to update
    var hourId = $(this).attr("id");
    // get task value
    var task = $("#hour" + hourId).val();
    // Create object with task data
    var obj = { hour: hourId, task: task };
    // push object to array
    arrObj.push(obj);
    localStorage.setItem(day, JSON.stringify(arrObj));
  });
});
