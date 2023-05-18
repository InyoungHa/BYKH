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




  var calendar = new FullCalendar.Calendar(calendarEl, {
	 events: [
    {
      title: '일정추가가능',
   		 start : "2023-05-18"
	 , end : "2023-05-20"
    , backgroundColor : "#9775fa"
    , borderColor : "#9775fa"
    }
  ],
	
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialDate: '2023-05-18', // 초기 날짜 설정 (설정하지 않으면 오늘 날짜가 보인다.)
    
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







