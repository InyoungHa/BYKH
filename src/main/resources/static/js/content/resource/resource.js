document.addEventListener('DOMContentLoaded', function() {

	/* initialize the external events
	-----------------------------------------------------------------*/

	document.querySelectorAll('#external-events .fc-event').forEach(function(eventElement) {

		eventElement.dataset.event = JSON.stringify({
			title: eventElement.textContent.trim(),
			stick: true,
		});
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

		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
		},
		views: {
			listWeek: { buttonText: '자원목록' },
		},
		eventClick: function(info) {
			$('#participant').val("");
			$('#resourceContent').val("");


			$("#saveCalendar").click(function() {
				var id = info.event._def.publicId; //id값
				var participant = $('#participant').val(); // 참가자 입력값 가져오기
  				var resourceContent = $('#resourceContent').val(); // 내용 입력값 가져오기




				 location.reload();

				// 인서트 기능 수행
				$.ajax({
					url: '/resource/insertScheduleDetail',
					type: 'post',
					async: false,
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					data: {
						'id': id,
						'participant': participant,
						'resourceContent': resourceContent
					},
					success: function(result) {
					},
					error: function() {
						alert('인서트 실패');
					}
				});
		});


		var id = info.event._def.publicId;
				//ajax start
				$.ajax({
					url: '/resource/selectCalendarDetail', //요청경로
					type: 'post',
					async: false,
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					data: {
						'id': id
					}, //HTML에받는  데이터
					success: function(result) {
						var firstObject = result[0];
						var participant = firstObject.participant;
						var resourceContent = firstObject.resourceContent;
						$('#participant').val(participant);
						$('#resourceContent').val(resourceContent);
					},
					error: function() {
						alert('실패');
					}
				});
				    
			//ajax end
			console.log(info.event);
			$("#calendarModalDetail").modal("show");
			$(".resourceContent").val(info.event.title);
			$(".schedule_code").val(info.event._def.publicId);

			//시작날짜
			var startTime = info.event._instance.range.start;
			var formattedStartTime = moment.utc(startTime).format("YYYY/M월/D일/A h:mm분");
			formattedStartTime = formattedStartTime.replace("AM", "오전").replace("PM", "오후");
			$("#start_time_resource").val(formattedStartTime);

			//종료날짜
			var endTime = info.event._instance.range.end;
			var formattedStartTime = moment.utc(endTime).format("YYYY/M월/D일/A h:mm분");
			formattedStartTime = formattedStartTime.replace("AM", "오전").replace("PM", "오후");
			$("#end_time_resource").val(formattedStartTime);


			// 총 사용 시간
			var totalTime = moment.utc(endTime).diff(startTime);
			var duration = moment.duration(totalTime);

			var hours = Math.floor(duration.asHours());
			var minutes = duration.minutes();

			var totalTimeDisplay = "";
			if (hours > 0) {
				totalTimeDisplay += hours + "시간";
			}
			if (minutes > 0) {
				totalTimeDisplay += " " + minutes + "분";
			}

			$("#total_time_resource").val(totalTimeDisplay.trim());


			// change the border color just for fun
			info.el.style.borderColor = 'red';
		},
		
		locale: 'ko', // 한국어 설정
		editable: true,
		droppable: true,  // 드래그 가능
		timeZone: 'UTC',
		dragRevertDuration: 0,
		googleCalendarApiKey: "AIzaSyBzz_NTdjVWRldBZ7kEZq-5zDGsNqK2ZzI",
		eventSources: [
			{
				events: return_value

			},

			{
				googleCalendarId: 'ko.south_korea#holiday@group.v.calendar.google.com'
				, className: "koHolidays"
				, color: '#f9f5f6'   // an option!
				, textColor: 'red' // an option!
				, id: '2'
			},
		],

		//이벤트 드래그 드랍 후 저장 
		eventReceive: function(info) {
			if (info.view.type === 'dayGridMonth') {
				location.reload();
			}
			const event_info = info.event;

			var events = [];
			const obj = {
				title: event_info._def.title,
				allDay: event_info._def.allDay,
				start: event_info._instance.range.start,
				end: event_info._instance.range.end
			};
			console.log(obj);
			events.push(obj);

			var jsondata = JSON.stringify(events);
			jsonEvent = JSON.parse(jsondata);

			var updatedEvents = jsonEvent.map(function(event) {
				return event;
			});

			var jsondataUpdated = JSON.stringify(updatedEvents);

			console.log(jsondataUpdated);

			//ajax start
			$.ajax({
				url: '/calendar/resourceCalendarUpdate2', //요청경로
				type: 'post',
				async: false,
				contentType: 'application/json; charset=UTF-8',
				data: jsondataUpdated,
				dataType: 'text',
				success: function(result) {
					

				},
				error: function() {
				}
			});
		},

		//이벤트 일정 이동시
		eventDrop: function(info) {
			const event_info = info.event;
			var events = [];

			const obj = {
				id: event_info._def.publicId,
				title: event_info._def.title,
				allDay: event_info._def.allDay,
				start: event_info._instance.range.start,
				end: event_info._instance.range.end
			};
			console.log(obj);


			events.push(obj);



			var jsondata = JSON.stringify(events);
			jsonEvent = JSON.parse(jsondata);

			var updatedEvents = jsonEvent.map(function(event) {
				return event;
			});

			var jsondataUpdated = JSON.stringify(updatedEvents);

			console.log(jsondataUpdated);

			//ajax start
			$.ajax({
				url: '/calendar/resourceCalendarUpdate2', //요청경로
				type: 'post',
				async: false,
				contentType: 'application/json; charset=UTF-8',
				data: jsondataUpdated,
				dataType: 'text',
				success: function(result) {

				},
				error: function() {
				}
			});
		},

		//주 일 시간 대 변경 업데이트
		eventResize: function(info) {
			if (info.view.type === 'timeGridWeek' || info.view.type === 'timeGridDay') {
			
				const event_info = info.event;
				var events = [];

				const obj = {
					title: event_info._def.title,
					allDay: event_info._def.allDay,
					start: event_info._instance.range.start,
					end: event_info._instance.range.end,
					id: event_info._def.publicId
				};
				console.log(obj);


				events.push(obj);



				var jsondata = JSON.stringify(events);
				jsonEvent = JSON.parse(jsondata);

				var updatedEvents = jsonEvent.map(function(event) {
					return event;
				});

				var jsondataUpdated = JSON.stringify(updatedEvents);

				console.log(jsondataUpdated);

				//ajax start
				$.ajax({
					url: '/calendar/resourceCalendarUpdate', //요청경로
					type: 'post',
					async: false,
					contentType: 'application/json; charset=UTF-8',
					data: jsondataUpdated,
					dataType: 'text',
					success: function(result) {
						location.reload();
					},
					error: function() {
					}
				});

			}
		},

		
		//드래그앤드랍 삭제
		eventDragStop: function(info) {
		const id = info.event.id;
		console.log(id);			
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
		//ajax start
			$.ajax({
				url: '/calendar/deleteResourceSchedule', //요청경로
				type: 'post',
				async: false,
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: {
					id: id
				},
				success: function(result) {
					location.reload();			
				},
				error: function() {
				}
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



/////////일정 조회////////////
var return_value = null;

loadingEvents();

function loadingEvents() {
	
	//ajax start
	$.ajax({
		url: '/calendar/resourceCalendarLoad', // 요청 경로 (서버에서 데이터를 가져올 API 엔드포인트)
		type: 'POST',
		async: false,
		dataType: 'json',

		success: function(result) {
		
			for (let i = 0; i < result.length; i++) {
				
				const title = result[i].title;
				let color;
				
				if (title === '회의실01') {
					color = '#025464'; // 회의실01인 경우
				} else if (title === '회의실02') {
					color = '#1B9C85'; // 회의실02인 경우
				} else if (title === '회의실03') {
					color = '#1D267D'; // 회의실03인 경우 
				} else if (title === '투싼 차량') {
					color = '#E76161'; // 투싼 차량인 경우 
				} else if (title === '쏘나타 차량') {
					color = '#19A7CE'; // 쏘나타 차량인 경우 
				} else if (title === '스타리아 차량') {
					color = '#643A6B'; // 스타리아 차량인 경우 
				} else if (title === '빔프로젝터01') {
					color = '#9E6F21'; // 빔프로젝터 01인 경우 
				} else if (title === '빔프로젝터02') {
					color = '#c92c6d'; // 빔프로젝터 02인 경우 
				} else {
					color = '#E8A0BF'; // 나머지
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
	
}


// 시작 시간 초기값 설정
let emptyOptionStart = document.createElement("option");
emptyOptionStart.value = "";
emptyOptionStart.innerText = "";
document.getElementById("calendar_start_time").appendChild(emptyOptionStart);

for (let hour = 0; hour < 24; hour++) {
	for (let minute = 0; minute < 60; minute += 30) {
		let option = document.createElement("option");
		option.value = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
		option.innerText = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
		document.getElementById("calendar_start_time").appendChild(option);
	}
}

// 종료 시간 초기값 설정
let emptyOptionEnd = document.createElement("option");
emptyOptionEnd.value = "";
emptyOptionEnd.innerText = "";
document.getElementById("calendar_end_time").appendChild(emptyOptionEnd);

for (let hour = 0; hour < 24; hour++) {
	for (let minute = 0; minute < 60; minute += 30) {
		let option = document.createElement("option");
		option.value = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
		option.innerText = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
		document.getElementById("calendar_end_time").appendChild(option);
	}
}








