//APIS
//https://www.scorebat.com/video-api/
//https://www.scorebat.com/video-api/v1/

$(document).ready(function () {
  //JQ ready starts here...

  let url = "https://www.scorebat.com/video-api/v1/";
  //let mee = $("#teamsUl li");

  loadOtherThumbs();
  function loadOtherThumbs() {
    let randomNumber = Math.round(Math.random() * 10);
    $.get(
      url,
      function (thumbData) {
        for (let i = 1; i <= 4; i++) {
          let randomNumber = Math.round(Math.random() * 10);
          //vidData[randomNumber].videos[0].embed;

          let src = thumbData[randomNumber].thumbnail;
          $("#thumbPicture" + i).attr("src", src);
        }

        //$(".vid1").vidData
      },
      "json"
    );
  }

  //-----------Event for Thumbnail Bar starts
  let myThumbs = $(".thumbNailBar img");
  for (let a of myThumbs) console.log(a.className);
  //-----------Event for Thumbnail Bar Ends

  doThisFirst(2);
  // on click NAV list of teams
  $("#teamsUl").click(function (e) {
    $("#hVideo").html("");
    $("#hDate").html("");
    $(".rightSideBottom iframe").fadeOut();

    $.get(
      url,
      function (newData) {
        let indexFound = 0;
        for (let i = 0; i < newData.length; i++) {
          if (newData[i].title == $(e.target).html()) {
            indexFound = i;
            break;
          }
        }
        doThisFirst(indexFound);
      },
      "json"
    );
  });
  // on click NAV list of teams Ends here

  //On click search button function starts here

  $("#searchBtn").click(function (e) {
    e.preventDefault();

    $.get(
      url,
      function (newData) {
        let indexFound = 0;
        let recordFound = false;
        for (let i = 0; i < newData.length; i++) {
          if (newData[i].title == $("#inputText").val()) {
            indexFound = i;
            recordFound = true;
            break;
          }
        }
        if (recordFound) doThisFirst(indexFound);
        else alert("Could not find the record");
      },
      "json"
    );
  });

  //On Click Search button fucntion ends here

  function doThisFirst(v) {
    $.get(
      url,
      function (dearData) {
        let dataMain = dearData[v];
        $("#hTitle").html(dataMain.title);

        $("#hVideo").html("");
        $("#hDate").html("");

        $(".highLights").on("click", function () {
          $("#hVideo").html(dataMain.videos[0].embed);
          $("#hDate").html(dataMain.date);
        });

        $("#thumbPicture").attr("src", dataMain.thumbnail);

        $(".box1 h2").html(dataMain.side1.name);
        $(".box2 h2").html(dataMain.side2.name);

        $(".competitionBox p").html(dataMain.competition.name);
        $(".competitionBox a").attr("href", dataMain.competition.url);

        $(".rightSideBottom iframe").fadeOut();
        $(".box1 h5").click(function () {
          $(".rightSideBottom iframe").fadeIn("slow");
          $(".rightSideBottom iframe").attr("src", dataMain.side1.url);
        });

        $(".box2 h5").click(function () {
          $(".rightSideBottom iframe").fadeIn("slow");
          $(".rightSideBottom iframe").attr("src", dataMain.side2.url);
        });
      },
      "json"
    );
  }

  // on ready doc get basic data for nav list
  $.get(
    url,

    function (data) {
      //list nav start
      let count = 0;

      for (let i = 0; i < 3; i++) {
        let li = $("<li></li>");
        li.html(data[i].title);
        $(".navSelection ul").append(li);
      }

      $("#nextBtn").click(function () {
        if (count < 36) {
          $("#teamsUl li").remove();

          count = count + 3;
          let startNum = count;
          let endsNum = count + 3;
          for (let i = startNum; i < endsNum; i++) {
            let li = $("<li></li>");
            li.text(data[i].title);

            $("#teamsUl").append(li);
          }
        }
      });

      $("#prevBtn").click(function () {
        if (count >= 3) {
          $("#teamsUl li").remove();

          count = count - 3;
          let startNum = count;
          let endsNum = count + 3;
          for (let i = startNum; i < endsNum; i++) {
            let li = $("<li></li>");
            li.text(data[i].title);
            $("#teamsUl").append(li);
          }
        }
      });
    }, // this is get function last bracket
    "json"
  );

  //JQ ready Ends here.
});
