$(document).ready(function() {
  function buildDay() {
    // get 8AM
    var hour = moment()
      .set("hour", 8)
      .startOf("hour");
    // get current hour
    var currHour = moment().startOf("hour");

    for (var i = 0; i < 10; i++) {
      var newRow = $("<div>");
      var newHour = $("<div>");
      var newTimeBlock = $("<div>");
      var newTextArea = $("<textarea>");
      var newSaveBtn = $("<div>");
      newRow.addClass("row");
      newHour.addClass("hour col-md-2");
      newTimeBlock.addClass("time-block");

      // label hour
      newHour.text(hour.format("ha"));

      // add hour to row
      newRow.append(newHour);

      newTextArea.attr("id", "hour" + hour.hour());
      // add textarea to time-block
      newTimeBlock.append(newTextArea);

      if (hour.isBefore(currHour)) {
        //console.log(hour + " is before " + currHour);
        newTimeBlock.addClass("time-block past col-md-8");
      } else if (hour.isSame(currHour)) {
        //console.log(hour + " is same " + currHour);
        newTimeBlock.addClass("time-block present col-md-8");
      } else if (hour.isAfter(currHour)) {
        //console.log(hour + " is after " + currHour);
        newTimeBlock.addClass("time-block future col-md-8");
      }
      newRow.append(newTimeBlock);

      newSaveBtn.addClass("saveBtn col-md-2");
      newSaveBtn.attr("id", hour.hour());
      newSaveBtn.html('<i class="far fa-calendar-plus"></i>');
      newRow.append(newSaveBtn);
      // next hour
      hour.add(1, "hour").format("ha");
      $(".container").append(newRow);
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
