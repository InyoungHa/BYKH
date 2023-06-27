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
   $("li").after("<li>" + toDoContent + "</li>");
    //toDolist 저장
	  //ajax start
	  $.ajax({
		  url: '/user/insertToDoListAjax', //요청경로
		  type: 'post',
		  async: true,
		  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		  data: {'toDoContent': toDoContent}, //HTML에받는  데이터
		  success: function(result) {

			location.reload();
		  },
		  error: function() {
			  alert('글자 수 16자 제한');
			  location.reload();
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
		  url: '/user/deleteToDoListAjax', //요청경로
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



//메인 날씨
$(document).ready(function() {
      let weatherIcon = {
        '01' : 'fas fa-sun',
        '02' : 'fas fa-cloud-sun',
        '03' : 'fas fa-cloud',
        '04' : 'fas fa-cloud-meatball',
        '09' : 'fas fa-cloud-sun-rain',
        '10' : 'fas fa-cloud-showers-heavy',
        '11' : 'fas fa-poo-storm',
        '13' : 'far fa-snowflake',
        '50' : 'fas fa-smog'
      };
 	//서울날씨
    $.ajax({
	url: 'http://api.openweathermap.org/data/2.5/weather?q=seoul&APPID=39780da450a1a87f7b037001513b9e8b&units=metric&lang=kr',
 	lang : "kr",
    dataType:'json',
    type:'GET',
    success:function(data){
	console.log(data);
      var $Icon = (data.weather[0].icon).substr(0,2);
      var $Temp = Math.floor(data.main.temp) + 'º';
      var $city = '서울';									
 
      $('.CurrIcon').append('<i class="' + weatherIcon[$Icon] +'"></i>');
      $('.CurrTemp').prepend($Temp);
      $('.City').append($city);
      }
    })
    //인천날씨
    $.ajax({
	url: 'http://api.openweathermap.org/data/2.5/weather?q=incheon&APPID=39780da450a1a87f7b037001513b9e8b&units=metric&lang=kr',
 	lang : "kr",
    dataType:'json',
    type:'GET',
    success:function(data){
	console.log(data);
      var $Icon = (data.weather[0].icon).substr(0,2);
      var $Temp = Math.floor(data.main.temp) + 'º';
      var $city = '인천';									
 
      $('.CurrIcon2').append('<i class="' + weatherIcon[$Icon] +'"></i>');
      $('.CurrTemp2').prepend($Temp);
      $('.City2').append($city);
      }
    })
    //부산날씨
    $.ajax({
	url: 'http://api.openweathermap.org/data/2.5/weather?q=busan&APPID=39780da450a1a87f7b037001513b9e8b&units=metric&lang=kr',
 	lang : "kr",
    dataType:'json',
    type:'GET',
    success:function(data){
	console.log(data);
      var $Icon = (data.weather[0].icon).substr(0,2);
      var $Temp = Math.floor(data.main.temp) + 'º';
      var $city = '부산';									
 
      $('.CurrIcon3').append('<i class="' + weatherIcon[$Icon] +'"></i>');
      $('.CurrTemp3').prepend($Temp);
      $('.City3').append($city);
      }
    })
    
    //여수날씨
    $.ajax({
	url: 'http://api.openweathermap.org/data/2.5/weather?q=yeosu&APPID=39780da450a1a87f7b037001513b9e8b&units=metric&lang=kr',
 	lang : "kr",
    dataType:'json',
    type:'GET',
    success:function(data){
	console.log(data);
      var $Icon = (data.weather[0].icon).substr(0,2);
      var $Temp = Math.floor(data.main.temp) + 'º';
      var $city = '여수';									
 
      $('.CurrIcon4').append('<i class="' + weatherIcon[$Icon] +'"></i>');
      $('.CurrTemp4').prepend($Temp);
      $('.City4').append($city);
      }
    })
    
    
    });

   

//제목 클릭 시 
function showSignDocModal(clickTag){
	const showSignDocModalTag = document.querySelector('#showSignDoc');
	const modal = new bootstrap.Modal(showSignDocModalTag);
	
	//모달 각 영역 선택
	const modalTitleArea = document.querySelector('#showSignDoc .modal-title');
	const modalBodyArea = document.querySelector('#showSignDoc .modal-body');
	
	//내용 초기화
	//modalTitleArea.replaceChildren();
	modalBodyArea.replaceChildren();
	//문서번호, 타입 가져오기
	const docNo = clickTag.dataset.docNo;
	const docType = clickTag.dataset.docType;
	const isApproved = clickTag.dataset.isApproved;
	
	
	//ajax start
	$.ajax({
		url: '/sign/getSignDocDetailAjax', //요청경로
		type: 'post',
		async: true, //동기/비동기
		//contentType: 'application/json; charset=UTF-8',
		//contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: {'docNo':docNo, 'docType':docType}, //필요한 데이터
		success: function(result) {
			console.log(result);
			//키값 가져옴(list 형태)
			const key = Object.keys(result);
			let str = '';
			//연차신청서일 경우
			if(key[0] == 'docAnnualLeave'){
				const signWriteInfo = result[key[0]];
				str += `
				<div class="row">
						<div class="col-8 sign-doc-scroll" style="border: 1px solid #dee2e6;">
							<input type="hidden" class="docNo" value="${signWriteInfo.docNo}">
							<input type="hidden" class="docType" value="${docType}">
							<div class="row mt-3 mb-3">
								<div class="col text-center">
									<h2>연차신청서</h2>
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-7">
									<table class="table table-bordered text-center sgn-info-table">
										<tbody>
											<tr>
												<td>기안자</td>
												<td>
													${signWriteInfo.empVO.ename}
												</td>
											</tr>
											<tr>
												<td>기안부서</td>
												<td>
													${signWriteInfo.empVO.deptVO.dename}
												</td>
											</tr>
											<tr>
												<td>기안일</td>
												<td>
													${signWriteInfo.insertDate}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div class=" col-5">
									<div class="float-end">
										<table class="table table-bordered text-center stamp-table">
											<tbody>
												<tr class="eJobTr">
													<td>담당</td>`;
												
												signWriteInfo.signVOList.forEach(function(signVO){													
													str += `
														<td>
															${signVO.approverJob}
														</td>`;
												});
												str +=	`
												</tr>
												<tr class="enameTr">
													<td>
														${signWriteInfo.empVO.ename}
													</td>`;
												signWriteInfo.signVOList.forEach(function(signVO){
												str +=
												   `<td>
												   		
														${signVO.sgnResultStr == '결재' ? signVO.approverName : signVO.sgnResultStr == '미결재' ? '반려' : ''}
													</td>`;
												});
												str +=	`
												</tr>
												<tr class="nowDateTr">
													<td>${signWriteInfo.insertDate}</td>`;
												signWriteInfo.signVOList.forEach(function(signVO){
												str +=	`
													<td>${signVO.sgnDate != null ? signVO.sgnDate : ''}</td>`;
												});
												str +=	`
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<table class="table table-bordered text-center annual-content-table">
										<tbody>
											<colgroup>
												<col width="20%">
												<col width="*">
											</colgroup>
											<tr>
												<td>휴가 종류</td>
												<td>
													${signWriteInfo.docAnnualLeaveVO.dalType}
												</td>
											</tr>
										<tr>
											<td>기간 및 일시</td>
											<td>
												<div class="row">
													<div class="col-7">
														${signWriteInfo.docAnnualLeaveVO.startDate}
														 ~ 
														${signWriteInfo.docAnnualLeaveVO.endDate}
													</div>`;
													if(signWriteInfo.docAnnualLeaveVO.startTime != 0 && signWriteInfo.docAnnualLeaveVO.endTime != 0){
														str += `
														<div class="col-5">
															${signWriteInfo.docAnnualLeaveVO.startTime}	 
															시 ~ 
															${signWriteInfo.docAnnualLeaveVO.endTime}시	
														</div>`;
													}
													str += `
												</div>
											</td>
										</tr>
										<tr>
												<td>연차일수</td>
												<td>
													${signWriteInfo.docAnnualLeaveVO.leaveDays}일
												</td>
											</tr>
											<tr>
												<td>휴가 사유</td>
												<td>
													${signWriteInfo.docAnnualLeaveVO.leaveReason}
												</td>
											</tr>
											<tr>
												<td colspan="2">
													1. 연차의 사용은 근로기준법에 따라 전년도에 발생한 개인별 잔여 연차에 한하여 사용합을 원칙으로 한다. 단, 최초입사시에는 근로기준법에 따라 발생 예정된 연차를 차용하여 월 1회 사용 할 수 있다.<br>
													2. 경조사 휴가는 행사일을 증명할 수 있는 가족 관계 증명서 또는 등본, 청첩장 등 제출<br>
													3. 공가(예비군/민방위)는 사전에 통지서를, 사후에 참석증을 반드시 제출
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>			
						</div>
						<div class="col-4">
						<div class="row" style="min-height: 400px;">
						<div class="col">
						
							<div class="row">
								<div class="col">
									<h3>결재라인</h3>
								</div>
							</div>`;
							let isNextApprover = false;
							let isCanBeDeleted = false;
							const loginId = document.querySelector('.login-id').value;
							signWriteInfo.signVOList.forEach(function(sign){
								str += `<div class="row pt-2 pb-2 d-flex align-items-center justify-content-center border-bottom">
									<div class="col-3">
										<img src="${sign.attachedFileName == null ? '/upload/empImg/test.jpg' : '/upload/empImg/' + sign.attachedFileName}" width="60px;"
											class="rounded-image">
									</div>
									<div class="col-9">
										${sign.approverName} ${sign.approverJob}
									</div>`;
								if(sign.sgnComent != null){
									str += `
									<div class="col-12 mt-3">
										${sign.sgnComent}
									</div>
									`;
								}
								//결재/반려 버튼 노출여부 지정
								if(loginId == sign.nextApproverNo){
									isNextApprover = true;
								}	
								// 삭제버튼 노출여부 지정 (작성자이고, 결재한 결재자가 없다면 노출)
								if(loginId == signWriteInfo.writerNo && isApproved == 0){
									isCanBeDeleted = true;
								}	
								str += `</div>
								`;
							});
							str += `
							</div>
								</div>
								`;
							if(isNextApprover){	
								str += `
							<!-- 다음 결재자일 경우 코맨트 활성화 -->
							<div class="row" style="min-height: 400px;">
							<div class="col">
							<div class="row">
								<div class="col-12">
									<h3>코멘트</h3>
								</div>
								<div class="col">
									<textarea rows="5" cols="30" class="sgnComent"></textarea>
								</div>
							</div>
							</div>
							</div>`;
							
							str += `
								<div class="row">
									
									<div class="col-6 d-grid">
										<input type="button" class="btn btn-primary" value="반려" onclick="updateSignResult(0, ${docNo});">
									</div>
									<div class="col-6 d-grid">
										<input type="button" class="btn btn-primary" value="결재" onclick="updateSignResult(1, ${docNo});">
									</div>
								</div>`
							}
							if(isCanBeDeleted){
								str += `
								<div style="min-height:350px;"></div>
								<div class="row">
									<div class="col-12 d-grid">
										<input type="button" class="btn btn-primary" value="삭제" onclick="deleteSgnDoc(${docType}, ${docNo});">
									</div>
								</div>
								`;
							}
							if(!isCanBeDeleted && !isNextApprover){
								str+= `<div style="min-height:400px;"></div>`;
							}
						str += `
								<div class="row mt-1">
									<div class="col-12 d-grid">
										<input type="button" class="btn btn-primary" value="인쇄" onclick="printArea();">
									</div>
								</div>
							</div>
				
				`;
				
				
				
			}
			//구매신청서일 경우
			else if(key[0] == 'docPurchaseOrder'){
				const signWriteInfo = result[key[0]];
				console.log(signWriteInfo);
				str += `
			<div class="row">
			<div class="col-8 sign-doc-scroll" id="sgnDocArea" style="border: 1px solid #dee2e6;">
			<input type="hidden" class="docType" value="${docType}">
			<div class="row mt-3 mb-3">
								<div class="col text-center">
									<h2>구매신청서</h2>
								</div>
							</div>
			<div class="row mb-3">
				<div class="col-7">
					<table class="table table-bordered text-center sgn-info-table">
						<tbody>
							<tr>
								<td>기안자</td>
								<td>
									${signWriteInfo.empVO.ename}
								</td>
							</tr>
							<tr>
								<td>기안부서</td>
								<td>
									${signWriteInfo.empVO.deptVO.dename}<!-- 자동입력 -->
									<input type="hidden" class="deptNo" th:value="${signWriteInfo.empVO.deptno}">
								</td>
							</tr>
							<tr>
								<td>기안일</td>
								<td>
									${signWriteInfo.insertDate}<!-- 자동입력 -->
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class=" col-5">
					<div class="float-end">
						<table class="table table-bordered text-center stamp-table">
							<tbody>
								<tr class="eJobTr">
									<td>담당</td>`;
								signWriteInfo.signVOList.forEach(function(signVO){
									str += `
									<td>
										${signVO.approverJob}
									</td>`;									
								});
									
									str += `
								</tr>
								<tr class="enameTr">
									<td>
										${signWriteInfo.empVO.ename}
									</td>`;
								signWriteInfo.signVOList.forEach(function(signVO){
									str += `
									<td>
										${signVO.sgnResultStr == '결재' ? signVO.approverName : signVO.sgnResultStr == '미결재' ? '반려' : ''}
									</td>`;
								});
									str += `
								</tr>
								<tr class="nowDateTr">
									<td>${signWriteInfo.insertDate}</td><!-- 시간 -->
									`;
								signWriteInfo.signVOList.forEach(function(signVO){	
									str += `
									<td>${signVO.sgnDate != null ? signVO.sgnDate : ''}</td>`;
								});	
									str += `
								</tr>
								<!-- 결재자 추가시 추가되어야 하는 코드 끝 -->
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="row">
				
				<div class="col-12 mt-3">
					<table class="table table-bordered text-center purchase-content-table">
						<colgroup>
							<col width="40%">
							<col width="20%">
							<col width="20%">
							<col width="20%">
						</colgroup>
						<thead>
							<tr>
								<td>품 명</td>
								<td>수 량</td>
								<td>단 가</td>
								<td>금 액</td>
							</tr>
						</thead>
						<tbody>`;
					signWriteInfo.docPurchaseOrderVO.buyVO.buyDetailVOList.forEach(function(buyDetail){
						str += `
							<tr>
								<td>${buyDetail.itemVO.itemName}</td>
								<td>${buyDetail.buyCnt}</td>
								<td>${buyDetail.itemVO.itemPrice}</td>
								<td>${buyDetail.buyDetailPrice}</td>
							</tr>
						`;
					});
						str += `
							<tr>
								<td>합 계</td>
								<td colspan="2"></td>
								<td  class="buyPriceTd">
									${signWriteInfo.docPurchaseOrderVO.buyVO.buyPrice}
								</td>
							</tr>
							<tr>
								<td>구매사유</td>
								<td colspan="3"
								style="width: 100%; height: 200px; text-align: left;">
									${signWriteInfo.docPurchaseOrderVO.dpoComment == null ? '' : signWriteInfo.docPurchaseOrderVO.dpoComment}
								</td>
							</tr>
							
						</tbody>
					</table>
				</div>
			</div>			
		</div>
		
		<div class="col-4">
		<div class="row" style="min-height: 400px;">
						<div class="col">
						
							<div class="row">
								<div class="col">
									<h3>결재라인</h3>
								</div>
							</div>`;
							let isNextApprover = false;
							let isCanBeDeleted = false;
							const loginId = document.querySelector('.login-id').value;
							signWriteInfo.signVOList.forEach(function(sign){
								str += `<div class="row pt-2 pb-2 d-flex align-items-center justify-content-center border-bottom">
									<div class="col-3">
										<img src="${sign.attachedFileName == null ? '/upload/empImg/test.jpg' : '/upload/empImg/' + sign.attachedFileName}" width="60px;"
											class="rounded-image">
									</div>
									<div class="col-9">
										${sign.approverName} ${sign.approverJob}
									</div>`;
								if(sign.sgnComent != null){
									console.log('signComent if문 실행');
									str += `
									<div class="col-12 mt-3">
										${sign.sgnComent}
									</div>
									`;
								}
								//결재/반려 버튼 노출여부 지정
								if(loginId == sign.nextApproverNo){
									isNextApprover = true;
								}	
								// 삭제버튼 노출여부 지정 (작성자이고, 결재한 결재자가 없다면 노출)
								if(loginId == signWriteInfo.writerNo && isApproved == 0){
									isCanBeDeleted = true;
								}	
								str += `</div>
								`;
							});
							str += `
							</div>
								</div>
								`;
							if(isNextApprover){	
								str += `
							<!-- 다음 결재자일 경우 코맨트 활성화 -->
							<div class="row" style="min-height: 400px;">
							<div class="col">
							<div class="row">
								<div class="col-12">
									<h3>코멘트</h3>
								</div>
								<div class="col">
									<textarea rows="5" cols="30" class="sgnComent"></textarea>
								</div>
							</div>
							</div>
							</div>`;
							
							str += `
								<div class="row">
									
									<div class="col-6 d-grid">
										<input type="button" class="btn btn-primary" value="반려" onclick="updateSignResult(0, ${docNo});">
									</div>
									<div class="col-6 d-grid">
										<input type="button" class="btn btn-primary" value="결재" onclick="updateSignResult(1, ${docNo});">
									</div>
								</div>`
							}
							if(isCanBeDeleted){
								str += `
								<div style="min-height:350px;"></div>
								<div class="row">
									<div class="col-12 d-grid">
										<input type="button" class="btn btn-primary" value="삭제" onclick="deleteSgnDoc(${docType}, ${docNo});">
									</div>
								</div>
								`;
							}
							if(!isCanBeDeleted && !isNextApprover){
								str+= `<div style="min-height:400px;"></div>`;
							}
						str += `
								<div class="row mt-1">
									<div class="col-12 d-grid">
										<input type="button" class="btn btn-primary" value="인쇄" onclick="printArea();">
									</div>
								</div>
							</div>
				
				`;
				
			}
			//매출보고서일 경우
			
			
			//
			modalBodyArea.insertAdjacentHTML('afterbegin', str);
			
			
			modal.show();
		},
		error: function() {
			alert('실패');
		}
	});
	
	modal.hide();
}
//인쇄
function printArea(){
 var initBody = document.body.innerHTML;
 	console.log(initBody);
    window.onbeforeprint = function(){
        document.body.innerHTML = document.querySelector("#sgnDocArea").innerHTML;
    }
    window.onafterprint = function(){
        document.body.innerHTML = initBody;
    }
    window.print();
    location.reload();
}
//반려 또는 결재 버튼 클릭 시 실행
function updateSignResult(sgnResult, docNo){
	
	//결재자 아이디값 세팅(현재 로그인중인 사람)
	//임시데이터(양동근 부장)
	if(confirm(`${sgnResult == 0 ? '반려' : '결재'}하시겠습니까?`)){
		const approverNo = document.querySelector('.login-id').value;
		const sgnComent = document.querySelector('.sgnComent').value;
		const docType = document.querySelector('.docType').value;
		//ajax start
		$.ajax({
			url: '/sign/updateSignResultAjax', //요청경로
			type: 'post',
			async: true, //동기/비동기
			//contentType: 'application/json; charset=UTF-8',
			//contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {'sgnResult':sgnResult, 'approverNo':approverNo, 
					'docNo':docNo, 'sgnComent':sgnComent,
					'docType':docType}, //필요한 데이터
			success: function(result) {
					alert(`${sgnResult == 0 ? '반려' : '결재'}되었습니다.`);
					location.href='/user/main'
			},
			error: function() {
				alert('실패');
			}
		});
		//ajax end
	}
}

