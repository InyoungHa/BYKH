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
		views: {
			listWeek: { buttonText: '자원목록' },
		},
		eventClick: function(info) {

			$('#participant').val("");
			$('#resourceContent').val("");


			$('#saveCalendar').off('click').on('click', function() {
				var id = info.event._def.publicId; // id값
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
					success: function(result) { },
					error: function() {
						alert('인서트 실패');
					}
				});
			});

			var id = info.event._def.publicId;
			console.log(id);
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

					console.log(participant);
					console.log(resourceContent);
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

		eventReceive: function(info) {
			if (dropRemoveCheckbox.checked) {
				info.draggedEl.remove();
			}
		},

		customButtons: {
			addEventButton: { // 추가한 버튼 설정
				text: "자원 추가",  // 버튼 내용
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
							"color": '#E8A0BF',
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
		url: '/calendar/resourceCalendarSave', //요청경로
		type: 'post',
		async: false,
		contentType: 'application/json; charset=UTF-8',
		data: jsondata,
		dataType: 'text',
		success: function(result) {
			alert("저장되었습니다.");
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


















