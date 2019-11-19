$(document).ready(function() {
  function buildDay(day) {
    // clear container before building page
    $(".container").empty();

    // Set Day
    if (day === undefined) day = moment().dayOfYear();
    // Get obj or empty array
    if (localStorage[day]) {
      var dayObj = JSON.parse(localStorage.getItem(day));
    } else {
      var dayObj = [];
    }

    // get 8AM on dayOfYear(day)
    var hour = moment().dayOfYear(day);
    hour = hour.set("hour", 8).startOf("hour");
    // Get current hour
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
      $("#currentDay").text(
        moment()
          .dayOfYear(day)
          .format("dddd, MMMM Do YYYY")
      );
      otherDays.html(
        "<span id='prevDay'>Prev Day</span>" +
          "<span id='thisDay'>Today</span>" +
          "<span id='nextDay'>Next Day</span>"
      );

      // Create day object if it does not exist.
      // If it does exist and there's info in a task, put it in the textarea
      if (dayObj.length <= 10) {
        dayObj.push({ hour: hour.hour(), task: "" });
        newTextArea.val(dayObj[i].task);
      } else {
        newTextArea.val(dayObj[i].task);
      }

      // Label hour
      newHour.text(hour.format("ha"));
      newSaveBtn.html('<i class="far fa-calendar-plus fa-3x"></i>');

      // Append elements to page
      $("#currentDay").append(otherDays);

      /* prevDay.append(nextDay); */
      newRow.append(newHour);
      newTimeBlock.append(newTextArea);
      newRow.append(newTimeBlock);
      newRow.append(newSaveBtn);
      $(".container").append(newRow);

      // Iterate hour
      hour.add(1, "hour").format("ha");
    }

    // After loop, add obj back to localStorage
    localStorage.setItem(day, JSON.stringify(dayObj));

    $(".saveBtn").on("click", function() {
      // get hour and task
      var hourId = parseInt($(this).attr("id"));
      var task = $("#hour" + hourId).val();
      // get index of task
      var index = dayObj
        .map(function(e) {
          return e.hour;
        })
        .indexOf(hourId);
      // Update task / localStorage
      dayObj[index].task = task;
      localStorage.setItem(day, JSON.stringify(dayObj));
    });

    ///////////////////
    // Event handlers
    ///////////////////

    $("#prevDay").on("click", function() {
      day -= 1;
      buildDay(day);
    });

    $("#nextDay").on("click", function() {
      day += 1;
      buildDay(day);
    });

    $("#thisDay").on("click", function() {
      buildDay();
    });
  }

  // build day
  buildDay();
});
