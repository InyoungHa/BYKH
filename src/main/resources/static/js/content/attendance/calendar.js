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
      title: allEvent[i]._def.title,
      allday: allEvent[i]._def.allDay,
      start: allEvent[i]._instance.range.start,
      end: allEvent[i]._instance.range.end
    };

    events.push(obj);
  }

  var jsondata = JSON.stringify(events);
  jsonEvent = JSON.parse(jsondata);
  console.log(jsonEvent);

  var myDate1 = jsonEvent[0]['start'];
  const date_and_time = myDate1.split('T');
  const date = date_and_time[0];
  const time = date_and_time[1].split('.')[0];
  const formattedTime = time.slice(0, -3);
  const startChange = `${date}-${formattedTime}`;


  var myDate2 = jsonEvent[0]['end'];
  const date_and_time2 = myDate2.split('T');
  const date2 = date_and_time2[0];
  const time2 = date_and_time2[1].split('.')[0];
  const formattedTime2 = time2.slice(0, -3);
  const endChange = `${date2}-${formattedTime2}`;


  var updatedEvents = jsonEvent.map(function(event) {
    event.start = startChange;
    event.end = endChange;
    return event;
  });

  var jsondata = JSON.stringify(updatedEvents);

  console.log(jsondata);
  savedata(jsondata);
  alert(jsondata);
}


function savedata(jsondata)  {

	//ajax start
	$.ajax({
		url: '/calendar/calendarSave', //요청경로
		type: 'post',
		async: false,
		contentType: 'application/json; charset=UTF-8',
		data: JSON.stringify([jsondata]),
		dataType: 'text',
		success: function(result) {
			alert('ajax 통신 성공'); //컨트롤러 결과값이 RESULT에담김
		},
		error: function() {
			alert('에러 발생');
		}
	});

	
}





