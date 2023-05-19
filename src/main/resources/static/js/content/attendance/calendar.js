document.addEventListener('DOMContentLoaded', function() {

  /* initialize the external events
  -----------------------------------------------------------------*/

  document.querySelectorAll('#external-events .fc-event').forEach(function(eventElement) {
	
	        var calendarEl = document.getElementById('calendar');
        var Draggable = FullCalendar.Draggable;
        var containerEl = document.getElementById('external-events');
        var calendarEl = document.getElementById('calendar');
        var checkbox = document.getElementById('drop-remove');
        // initialize the external events
        
	

	
    // Store data so the calendar knows to render an event upon drop
    eventElement.dataset.event = JSON.stringify({
      title: eventElement.textContent.trim(), // use the element's text as the event title
      stick: true // maintain when user navigates (see docs on the renderEvent method)
    });

    // Make the event draggable using native HTML5 drag and drop API
    eventElement.draggable = true;
    eventElement.addEventListener('dragstart', function(event) {
      event.dataTransfer.setData('text', event.target.dataset.event);
    });
  });


  /* initialize the calendar
  -----------------------------------------------------------------*/

  var calendarEl = document.getElementById('calendar');
  var dropRemoveCheckbox = document.getElementById('drop-remove');
  var externalEventsEl = document.getElementById('external-events');




  calendar = new FullCalendar.Calendar(calendarEl, {
	// events: [
  //  {
     
   // }
 // ],
	
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
     // 초기 날짜 설정 (설정하지 않으면 오늘 날짜가 보인다.)
    
    locale: 'ko', // 한국어 설정
    editable: true,
    droppable: true,  // 드래그 가능
    dragRevertDuration: 0,
    drop: function(info) {
      // Is the "remove after drop" checkbox checked?
      if (dropRemoveCheckbox.checked) {
        // If so, remove the element from the "Draggable Events" list
        info.draggedEl.remove();
      }
    },
    
    eventDragStop: function(info) {
      var jsEvent = info.jsEvent;

      if (isEventOverDiv(jsEvent.clientX, jsEvent.clientY)) {
        calendar.getEventById(info.event.id).remove();
        var eventElement = document.createElement('div');
        externalEventsEl.appendChild(eventElement);
        eventElement.draggable = true;
        eventElement.addEventListener('dragstart', function(event) {
          event.dataTransfer.setData('text', JSON.stringify({
            title: event.target.textContent.trim(),
            id: info.event.id,
            stick: true
          }));
        });
      }
    }
  });


  calendar.render();
  
  

  var isEventOverDiv = function(x, y) {
    var externalEventsRect = externalEventsEl.getBoundingClientRect();

    // Compare
    if (
      x >= externalEventsRect.left &&
      y >= externalEventsRect.top &&
      x <= externalEventsRect.right &&
      y <= externalEventsRect.bottom
    ) {
      return true;
    }
    return false;
  };

});




var calendar;

document.getElementById("saveButton").addEventListener("click", allSave);

function allSave() {
  var allEvent = calendar.getEvents();
  var events = [];

  for (var i = 0; i < allEvent.length; i++) {
    var obj = {
      eventName: allEvent[i]._def.title,
      allday: allEvent[i]._def.allDay,
      startDate: allEvent[i]._instance.range.start,
      endDate: allEvent[i]._instance.range.end
    };

    events.push(obj);
  }

  var jsondata = JSON.stringify(events);
  jsonEvent = JSON.parse(jsondata);
  console.log(jsonEvent);

 
  var updatedEvents = jsonEvent.map(function(event) {
  
    return event;
  });

  var jsondataUpdated = JSON.stringify(updatedEvents);

  console.log(jsondataUpdated);
  savedata(jsondataUpdated);
  alert(jsondataUpdated);
}

function savedata(jsondata) {
  //ajax start
  $.ajax({
    url: '/calendar/calendarSave', //요청경로
    type: 'post',
    async: false,
    contentType: 'application/json; charset=UTF-8',
    data: jsondata,
    dataType: 'text',
    success: function(result) {
      alert(result); //컨트롤러 결과값이 RESULT에담김
    },
    error: function() {
      alert(result);
    }
  });
}

///////////////////////////////////////////////////////////////////////////////
//캘린더 조회
var all_events = null;

loadingEvents();

function loadingEvents() {
	//ajax start
	$.ajax({
		url: '/calendar/calendarLoad', // 요청 경로 (서버에서 데이터를 가져올 API 엔드포인트)
		type: 'GET', // GET 요청
		async: false,
		dataType: 'json',
		success: function(result) {
			all_events = result; // 서버에서 받아온 데이터를 all_events 변수에 할당
			initializeCalendar(); // 캘린더를 초기화하는 함수 호출
		},
		error: function() {
			alert('에러 발생');
		}
	});
	//ajax end
}

function initializeCalendar() {
	// 캘린더 객체를 초기화하고 events 속성에 가져온 데이터를 할당
	calendar = new Calendar({
		events: all_events
	});

	// 이후 코드 계속...
}

// 이벤트 데이터를 이용하여 HTML에서 일정을 조회하고 표시하는 함수 등을 추가로 작성하시면 됩니다.






