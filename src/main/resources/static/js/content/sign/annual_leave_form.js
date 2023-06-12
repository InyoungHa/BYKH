//let playaddApproverHTML = 0;


init();

function init(){
	//setTimeout(() => {
		setLeaveDays();
		setDateTimeActivate();
	//}, 100);
}

//연차/반차 여부에 따라 시간 선택 select 활성화
function setDateTimeActivate(){
	const annualType = document.querySelector('.annualType').value;
	if(annualType =='반차'){
		document.querySelector('.start-time').disabled = false;
		document.querySelector('.end-time').disabled = false;
	}else{
		document.querySelector('.start-time').disabled = true;
		document.querySelector('.end-time').disabled = true;
	}
}

//연차일수 계산
function setLeaveDays(){
	const start_date = new Date(document.querySelector('.start-date').value);
	const end_date = new Date(document.querySelector('.end-date').value);
	if(start_date != 'Invalid Date' && end_date != 'Invalid Date'){
		// 날짜의 차이를 계산 (밀리초 단위)
        const differenceInMilliseconds = Math.abs(end_date - start_date);

        // 밀리초를 일 단위로 변환
        const leaveDaysStr = (differenceInMilliseconds / (1000 * 60 * 60 * 24) + 1);
		
		document.querySelector('.leave-days').value = leaveDaysStr;
		document.querySelector('.show-leave-days').value = leaveDaysStr + '일';
		
	}
	//start_date가 end_date보다 작다면 알림 띄우기(부가기능)
}
//결재자 리스트 div에 추가
function addApproverHTML(approverNo, approverName, approverJob){
	//html에 추가
	console.log(approverJob);
	const approver_list_div = document.querySelector('.approver-list-div');
	let str = '';
	str += `
		<div class="row pt-2 pb-2 d-flex align-items-center justify-content-center border-bottom approver-div">
			<div class="col-3">
				<img src="/img/content/emp/YangDongGun.jpg" width="60px;" class="rounded-image">
			</div>
			<div class="col-7">
				${approverName} ${approverJob}
				<input type="hidden" value="${approverNo}" class="approverNo">
			</div>
			<div class="col-2 d-grid">
				<input type="button" class="btn btn-primary" value="삭제" onclick="delApproverHTML(this);">
			</div>
		</div>
			`;
	approver_list_div.insertAdjacentHTML('beforeend', str);
	//테이블 td 추가
	addStampTableTd(approverNo, approverName, approverJob);
	
}

//테이블 td 추가
function addStampTableTd(approverNo, approverName, approverJob) {
	const table = document.querySelector('.stamp-table');

	// 모든 <tr> 요소를 선택
	const trList = table.querySelectorAll('tr');


	// 각 <tr> 요소에 마지막 자식으로 <td> 요소 추가
	trList.forEach(function(tr) {
		const td = document.createElement('td');
		tr.appendChild(td);
	});

	//ejobtr 태그 마지막 자식 td에 직업 추가
	const str = `${approverJob}
				<input type="hidden" value="" name="">`;
	const e_job_tr = document.querySelector('.eJobTr');
	last_td = e_job_tr.querySelector('td:last-child');
	last_td.insertAdjacentHTML('afterbegin', str);
	
}

//결재자 지정 - '삭제'버튼 클릭 시 실행
function delApproverHTML(this_tag){
	//스탬프 테이블 td 삭제
	delStampTableTd(this_tag);
	//결재자 목록의 결재자 삭제
	this_tag.parentElement.parentElement.remove();
}

	

//테이블 Td 삭제
function delStampTableTd(this_tag) {
	
	const approver = this_tag.parentElement.parentElement
	console.log(approver);
	str = approver.querySelector('div:nth-child(2)').textContent;
	console.log(str);
	var table = document.querySelector('.stamp-table');
	var tdList = table.querySelectorAll('td');
	console.log(tdList);

	//!!!!!!!!!시간 남을 때 제대로 고치기
	for(let i = 0; i<tdList.length; i++){
		if(str.includes(tdList[i].textContent)){
			const addNum = Math.floor((tdList.length + 1) / 3);
			const idx = i == 5 ? 1 : i;
			tdList[idx].remove();
			tdList[idx+addNum].remove();
			tdList[idx+addNum+addNum].remove();
			break;
		}
	}
}

//기안올리기
function insertAnnualLeave(sgnStatus){
	//sgnStatus 값 세팅(임시저장/등록 여부)
	document.querySelector('.sgnStatus').value = sgnStatus;
	//approverNo값 세팅
	let approverNoStr = '';
	const approver_no_list = document.querySelectorAll('.approverNo');
	approver_no_list.forEach(function(approver_no){
		approverNoStr += approver_no.value + ','
	});
	document.querySelector('.approverNoStr').value = approverNoStr;
	
	signDocForm.submit();
};


//========이벤트=========
//모달이 열릴 때 emp 리스트 조회해오기
const searchApproverModal = document.querySelector('#searchApproverModal');

searchApproverModal.addEventListener('show.bs.modal', function() {
	//모달이 열릴 때
	const search_name_tag = document.querySelector('.search-name');
	//ajax start
	$.ajax({
		url: '/sign/getEmpListAjax', //요청경로
		type: 'post',
		async: true, //동기/비동기
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: {'ename':search_name_tag.value}, //필요한 데이터
		success: function(result) {
			
			console.log(result)
			const modal_body_div = searchApproverModal.querySelector('.modal-body');
			modal_body_div.replaceChildren('');
			let str = ``;
			str += `
			<table class="table table-hover align-middle">
						<colgroup>
							<col width="20%">
							<col width="*">
							<col width="20%">
						</colgroup>
						`;
			result['empList'].forEach(function(emp){
				str += ` 	<tr>	
								<td>
									<div>
										<img src="/img/content/emp/YangDongGun.jpg" width="70px;" class="rounded-image">
									</div>
								</td>
								<td>
									${emp.ename}  ${emp.e_job}
								</td>
								<td>
									<div class="d-grid">
										<button type="button" class="btn btn-primary add-approver-btn" onclick="addApproverHTML(${emp.empno}, '${emp.ename}', '${emp.e_job}');" >
											추가
										</button>
									</div>
								</td>
							</tr>`;
			});
			str += `</table>`;
			
			modal_body_div.insertAdjacentHTML('afterbegin', str);
			search_name_tag.value = '';
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end

});

//document.querySelector('.add-approver-btn').addEventListener('click', function(){
//	alert('asafasfasfas');
//});





