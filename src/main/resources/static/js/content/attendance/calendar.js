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
			left: 'prev,next today,addEventButton',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
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

		eventReceive: function(info) {
			if (dropRemoveCheckbox.checked) {
				info.draggedEl.remove();
			}
		},

		customButtons: {
			addEventButton: { // 추가한 버튼 설정
				text: "일정 추가",  // 버튼 내용
				click: function() { // 버튼 클릭 시 이벤트 추가
					$("#sprintSettingModalClose").click(function() {
						$("#calendarModal").modal("hide");
					});

					var return_value = [];

					$("#calendarModal").modal("show");

					$("#addCalendar").on("click", function() {
						var content = $("#calendar_content").val();
						var start_date = $("#calendar_start_date").val();
						var end_date = $("#calendar_end_date").val();
						var start_time = $("#calendar_start_time").val();
						var end_time = $("#calendar_end_time").val();
						var allDay = false;

						if (content == null || content == "") {
							alert("내용을 입력하세요.");
						} else if (start_date == "" || end_date == "") {
							alert("날짜를 입력하세요.");
						} else if (new Date(end_date) - new Date(start_date) < 0) {
							alert("종료일이 시작일보다 먼저입니다.");
						} else if (start_time == "" && end_time == "") {
							allDay = true;
						} else if (start_time == "" && end_time != "") {
							alert("시작 시간을 선택하세요.");
							return;
						} else if (start_time != "" && end_time == "") {
							alert("종료 시간을 선택하세요.");
							return;
						} else {
							start_date += "T" + start_time;
							end_date += "T" + end_time;
						}

						var obj = {
							"title": content,
							"start": start_date,
							"allDay": allDay,
							"color": '#F2D8D8',
							"end": end_date
						};
						return_value.push(obj);
						console.log(return_value);

						// 기존의 이벤트 소스를 가져옴.
						var eventSources = calendar.getOption('eventSources');

						// 새로운 이벤트 소스를 생성하여 기존의 이벤트 소스와 합침.
						var newEventSources = eventSources.concat({
							events: return_value
						});

						// 합쳐진 이벤트 소스를 캘린더에 설정.
						calendar.setOption('eventSources', newEventSources);

						// 모달 숨기기
						$("#calendarModal").modal("hide");
					});

				}

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

///일정저장////
function allSave() {
	var allEvent = calendar.getEvents();
	var events = [];

	for (const e of allEvent) {
	}
	for (var i = 0; i < allEvent.length; i++) {

		const is_holy = allEvent[i]._def.extendedProps.description != undefined ? true : false;
		if (!is_holy) {
			var obj = {
				title: allEvent[i]._def.title,
				allDay: allEvent[i]._def.allDay,
				start: allEvent[i]._instance.range.start,
				end: allEvent[i]._instance.range.end,

			};
			events.push(obj);
		}
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

/////////일정 조회////////////
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
			for (let i = 0; i < result.length; i++) {
				const title = result[i].title;
				let color;

				if (title === '연차') {
					color = '#025464'; // 연차인 경우
				} else if (title === '반차') {
					color = '#1B9C85'; // 반차인 경우
				} else if (title === '조퇴') {
					color = '#1D267D'; // 조퇴인 경우 
				} else if (title === '병가') {
					color = '#E76161'; // 병가인 경우 
				} else if (title === '외출') {
					color = '#19A7CE'; // 외출인 경우 
				} else if (title === '출장') {
					color = '#643A6B'; // 출장인 경우 
				} else if (title === '교육') {
					color = '#9E6F21'; // 교육인 경우 
				} else if (title === '휴일근무') {
					color = '#c92c6d'; // 휴일근무인 경우 
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


