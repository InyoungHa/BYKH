



init();


function init(){
	
	
	const changeEAccountModal = document.getElementById('changeEAccountModal');

	changeEAccountModal.addEventListener('hidden.bs.modal', event=>{
	
	document.querySelector('#changeEAccountForm').reset();
	//const modal_body_tag=document.querySelector('#changeEAccountModal .modal-content');
	//modal_body_tag.innerHTML='';
	});
	
} 


//오류 메세지 div 전체 제거
function delete_error_div(){
	const error_divs= document.querySelectorAll('div[class="my-invalid"]');
	
	for(const error_div of error_divs){
		error_div.remove();
	}
}


//사원 등록 유효성 검사
function reg_emp_validate(){
	
	//기존 오류 메세지 전부 삭제
	delete_error_div();
	
	//reg_emp_validate()함수의 리턴 결과를 저장하는 변수
	let result_ename = true;
	let result_epw = true;
	
	//오류 메세지
	let str_ename ='';
	let str_epw ='';
	

	//사원 등록 form 태그의 자식 td 선택
	const ename_td = document.querySelector('#ename').closest('td');
	const epw_td = document.querySelector('#epw').closest('td');
	
	//validation 빈 값 처리
	const reg_empExp = /\s/;
	
	const ename = document.querySelector('#regEmpForm #ename').value;
	
	if(ename ==''){
		str_ename ='사원명은 필수 입력입니다.';
		result_ename =false;
	}else if(reg_empExp.test(ename)){
		str_ename ='사원명을 공백 없이 입력해주세요';
		result_ename = false;
	}
	
	const epw = document.querySelector('#regEmpForm #epw').value;
	
	if(epw ==''){
		str_epw = '비밀번호는 필수 입력입니다.';
		result_epw = false;
	}else if(reg_empExp.test(epw)){
		str_epw ='비밀번호를 공백 없이 입력해주세요';
		result_epw = false;
	}else if(epw.length <4){
		str_epw ='비밀번호는 4자리 이상 입력해주세요';
		result_epw = false;
	}
	
	//유효성 검사 실패시 오류 메세지 출력(false일때)
	if(!result_ename){
		const errorHTML = `<div class="my-invalid" style="color: red; font-size: 0.8rem;">${str_ename}</div>`;
		ename_td.insertAdjacentHTML('beforeend', errorHTML);
	}
	if(!result_epw){
		const errorHTML = `<div class="my-invalid" style="color: red; font-size: 0.8rem;">${str_epw}</div>`;
		epw_td.insertAdjacentHTML('beforeend', errorHTML);
		
	}	
	//모든 유효성이 확인될 때
	return result_ename && result_epw;	
}



//사번 생성(사원 등록)
function regEmp(){
	
	//유효성 검사 진행
	const isValidate = reg_emp_validate();
	
	if(!isValidate){
		return;
	}	
	document.querySelector('#regEmpForm').submit();	
	
}


//regForm 초기화_취소버튼
function clearForm(){
	const reg_emp_form = document.querySelector('#regEmpForm');
	const input_tags=reg_emp_form.querySelectorAll('input');
	const select_tags=reg_emp_form.querySelectorAll('select');
	
	input_tags.forEach(function(input_tag){
		input_tag.value = '';				
	});
	
	select_tags.forEach(function(select_tag){
		select_tag.selectedIndex  =0;	
		
	});
}

//키워드로 사원 검색
function getSearchList(){
	
	//form 태그 선택
	const searchForm = document.querySelector('#searchForm');

	searchForm.submit();
	
}
//페이지 이동
function getEmpListPaging(pageNum) {
  document.querySelector('#nowPage').value = pageNum;

 	getSearchList();
  
}


//사원 상세정보
function getEmpDetail(empno){
	//자료형 int로 변경
	const empNum = parseInt(empno);
	
	$.ajax({
		url: '/emp/getEmpDetailAjax', //요청경로
		type: 'post',
		async: true, // 동기 방식으로 설정
		//contentType: 'application/json; charset=UTF-8', //Json 타입
		contentType: "application/x-www-form-urlencoded; charset=UTF-8", //default
		data: {'empno':empNum}, //필요한 데이터
		success: function(result) {
			//모달 태그 선택
			const modal_tag = document.querySelector('#empDetailModal');
			//console.log(result);
			//모달 내용 그리기
			drawEmpDatail(result);
	
			//bootstrap 모달 불러오기
			const modal = new bootstrap.Modal(modal_tag);
			modal.show();
		},
		error: function() {
			alert('실패');
		}
	});
}

//모달 사원 상세정보 그리기
function drawEmpDatail(data){
	
	const modal_body=document.querySelector('.modal-body');
	modal_body.replaceChildren();
	
	console.log(data['empDetail']);
	
	//직급
	const options = ['사장', '과장', '대리', '주임', '사원'];
	const selectedValue = data['empDetail'].e_job;	

	let str ='';
	
	str += `<label class="page_title">사원 개인 페이지</label>`;
	str += `<form class="row" action="/emp/regEmpDetail" method="post" id="regEmpDetail" >`;
	str += 	`<div class="col-6 ">`;
	str += 		`<div class="row">`;
	str += 			`<div class="col card text-center" style="max-width: 35rem;">`;
	str += 				`<img src="${data['empDetail'].eimgVO.attached_file_name ? '/upload/empImg/' + data['empDetail'].eimgVO.attached_file_name : '/upload/empImg/default.png'}"
							style="width: 18rem; display: block;  margin: 0 auto;" id="empImgPreview" class="card-img-top">`;
	str += 				`<input type="file" class="form-control" id="empImgInput">`;	
	str += 			`<div class="card-body">`;
	str += 				`<h4 class="card-title">${data.empDetail.ename} </h4>`;
	str += 				`<p class="card-text">${data.empDetail.deptVO.dename +'(' +data.empDetail.deptVO.loc+')'}</p>`;
	str += 			`</div>`;
	str += 			`</div>`;
	str += 		`</div>`;
	str += 	`</div>`;
	str +=	`<div class="col-6">`;
	str += 		`<div class="row">`;
	str += 			`<div class="col card mb-3" style="max-width: 28rem;">`;
	str += 			`<ul class="list-group list-group-flush">`;
	str += 			`<li class="list-group-item">기본 정보</li>`;		
	str += 			'<table style="margin-bottom:1rem;">';
	str += 				'<tr>';
	str += 					'<td>이름</td>';
	str += 					`<td>`;
	str += 						`<input type="text" value="${data['empDetail'].ename}" oninput="reg_empDetail_validate();" id="ename" name="ename" class="form-control">`;
	str += 					`</td>`;
	str += 				'</tr>';
	str += 				'<tr>';
	str += 					'<td>사번</td>';
	str += 					`<td>`;
	str += 						`<div id="empno">${data.empDetail.empno}</div>`;
	str += 					`</td>`;
	str += 				'</tr>';
	str += 				'<tr>';
	str += 					'<td>아이디</td>';
	str += 					`<td> ${data.empDetail.empno} </td>`;
	str += 				'</tr>';
	str += 			'</table>';	
	str += 			`</ul>`;
	str += 			`</div>`;
	str += 		`<div class="row">`;
	str += 			`<div class="col card mb-3" style="max-width: 28rem;"">`;
	str += 			`<ul class="list-group list-group-flush">`;
	str += 			`<li class="list-group-item">인사 정보</li>`;		
	str += 			'<table style="margin-bottom:1rem;">';
	str += 				'<tr>';
	str += 					'<td>부서</td>';
	str += 					`<td>`;
	str += 						`<select id="deptno" class="form-control">`;
	for(let i =0; i<data['deptList'].length; i++){	
		const dept = data['deptList'][i];
  		const isSelected = dept.deptno === data['empDetail'].deptVO.deptno ? "selected" : "";
		
		str += 							`<option value="${dept.deptno}" ${isSelected}>${dept.dename}(${dept.loc})</option>`;
	
	}
	str += 						`</select>`;
	str += 					`</td>`;
	str += 				'</tr>';
	str += 				'<tr>';
	str += 					'<td>직급</td>';
	str += 					`<td>`;
	str += 						`<select id="eJob" class="form-control">`;
				
	options.forEach(option => {
  if (option !== selectedValue) {
    str += 							`<option value="${option}">${option}</option>`;
		}
	});

	str += 							`<option value="${selectedValue}" selected>${selectedValue}</option>`;
	str += 						'</select>';
	str += 					`</td>`;
	str += 				'</tr>';
	str += 				'<tr>';
	str += 					'<td>입사일</td>';
	str += 					`<td>${data.empDetail.joinDate}</td>`;
	str += 				'</tr>';
	str += 				'<tr>';
	str += 					'<td>재직상태</td>';
	str += 					`<input type="hidden" id="eStatus" value="${data['empDetail'].e_status}">`;
	str += 					'<td>';
	str += 						'<select id="selectedEStatus" class="form-select">';
	str += 							`<option value="1" ${data['empDetail'].e_status == 1 ? 'selected' :''}>재직중</option>`;
	str += 							`<option value="2" ${data['empDetail'].e_status == 2 ? 'selected' : ''}>휴직</option>`;
	str += 							`<option value="3" ${data['empDetail'].e_status == 3 ? 'selected' :''}>퇴사</option>`;
	str += 						'</select>';
	str += 					'<td>';
	str += 				'</tr>';
	str += 			'</table>';	
	str += 			`</ul>`;
	str += 		`</div>`;
	str += 		`<div class="row">`;
	str += 			`<div class="col card mb-3" style="max-width: 28rem;">`;
	str += 			`<ul class="list-group list-group-flush">`;
	str += 			`<li class="list-group-item">연락처 정보</li>`;		
	str += 			'<table style="margin-bottom:1rem;">';
	str += 				'<tr>';
	str += 					'<td>이메일</td>';
	str += 					`<td id="eEmail">${data.empDetail.empno}@bykh.com</td>`;
	str += 				'</tr>';
	str += 				'<tr>';
	str += 					'<td>내선번호</td>';
	str += 					`<td>`;
	
	if(data.empDetail.office_tel==undefined){	
		str += 				'<div class="row">';
		str += 					'<div class="col-3">';
		str += 						`<select id="officeTel" class="form-select form-control-sm">`;
		str += 							`<option value="02">02(서울)</option>`;
		str += 							`<option value="032">032(인천)</option>`;
		str += 							`<option value="051">051(부산)</option>`;
		str += 							`<option value="061">061(여수)</option>`;
		str += 						`</select>`;
		str += 					'</div>';
		str += 					'<div class="col-auto">';
		str += 						`<input type="number" id="officeTelInput" oninput="reg_empDetail_validate();" value="" min="0" class="form-control form-control-sm">`;
		str += 					'</div>';
		str += 				'</div>';
	 }
	else{
		const officeTel = data.empDetail.office_tel;
		const officeTelParts = officeTel.split("-");
		const officeTelPrefix = officeTelParts[0];
		const officeTelSuffix = officeTelParts.slice(1).join("");
		
		str += 				'<div class="row">';
		str += 					'<div class="col-3">';
		str += 						`<select id="officeTel" class="form-select form-control-sm">`;
		str += 							`<option value="02" ${officeTelPrefix === "02" ? "selected" : ""}>02(서울)</option>`;
		str += 							`<option value="032" ${officeTelPrefix === "032" ? "selected" : ""}>032(인천)</option>`;
		str += 							`<option value="051" ${officeTelPrefix === "051" ? "selected" : ""}>051(부산)</option>`;
		str += 							`<option value="061" ${officeTelPrefix === "061" ? "selected" : ""}>061(여수)</option>`;
		str += 						`</select>`;
		str += 					'</div>';
		str += 					'<div class="col-auto">';
		str += 						`<input type="number" id="officeTelInput" value="${officeTelSuffix}" oninput="reg_empDetail_validate();" min="0" class="form-control form-control-sm">`;
		str += 					'</div>';
		str += 				'</div>';
	}	
	str += 					`</td>`;
	str += 				'</tr>';
	str += 				'<tr>';
	
	str += 					'<td>휴대전화</td>';
	str += 					`<td>`;	
	if(data.empDetail.phone_tel==undefined){				
		str += 				'<div class="row">';
		str += 					'<div class="col-3">';
		str += 						`<select id="phoneTel" class="form-select form-control-sm">`;
		str += 							`<option value="010">010</option>`;
		str += 							`<option value="011">011</option>`;
		str += 							`<option value="012">012</option>`;
		str += 						`</select>`;
		str += 					'</div>';
		str += 					'<div class="col-auto">';
		str += 						`<input type="number" id="phoneTelInput" oninput="reg_empDetail_validate();" value="" min="0" class="form-control form-control-sm">`;
		str += 					'</div>';
		str += 				'</div>';
	}
	else{
		const phoneTel = data.empDetail.phone_tel;
		const phoneTelParts = phoneTel.split("-");
		const phoneTelPrefix = phoneTelParts[0];
		const phoneTelSuffix = phoneTelParts.slice(1).join("");
		
		
		
		str += 				'<div class="row">';
		str += 					'<div class="col-3">';
		str += 						`<select id="phoneTel" class="form-select form-control-sm">`;		
		str += 							`<option value="010" ${phoneTelPrefix ==="010"? "selected":""}>010</option>`;
		str += 							`<option value="011" ${phoneTelPrefix ==="011"? "selected":""}>011</option>`;
		str += 							`<option value="012" ${phoneTelPrefix ==="012"? "selected":""}>012</option>`;
		str += 						`</select>`;
		str += 					'</div>';
		str += 					'<div class="col-auto">';
		str += 						`<input type="number" id="phoneTelInput" value="${phoneTelSuffix}" oninput="reg_empDetail_validate();" min="0" class="form-control form-control-sm">`;
		str += 					'</div>';
		str += 				'</div>';		
	}	
	str += 					`</td>`;
	str += 				'</tr>';
	str += 			'</table>';	
	str += 			`<div style="color: black; font-size: 0.8rem; text-align:center;">전화번호는 숫자만 입력해주세요(-없이)</div>`;
	str += 			`</ul>`;
	str += 		`</div>`;
	str += 	`</div>`;
	str += 		`<div class="row g-2">`;
	str += 			`<div class="col d-grid gap-2 d-md-flex justify-content-md-end">`;
	str += 				`<input type="button" value="저장" onclick="regEmpDetail()" class="btn">`;
	str += 				`<input type="button" value="취소" onclick="revoke_modal()" class="btn">`;
	str += 			`</div>`;
	str += 			`</div>`;
	str += `</form>`;

	
	modal_body.insertAdjacentHTML('afterbegin', str);
	
	//사진 등록
	  const empImgPreview = document.getElementById('empImgPreview');
	  const empImgInput = document.getElementById('empImgInput');
	
	
	  empImgPreview.addEventListener('click', () => {
	   
	    empImgInput.click();
	  });
	
	
	  empImgInput.addEventListener('change', () => {
	
	    const file = empImgInput.files[0];
	
	    if (file) {
	
	      const reader = new FileReader();
	
	      reader.onload = () => {
	
	        empImgPreview.src = reader.result;
	      };
	
	      reader.readAsDataURL(file);
	    }
	  });
}


//사원상세 정보 등록 유효성 검사
function reg_empDetail_validate(){
	
	//기존 오류 메세지 전부 삭제
	delete_error_div();
	
	//reg_emp_validate()함수의 리턴 결과를 저장하는 변수
	let result_ename = true;
	let result_office_tel= true;
	let result_phone_tel= true;
	
	//오류 메세지
	let str_ename ='';
	let str_office_tel ='';
	let str_phone_tel ='';
	

	//사원 상세정보 모달
	const ename_tag = document.querySelector('#empDetailModal input[name="ename"]').closest('td');
	const office_tel = document.querySelector('#officeTelInput');
	const office_tel_tag = office_tel.closest('div');
	
	const phone_tel = document.querySelector('#phoneTelInput').closest('div');
	const phone_tel_tag = phone_tel.closest('div');

	
	//validation 빈 값 처리
	const reg_empExp = /\s/;	

	
	const ename_tag_value = document.querySelector('#empDetailModal input[name="ename"]').value;

	if(ename_tag_value==''){
		str_ename ='사원명은 필수 입력입니다.';
		result_ename =false;
	}else if(reg_empExp.test(ename_tag_value)){
		str_ename ='사원명을 공백 없이 입력해주세요';
		result_ename = false;
	}
	
	const office_tel_tag_value = document.querySelector('#officeTelInput').value;
	
	if (office_tel_tag_value.length > 8 ||office_tel_tag_value.length <7) {
		str_office_tel = '사무실 번호 8자리 입력해주세요';
		result_office_tel = false;
	}


	const phone_tel_tag_value = document.querySelector('#phoneTelInput').value;
	
	 if (phone_tel_tag_value.length > 8 || phone_tel_tag_value.length <7) {
		str_phone_tel = '휴대 전화번호 8자리 입력해주세요';
		result_phone_tel = false;
	} 
	
	//유효성 검사 실패시 오류 메세지 출력(false일때)
	if(!result_ename){
		const errorHTML = `<div class="my-invalid" style="color: red; font-size: 0.8rem;">${str_ename}</div>`;
		ename_tag.insertAdjacentHTML('beforeend', errorHTML);
	}
	if(!result_office_tel){
		const errorHTML = `<div class="my-invalid" style="color: red; font-size: 0.8rem;">${str_office_tel}</div>`;
		office_tel_tag.insertAdjacentHTML('beforeend', errorHTML);
		
	}	
	if(!result_phone_tel){
		const errorHTML = `<div class="my-invalid" style="color: red; font-size: 0.8rem;">${str_phone_tel}</div>`;
		phone_tel_tag.insertAdjacentHTML('beforeend', errorHTML);
		
	}	

	
	//모든 유효성이 확인될 때
	return result_ename && result_office_tel && result_phone_tel;	
}



//사원 상세정보 등록 + 사진
function regEmpDetail() {
	//유효성 검사 진행
	const isValidate = reg_empDetail_validate();
	
	if(!isValidate){
		return;
	}	
	
	const empno = document.querySelector('#empno').textContent; //사번
	const ename = document.querySelector('#empDetailModal input[name="ename"]').value; //이름
	
	const deptno= document.querySelector('#deptno').value; //부서번호
	
	
	const eJob = document.querySelector('#eJob').value; //직책
	const eEmail = document.querySelector('#eEmail').textContent; //이메일
	
	
	const office_select = document.querySelector('#officeTel').value; //사무실번호
	const office_input = document.querySelector('#officeTelInput').value;
	const officeTel = office_select + office_input;

	const phone_select = document.querySelector('#phoneTel').value; //휴대전화번호
	const phone_input = document.querySelector('#phoneTelInput').value;
	const phoneTel = phone_select + phone_input;
	
	const eStatus = document.querySelector('#eStatus').value;
	const selectedEStatus = document.querySelector('#selectedEStatus').value; //재직 상태
	//console.log(eStatus);
	//console.log(selectedEStatus);

	regDetail={
		'empno' : empno,		
		'ename':ename,
		'deptno' :deptno,
		'eEmail' : eEmail,
		'eJob' : eJob,
		'officeTel':officeTel,
		'phoneTel': phoneTel,
		'eStatus':eStatus,	
		'selectedEStatus':selectedEStatus	
			
	}	
	
	
	//폼 객체 생성
	const form_data = new FormData();

	//json 데이터 폼 객체로 옮겨주기
	for (const key in regDetail) {
	    form_data.append(key, regDetail[key]);
	}
	
	//file 데이터 폼 객체에 담아주기
	form_data.append('empImg', $('#empImgInput')[0].files[0])
	


	console.log(regDetail);
	
	//form 객체를 컨트롤러로 넘겨줌
	//이때 processData, contentType를 false로 해야 file 데이터까지 넘어감	
	$.ajax({
		url: '/emp/regEmpDetailAjax', //요청경로
		type: 'post',
		data: form_data,
	    processData: false,
	    contentType: false,
		async: true, // 동기 방식으로 설정
		success: function(result) {
			alert('사원 세부 정보 등록 완료입니다.');
			location.reload();
			
		},
		error: function() {
			alert('실패');
		}
	});

}

//사원 상세 정보 모달 취소
function revoke_modal(){
	location.reload();
}



//계정 상태 변경
// 변경을 누르면 휴먼 계정으로 변경, 사원 세부 정보에서 퇴직일때는 삭제 버튼으로 변경 가능
// 휴먼 계정으로 바뀌면 계정은 휴직으로 변경된다...?
function changAccount(empno,eStatus,eAccount){
	const change_e_account_modal = document.querySelector('#changeEAccountModal');


	draw_change_account_modal(empno, eStatus, eAccount);

	
	//bootstrap 모달 불러오기
	const modal = new bootstrap.Modal(change_e_account_modal);
	modal.show();
	

	
} 

function draw_change_account_modal(empno, eStatus, eAccount){	
	const modal_body_tag=document.querySelector('#changeEAccountModal .modal-body');
	modal_body_tag.replaceChildren();
	
		
	let str ='';
	
	
	str += 	'<div class="row mt-2">';
	str += 		'<div class="col-8 offset-3">';
	str += 			'<div class="row mb-3">';
	str += 			'<form id="changeEAccountForm" style="margin:0 auto">';
	str += 			`<input type="hidden" id="empno" value="${empno}">`;
	str += 			`<input type="hidden" id="eStatus" value="${eStatus}">`;
	str += 			`<input type="hidden" id="eAccount" value="${eAccount}">`;
	str += 			'<table>';
	str += 				'<tr>';
	str += 					'<td>재직 상태</td>';
	str += 					'<td>';
	str += 						'<select id="selectedEStatus" class="form-select">';
	str += 							`<option value="1" ${eStatus== 1 ? "selected":""}>재직중</option>`;
	str += 							`<option value="2" ${eStatus== 2 ? "selected":""}>휴직</option>`;
	str += 							`<option value="3" ${eStatus== 3 ? "selected":""}>퇴직</option>`;
	str += 						'</select>';
	str += 					'</td>';
	str += 				'</tr>';
	str += 				'<tr>';
	str += 					'<td>계정 상태</td>';
	str += 					'<td>';
	str += 						'<select id="selectedEAccount" class="form-select">';
	str += 							`<option value="1" ${eAccount== 1 ? 'selected':''}>정상</option>`;
	str += 							`<option value="2" ${eAccount== 2 ? 'selected':''}>휴면</option>`;
	str += 						'</select>';
	str += 					'</td>';
	str += 				'</tr>';
	str += 			'</table>';
	str += 			'</div>';
	str += 			'<div class="row">';
	str += 				'<div class="col-7 d-grid gap-2 ">';
	str += 					'<input type="button" class="btn" value="변경" onclick="change_account_fu()">';
	str += 				'</div>';
	str += 			'</form>';
	str += 		'</div>';
	str += 	'</div>';
	
	modal_body_tag.insertAdjacentHTML('afterbegin', str);
	
}



function change_account_fu(){
	const empno = document.querySelector('#changeEAccountForm #empno').value;
	
	const eStatus = document.querySelector('#changeEAccountForm #eStatus').value;
	const selectedEStatus = document.querySelector('#changeEAccountForm #selectedEStatus').value;
	
	const eAccount = document.querySelector('#changeEAccountForm #eAccount').value;
	const selectedEAccount = document.querySelector('#changeEAccountForm #selectedEAccount').value;
	
	console.log(empno);
	console.log(`eStatus :${eStatus}`);
	console.log(`selectedEStatus :${selectedEStatus}`);
	console.log(`eAccount : ${eAccount}`);
	console.log(`selectedEAccount : ${selectedEAccount}`);
	
	$.ajax({
		url: '/emp/updateAccountAjax', //요청경로
		type: 'post',
		async: true, // 동기 방식으로 설정
		//contentType: 'application/json; charset=UTF-8', //Json 타입
		contentType: "application/x-www-form-urlencoded; charset=UTF-8", //default
		data: { 'empno': empno,
				'eStatus':eStatus,
				'selectedEStatus' : selectedEStatus,				
				'eAccount':eAccount,
				'selectedEAccount':selectedEAccount}, //필요한 데이터
		success: function(result) {
			location.reload()
		},
		error: function() {
			alert('실패');
		}
	});
	
}

	
	

