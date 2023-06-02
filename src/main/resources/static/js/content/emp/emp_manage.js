
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

/*

	
	
	//등록 완료 후 form 초기화
	const reg_emp_form = document.querySelector('#regEmpForm');
	reg_emp_form.reset();
	
}*/

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
	
	//직급
	const options = ['사장', '과장', '대리', '주임', '사원'];
	const selectedValue = data['empDetail'].e_job;

	let str ='';
	
	str += `<label class="page_title">사원 개인 페이지</label>`;
	str += `<form class="row" id="" >`;
	str += 	`<div class="col-6 mb-3">`;
	str += 		`<div class="row">`;
	str += 			`<div class="col card" style="width: 18rem;">`;
	str += 				`<img src="/upload/empImg/default.png" style="width: 12rem;" id="empImgPreview" class="card-img-top">`;
	str += 				`<input type="file" class="form-control" id="empImgInput">`;	
	str += 			`<div class="card-body">`;
	str += 				`<p class="card-text">${data.empDetail.ename}</p>`;
	str += 				`<p class="card-text">${data.empDetail.deptVO.dename +'(' +data.empDetail.deptVO.loc+')'}</p>`;
	str += 			`</div>`;
	str += 			`</div>`;
	str += 		`</div>`;
	str += 	`</div>`;
	str +=	`<div class="col-6">`;
	str += 		`<div class="row g-3>`;
	str += 			`<div class="colcard" style="width: 25rem;">`;
	str += 			`<ul class="list-group list-group-flush">`;
	str += 			`<li class="list-group-item">기본 정보</li>`;		
	str += 			'<table>';
	str += 				'<tr>';
	str += 					'<td>이름</td>';
	str += 					`<td>`;
	str += 						`<input type="text" value="${data['empDetail'].ename}" oninput="reg_empDetail_validate();" id="ename" name="ename" class="form-control form-control-sm">`;
	str += 					`</td>`;
	str += 				'</tr>';
	str += 				'<tr>';
	str += 					'<td>사번</td>';
	str += 					`<td>`;
	str += 						`<div id="empno">${data.empDetail.empno} </div>`;
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
	str += 			`<div class="col card" style="width: 25rem;">`;
	str += 			`<ul class="list-group list-group-flush">`;
	str += 			`<li class="list-group-item">인사 정보</li>`;		
	str += 			'<table>';
	str += 				'<tr>';
	str += 					'<td>부서</td>';
	str += 					`<td>`;
	str += 						`<select id="deptno" class="form-control">`;
	for(let i =0; i<data['deptList'].length; i++){	
		str += 							`<option value="${data['deptList'][i].deptno}">${data['deptList'][i].dename+'('+data['deptList'][i].loc+')'}</option>`;
	}
	console.log(data.deptList);
	str += 						`</select>`;
	str += 					`</td>`;
	str += 				'</tr>';
	str += 				'<tr>';
	str += 					'<td>직급</td>';
	str += 					`<td>`;
	str += 						`<select id="eJob" class="form-control">`;
				
	options.forEach(function(option){
		if (option !== selectedValue) {
			str += `<option value="${option}">${option}</option>`;
		}
		else{
			str += `<option value="${option}"selected>${option}</option>`;			
		}
	});			
	str += 					`</td>`;
	str += 				'</tr>';
	str += 				'<tr>';
	str += 					'<td>입사일</td>';
	str += 					`<td> ${data.empDetail.joinDate} </td>`;
	str += 				'</tr>';
	str += 			'</table>';	
	str += 			`</ul>`;
	str += 		`</div>`;
	str += 		`<div class="row g-3">`;
	str += 			`<div class="col card" style="width: 25rem;">`;
	str += 			`<ul class="list-group list-group-flush">`;
	str += 			`<li class="list-group-item">연락처 정보</li>`;		
	str += 			'<table>';
	str += 				'<tr>';
	str += 					'<td>이메일</td>';
	str += 					`<td> ${data.empDetail.empno}@bykh.com </td>`;
	str += 				'</tr>';
	str += 				'<tr>';
	str += 					'<td>내선번호</td>';
	str += 					`<td>`;
	if(data.empDetail.officeTel==undefined){		
		str += 				'<div class="row">';
		str += 					'<div class="col-3">';
		str += 						`<select id="officeTel" class="form-control form-control-sm">`;
		str += 							`<option value="02">02</option>`;
		str += 							`<option value="032">032</option>`;
		str += 							`<option value="051">051</option>`;
		str += 							`<option value="061">061</option>`;
		str += 						`</select>`;
		str += 					'</div>';
		str += 					'<div class="col-auto">';
		str += 						`<input type="number" id="officeTel" name="officeTel" value="" min="0" class="form-control form-control-sm">`;
		str += 					'</div>';
		str += 				'</div>';
	}
	else{
		str += 				'<div class="row">';
		str += 					'<div class="col-3">';
		str += 						`<select id="officeTel" class="form-control form-control-sm">`;
		str += 							`<option value="02">02</option>`;
		str += 							`<option value="032">032</option>`;
		str += 							`<option value="051">051</option>`;
		str += 							`<option value="061">061</option>`;
		str += 						`</select>`;
		str += 					'</div>';
		str += 					'<div class="col-auto">';
		str += 						`<input type="number" id="officeTel" name="officeTel" value="${data.empDetail.officeTel}" min="0" class="form-control form-control-sm">`;
		str += 					'</div>';
	}	
	str += 					`</td>`;
	str += 				'</tr>';
	str += 				'<tr>';
	str += 					'<td>휴대전화</td>';
	str += 					`<td>`;	
	if(data.empDetail.phoneTel==undefined){		
		str += 				'<div class="row">';
		str += 					'<div class="col-3">';
		str += 						`<select id="phoneTel" class="form-control form-control-sm">`;
		str += 							`<option value="010">010</option>`;
		str += 							`<option value="011">011</option>`;
		str += 							`<option value="012">012</option>`;
		str += 						`</select>`;
		str += 					'</div>';
		str += 					'<div class="col-auto">';
		str += 						`<input type="number" id="phoneTel" name="phoneTel" value="" min="0" class="form-control form-control-sm">`;
		str += 					'</div>';
		str += 				'</div>';
	}
	else{
		str += 				'<div class="row">';
		str += 					'<div class="col-3">';
		str += 						`<select id="phoneTel" class="form-control form-control-sm">`;
		str += 							`<option value="010">010</option>`;
		str += 							`<option value="011">011</option>`;
		str += 							`<option value="012">012</option>`;
		str += 						`</select>`;
		str += 					'</div>';
		str += 					'<div class="col-auto">';
		str += 						`<input type="number" id="phoneTel" name="phoneTel" value="data['empDetail'].phoneTel" min="0" class="form-control form-control-sm">`;
		str += 					'</div>';
		str += 				'</div>';		
	}	
	str += 					`</td>`;
	str += 				'</tr>';
	str += 			'</table>';	
	str += 			`</ul>`;
	str += 		`</div>`;
	str += 	`</div>`;
	str += 		`<div class="row g-3">`;
	str += 			`<div class="col d-grid gap-2 d-md-flex justify-content-md-end">`;
	str += 				`<input type="button" value="저장" onclick="regEmpDetail()" class="btn">`;
	str += 				`<input type="button" value="취소" class="btn">`;
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
	const office_tel_tag = document.querySelector('#empDetailModal input[id="officeTel"]').closest('div');
	const phone_tel_tag = document.querySelector('#empDetailModal input[id="phoneTel"]').closest('div');

	
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
	
	const office_tel_tag_value = document.querySelector('#empDetailModal input[id="officeTel"]').value;
	
	if(reg_empExp.test(office_tel_tag_value)){
		str_office_tel ='사무실 전화번호를 공백 없이 입력해주세요';
		result_epw = false;
	}else if(office_tel_tag_value.length <4){
		str_office_tel ='사무실 전화번호 4자리 입력해주세요';
		result_epw = false;
	}
	

	const phone_tel_tag_value = document.querySelector('#empDetailModal input[id="phoneTel"]').value;
	
	if(reg_empExp.test(phone_tel_tag_value)){
		str_phone_tel ='휴대 전화번호를 공백 없이 입력해주세요';
		result_epw = false;
	}else if(phone_tel_tag_value.length <4){
		str_phone_tel ='휴대 전화번호 4자리 입력해주세요';
		result_epw = false;
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
	
	const empno = document.querySelector('#empno').textContent;
	const orignFileName = document.querySelector('#empImgInput').value;
	const ename = document.querySelector('#empDetailModal input[name="ename"]').value;
	
	const deptno= document.querySelector('#deptno').value;
	//const deptno=deptno_option.options[deptno_option.selectedIndex];
	console.log(deptno);
	
	const ejob = document.querySelector('#eJob').value;
	
	
	const office_select = document.querySelector('select[id="officeTel"]').value;
	const office_input = document.querySelector('input[id="officeTel"]').value;
	const officeTel = office_select + office_input;

	const phone_select = document.querySelector('select[id="phoneTel"]').value;
	const phone_input = document.querySelector('input[id="phoneTel"]').value;
	const phoneTel = phone_select + phone_input;


	regDetail={
		'empno' : empno,
		'orignFileName' :orignFileName,
		'ename':ename,
		'deptno' :deptno,
		'ejob' : ejob,
		'officeTel':officeTel,
		'phoneTel': phoneTel
		
	}	

	console.log(regDetail);
		
	$.ajax({
		url: '/emp/regEmpDetailAjax', //요청경로
		type: 'post',
		async: true, // 동기 방식으로 설정
		contentType: 'application/json; charset=UTF-8', //Json 타입
		//contentType: "application/x-www-form-urlencoded; charset=UTF-8", //default
		data: JSON.stringify(regDetail), //필요한 데이터
		success: function(result) {
			alert('성공');
		},
		error: function() {
			alert('실패');
		}
	});

}

//계정 상태 변경
// 변경을 누르면 휴먼 계정으로 변경, 사원 세부 정보에서 퇴직일때는 삭제 버튼으로 변경 가능
// 휴먼 계정으로 바뀌면 계정은 휴직으로 변경된다...?
function changAccount(empno){
	
}


