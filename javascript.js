$(document).ready(function() {
  function getStorage(hour) {
    var data = JSON.parse(localStorage.getItem(hour));
    return data;
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
      // Check localStorage for existing data
      var data = JSON.parse(localStorage.getItem(hour.hour()));
      if (data) newTextArea.val(data.task);
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
    var hourId = $(this).attr("id");
    var task = $("#hour" + hourId).val();
    var obj = { hour: hourId, task: task };

    localStorage.setItem(hourId, JSON.stringify(obj));
  });
});
