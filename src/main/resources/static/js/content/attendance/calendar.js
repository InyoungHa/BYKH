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
      stick: true, // maintain when user navigates (see docs on the renderEvent method)
      //color:'#555555'
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
    timeZone: 'UTC',
    events: return_value,
    dragRevertDuration: 0,
    eventReceive: function(info) {
	console.log(info.event._def.ui.backgroundColor);
	console.log(info.event);
	//console.log(info.jsEvent);
	//console.log(info.jsEvent.target);
	
	
	//for(let i = 0; i < info.length; i++){
  	
 //   if(title === '연차') {
  //    color = '#025464'; // 연차인 경우
   //	 } else if(title === '반차') {
   //   color = '#1B9C85'; // 반차인 경우
   //   } else if(title === '조퇴') {
   //   color = '#1D267D'; // 조퇴인 경우 
   //     } else if(title === '병가') {
   //   color = '#E76161'; // 병가인 경우 
    //    } else if(title === '외출') {
    //  color = '#19A7CE'; // 외출인 경우 
    //    } else if(title === '출장') {
    //  color = '#643A6B'; // 출장인 경우 
    //    } else if(title === '교육') {
    //  color = '#9E6F21'; // 교육인 경우 
    //} else {
    //  color = '#C92C6D'; // 휴일근무
   // }

//    info[i].color = color;
 // }	
	
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
      allDay: allEvent[i]._def.allDay,
      start: allEvent[i]._instance.range.start,
      end: allEvent[i]._instance.range.end
    };

    events.push(obj);
  }

  var jsondata = JSON.stringify(events);
  jsonEvent = JSON.parse(jsondata);

 
  var updatedEvents = jsonEvent.map(function(event) {
  
    return event;
  });

  var jsondataUpdated = JSON.stringify(updatedEvents);

  savedata(jsondataUpdated);
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
	alert("일정이 저장되었습니다.");
	location.reload();
    },
    error: function() {
    }
  });
}

///////////////////////////////////////////////////////////////////////////////캘린더 조회
var return_value = null;

loadingEvents();

function loadingEvents() {
	//ajax start
	$.ajax({
		url: '/calendar/calendarLoad', // 요청 경로 (서버에서 데이터를 가져올 API 엔드포인트)
		type: 'POST', 
		async: false,
		dataType: 'json',
		
		success: function(result) {
		  for(let i = 0; i < result.length; i++){
  		  const title = result[i].title;
   	 let color;

    if(title === '연차') {
      color = '#025464'; // 연차인 경우
   	 } else if(title === '반차') {
      color = '#1B9C85'; // 반차인 경우
      } else if(title === '조퇴') {
      color = '#1D267D'; // 조퇴인 경우 
        } else if(title === '병가') {
      color = '#E76161'; // 병가인 경우 
        } else if(title === '외출') {
      color = '#19A7CE'; // 외출인 경우 
        } else if(title === '출장') {
      color = '#643A6B'; // 출장인 경우 
        } else if(title === '교육') {
      color = '#9E6F21'; // 교육인 경우 
    } else {
      color = '#C92C6D'; // 휴일근무
    }

    result[i].color = color;
  }	
			console.log(result);
			 var jsonResult = JSON.stringify(result);
  			return_value = JSON.parse(jsonResult);
		},
		error: function() {
			alert('에러 발생');
		}
	});
	return return_value;
	//ajax end
}











