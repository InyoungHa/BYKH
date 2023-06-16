document.getElementById("go_work").addEventListener("click", go_work);
document.getElementById("out_work").addEventListener("click", out_work);
function go_work(){
	alert("출근 처리 되었습니다.");
		

}
function out_work(){
	alert("퇴근 처리 되었습니다.");
	
}

//메인 캘린더
$(function () {
  function c() {
    p();
    var e = h();
    var r = 0;
    var u = false;
    l.empty();
    while (!u) {
      if (s[r] == e[0].weekday) {
        u = true;
      } else {
        l.append('<div class="blank"></div>');
        r++;
      }
    }
    for (var c = 0; c < 42 - r; c++) {
      if (c >= e.length) {
        l.append('<div class="blank"></div>');
      } else {
        var v = e[c].day;
        var m = g(new Date(t, n - 1, v)) ? '<div class="today">' : "<div>";
        l.append(m + "" + v + "</div>");
      }
    }
    var y = o[n - 1];
    a.css("background-color", "#fff5e4")
      .find("h1")
      .text(i[n - 1] + " " + t);
    f.find("div").css("color", "79E0EE");
    l.find(".today").css("background-color", "#fff5e9");
    d();
  }
  function h() {
    var e = [];
    for (var r = 1; r < v(t, n) + 1; r++) {
      e.push({ day: r, weekday: s[m(t, n, r)] });
    }
    return e;
  }
  function p() {
    f.empty();
    for (var e = 0; e < 7; e++) {
      f.append("<div>" + s[e].substring(0, 3) + "</div>");
    }
  }
  function d() {
    var t;
    var n = $("#calendar").css("width", e + "px");
    n.find((t = "#calendar_weekdays, #calendar_content"))
      .css("width", e + "px")
      .find("div")
      .css({
        width: e / 7 + "px",
        height: e / 6.1 + "px",
        "line-height": e / 7 + "px"
      });
    n.find("#calendar_header")
      .css({ height: e * (1 / 5.5) + "px" })
      .find('i[class^="icon-chevron"]')
      .css("line-height", e * (1 / 7) + "px");
  }
  function v(e, t) {
    return new Date(e, t, 0).getDate();
  }
  function m(e, t, n) {
    return new Date(e, t - 1, n).getDay();
  }
  function g(e) {
    return y(new Date()) == y(e);
  }
  function y(e) {
    return e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate();
  }
  function b() {
    var e = new Date();
    t = e.getFullYear();
    n = e.getMonth() + 1;
  }
  var e = 300;
  var t = 2013;
  var n = 9;
  var r = [];
  var i = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월"
  ];
  var s = [
    "일",
    "월",
    "화",
    "수",
    "목",
    "금",
    "토"
  ];
  var o = [
    "#16a085",
    "#1abc9c",
    "#c0392b",
    "#27ae60",
    "#FF6860",
    "#f39c12",
    "#f1c40f",
    "#e67e22",
    "#2ecc71",
    "#e74c3c",
    "#d35400",
    "#2c3e50"
  ];
  var u = $("#calendar");
  var a = u.find("#calendar_header");
  var f = u.find("#calendar_weekdays");
  var l = u.find("#calendar_content");
  b();
  c();
  a.find('i[class^="icon-chevron"]').on("click", function () {
    var e = $(this);
    var r = function (e) {
      n = e == "next" ? n + 1 : n - 1;
      if (n < 1) {
        n = 12;
        t--;
      } else if (n > 12) {
        n = 1;
        t++;
      }
      c();
    };
    if (e.attr("class").indexOf("left") != -1) {
      r("previous");
    } else {
      r("next");
    }
  });
});


//메인 todoList 
$(document).ready(function () {
  $("#button").click(function () {
    var toDoContent = $("input[name=ListItem]").val();
    $("li").append("<li>" + toDoContent + "</li>");
    //toDolist 저장
	  //ajax start
	  $.ajax({
		  url: '/user/insertToDoList', //요청경로
		  type: 'post',
		  async: true,
		  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		  data: {'toDoContent': toDoContent}, //HTML에받는  데이터
		  success: function(result) {

			location.reload();
		  },
		  error: function() {
			  alert('실패');
		  }
	  });
//ajax end
 
    			var todoList = document.getElementById("toDoList");
	todoList.scrollTop = todoList.scrollHeight;
    
  });

  $("input[name=ListItem]").keyup(function (event) {
    if (event.keyCode == 13) {
      $("#button").click();
    }
  });

  $(document).on("dblclick", "li", function () {
    $(this).toggleClass("strike").fadeOut("slow");
    var toDoCode = $(this).data("to-do-code");
     //toDolist 삭제	
     //ajax start
	  $.ajax({
		  url: '/user/deleteToDoList', //요청경로
		  type: 'post',
		  async: false,
		  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		  data: {'toDoCode': toDoCode}, //HTML에받는  데이터
		  success: function(result) {
			
		  },
		  error: function() {
			  alert('실패');
		  }
	  });
    
  });

  $("input").focus(function () {
    $(this).val("");
  });


});

   
