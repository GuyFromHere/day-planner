$(document).ready(function() {
  // build day
  var currHour = moment().hour();
  //var currHour = new Date();
  //currHour = currHour.getHours();

  // use static array for now. use moment methods later.
  var hours = [9, 10, 11, 12, 1, 2, 3, 4, 5];

  for (var i = 0; i < hours.length; i++) {
    var newRow = $("<div>");
    var newHour = $("<div>");
    var newTimeBlock = $("<div>");
    var newTextArea = $("<textarea>");
    var newSaveBtn = $("<div>");

    newRow.addClass("row");

    newHour.addClass("hour col-md-2");
    if (i > 2) {
      newHour.text(hours[i] + "PM");
    } else {
      newHour.text(hours[i] + "AM");
    }
    newRow.append(newHour);

    newTextArea.attr("id", "hour" + hours[i]);
    newTimeBlock.append(newTextArea);

    if (hours[i] < currHour) {
      newTimeBlock.addClass("time-block past col-md-8");
    } else if (hours[i] === currHour) {
      newTimeBlock.addClass("time-block present col-md-8");
    } else if (hours[i] > currHour) {
      newTimeBlock.addClass("time-block future col-md-8");
    }
    newRow.append(newTimeBlock);

    newSaveBtn.addClass("saveBtn col-md-2");
    newSaveBtn.attr("id", hours[i]);
    newSaveBtn.html('<i class="far fa-calendar-plus"></i>');
    newRow.append(newSaveBtn);

    $(".container").append(newRow);
  }

  $(".saveBtn").on("click", function() {
    var ta = $(this).closest(".time-block");
    console.log(ta.attr("id"));
  });
});
