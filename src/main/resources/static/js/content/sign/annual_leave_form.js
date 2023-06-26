//let playaddApproverHTML = 0;


init();

function init(){
	setLeaveDays();
	setDateTimeActivate();
	
	$('.dept').hide();
	
	//도시명 눌렀을 때
	$(".loc").click(function() {
		//누른 도시 말고 다른 li 태그의 ul 들고와서 닫아주기
		const otherDept = $(".loc").not(this).next(".dept");
		
		$.each(otherDept, function() {
			if($(this).css("display") == "block") {
				$(this).slideUp(500);
			}
		});
		
		//내거는 열기
		$(this).next(".dept").slideToggle(500);
	});
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
function addApproverHTML(approverNo, approverName, approverJob, img_route){
	//결재자 리스트 영역
	const approver_list_div = document.querySelector('.approver-list-div');
	
	//함수를 종료할지 결정(중복검사, 본인선택)
	let isReturn = false;
	//중복검사
	const approver_no_list = document.querySelectorAll('.approverNo');
	console.log(approver_no_list);
	let return_msg = '';
	for (let i=0; i<approver_no_list.length; i++){
		if(approver_no_list[i].value == approverNo){
			return_msg = '이미 결재 목록에 있습니다.';
			isReturn = true;
		}
	}
	//본인 선택 금지
	const writer_no = document.querySelector('.writerNo').value;
	if(writer_no == approverNo){
		return_msg = '자신은 추가할 수 없습니다.';
		isReturn = true;
	}
	
	if(isReturn){
		alert(return_msg);
		return ;
	}
	
	let str = '';
	str += `
		<div class="row pt-2 pb-2 d-flex align-items-center justify-content-center border-bottom approver-div">
			<div class="col-3">
				<img src="${img_route}" width="60px;" class="rounded-image">
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
	//'참조' 또는 '추가' 버튼 클릭에 따라 각 영역에 추가
	approver_list_div.insertAdjacentHTML('beforeend', str);
	//테이블 td 추가
	addStampTableTd(approverNo, approverName, approverJob);
	
}
//참조자 리스트 div에 추가
function addReferrerHTML(referrerNo, referrerName){
	//참조자 리스트 영역	
	const referrer_list_div = document.querySelector('.referrer-list-div');
	
	//중복검사
	const referrer_span_list = referrer_list_div.querySelectorAll('span');
	for(let i=0; i<referrer_span_list.length; i++){
		if(referrerNo == referrer_span_list[i].dataset.referrerNo){
			return ;
		}
	}
	
	let str = '';
	str += `
		<span data-referrer-no="${referrerNo}">
			${referrerName}
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
				class="bi bi-x-circle-fill" viewBox="0 0 16 16"
				onclick="delReferrerHTML(this);"
				style="cursor: pointer;">
			  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
			</svg>
		</span>
			`;
	//'참조' 또는 '추가' 버튼 클릭에 따라 각 영역에 추가
	referrer_list_div.insertAdjacentHTML('beforeend', str);
	
}
function delReferrerHTML(clickTag){
	
	clickTag.parentElement.remove();
}
// 조직도 사원 조회
function getDeptEmpList(deptno){
		//ajax start
	$.ajax({
		url: '/user/getDeptEmpListAjax', //요청경로
		type: 'post',
		async: true, //동기/비동기
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: {'deptno' : deptno}, //필요한 데이터
		success: function(result) {
			const empListArea = document.querySelector('.emp-list-area');
			empListArea.replaceChildren();
			let str = '';
			for (const emp of result){
				//console.log(emp.eImgVO.attachedFileName);
				const img_route = emp.eimgVO.attached_file_name == null ? '/upload/empImg/test.jpg' : '/upload/empImg/'+emp.eimgVO.attached_file_name;
				str += `
					<div class="row pt-2 pb-2 d-flex align-items-center justify-content-center border-bottom approver-div"
							>
						<div class="col-3">
							
							<img src="${img_route}" width="60px;" class="rounded-image">
						</div>
						<div class="col-7">
							${emp.ename} ${emp.e_job}
						</div>
						<div class="col-2 d-grid">
								<input type="button" class="btn btn-primary mb-1" value="참조" onclick="addReferrerHTML(${emp.empno}, '${emp.ename}');">
								<input type="button" class="btn btn-primary" value="추가" onclick="addApproverHTML(${emp.empno}, '${emp.ename}', '${emp.e_job}', '${img_route}');">
						</div>
					</div>
						`;				
			
			}
			empListArea.insertAdjacentHTML('afterbegin', str);
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}

// dept list div의 높이가 변경될 때마다 실행되는 함수
const deptListArea = document.querySelector(".dept-list-area");
const empListArea = document.querySelector(".emp-list-area");
function syncHeights() {
    const deptHeight = deptListArea.offsetHeight;
    console.log(deptHeight);
    empListArea.style.height = `${deptHeight}px`;
}
syncHeights();
//
deptListArea.addEventListener("resize", syncHeights);


//테이블 td 추가
function addStampTableTd(approverNo, approverName, approverJob) {
	const table = document.querySelector('.stamp-table');

	// 모든 <tr> 요소를 선택
	const trList = table.querySelectorAll('tr');


	// 각 <tr> 요소에 마지막 자식으로 <td> 요소 추가
	for(let i = 0; i<trList.length; i++){
		const td = document.createElement('td');
		if(i === 0){			
			td.dataset.approverNo = approverNo;
			td.textContent = approverJob;
		}
			trList[i].appendChild(td);
	}
	
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
	const delApproverNo = approver.querySelector('input[type="hidden"]').value;
	const table = document.querySelector('.stamp-table');
	//ejob tr에 삭제할 결제자번호와 같은 approver 번호가 있다면
	for(let i=0; i<table.rows[0].cells.length; i++){
		const approverNo = table.rows[0].cells[i].dataset.approverNo;
		if(approverNo == delApproverNo){
			//같은 열의 td 모두 삭제
			for(let j=0; j<table.rows.length; j++){
				table.rows[j].deleteCell(i)
			}
			
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
	//referrerNo값 세팅
	let referrerNoStr = '';
	const referrer_no_list = document.querySelectorAll('.referrer-list-div span');
	referrer_no_list.forEach(function(referrer_no){
		referrerNoStr += referrer_no.dataset.referrerNo + ',';
	});
	document.querySelector('.referrerNoStr').value = referrerNoStr;
	signDocForm.submit();
};


//========이벤트=========
//모달이 열릴 때 emp 리스트 조회해오기
const searchApproverModal = document.querySelector('#searchApproverModal');
/*
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
*/





