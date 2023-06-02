
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
function drawEmpTable(empList){
	//사원 리스트 테이블
	const emp_table_tage=document.querySelector('#empListTable').querySelector('tbody');
	//비우기
	emp_table_tage.replaceChildren();
	
	let str ='';
	
	console.log('empList =' + JSON.stringify(empList));
	console.log('empList의 타입:', typeof empList);
	
		
	empList.forEach(function(emp, indx){
		
		str += `<tr>`;
		str += `<td>${indx+1}</td>`;
		str += `<td>${emp.empno}</td>`;
		str += `<td>${emp.ename}</td>`;
		str += `<td>${emp.empno}</td>`;
		str += `<td>****</td>`;
		str += `<td>${emp.join_date}</td>`;
		str += `<td>${emp.deptVO.dename}</td>`;
		str += `<td>${emp.e_job}</td>`;
		str += `<td>${emp.e_status_str}</td>`;
		str += `<td>${emp.e_role}</td>`;
		str += `<td>`;
		str += `<button onchange="changAccount(${emp.empno});" type="button" class="button">변경</button>`;
		str += `</td>`;
		str += `</tr>`;
		
		});

	emp_table_tage.insertAdjacentHTML('afterbegin',str);	
	
	
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
		const modal_tag = document.querySelector('#empDtailModal');
		
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
function drawEmpDatail(empDetail){
	
	const modal_body=document.querySelector('.modal-body');
	modal_body.replaceChildren();
	
	let str ='';
	
	str += `<label class="page_title">사원 개인 페이지</label>`;
	str += `<form class="row" id="" >`;
	str += 	`<div class="col-6 mb-3">`;
	str += 		`<div class="row">`;
	str += 			`<div class="col card" style="width: 18rem;">`;
	str += 				`<img src="/upload/empImg/default.png" style="width: 12rem;" id="empImgPreview" class="card-img-top">`;
	str += 				`<input type="file" class="form-control" id="empImgInput">`;	
	str += 			`<div class="card-body">`;
	str += 				`<p class="card-text">${empDetail.ename}</p>`;
	str += 				`<p class="card-text">${empDetail.deptVO.dename+'(' +empDetail.deptVO.loc+')'}</p>`;
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
	str += 						`<input type="text" id="ename" name="ename" class="form-control form-control-sm" placeholder="${empDetail.ename}">`;
	str += 					`</td>`;
	str += 				'</tr>';
	str += 				'<tr>';
	str += 					'<td>사번</td>';
	str += 					`<td>`;
	str += 						`<div id="empno">${empDetail.empno} </div>`;
	str += 					`</td>`;
	str += 				'</tr>';
	str += 				'<tr>';
	str += 					'<td>아이디</td>';
	str += 					`<td> ${empDetail.empno} </td>`;
	str += 				'</tr>';
	str += 			'</table>';	
	str += 			`</ul>`;
	str += 		`</div>`;
	str += 		`<div class="row">`;
	str += 			`<div class="col card" style="width: 25rem;">`;
	str += 			`<ul class="list-group list-group-flush">`;
	str += 			`<li class="list-group-item">인사 정보</li>`;		
	str += 			'<table>';
	str += 				'<tr>';
	str += 					'<td>부서</td>';
	str += 					`<td>`;
	str += 						`<input type="text" id="dename" name="dename" class="form-control form-control-sm" placeholder="${empDetail.deptVO.dename+'('+empDetail.deptVO.loc+')'}">`;
	str += 					`</td>`;
	str += 				'</tr>';
	str += 				'<tr>';
	str += 					'<td>직급</td>';
	str += 					`<td>`;
	str += 						`<input type="text" id="eJob" name="eJob" class="form-control form-control-sm" placeholder="${empDetail.e_job}">`;
	str += 					`</td>`;
	str += 				'</tr>';
	str += 				'<tr>';
	str += 					'<td>입사일</td>';
	str += 					`<td> ${empDetail.joinDate} </td>`;
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
	str += 					`<td> ${empDetail.empno}@bykh.com </td>`;
	str += 				'</tr>';
	str += 				'<tr>';
	str += 					'<td>내선번호</td>';
	str += 					`<td>`;
	str += 						`<input type="number" id="officeTel" name="officeTel" placeholder="${empDetail.officeTel}" min="0" class="form-control form-control-sm">`;
	str += 					`</td>`;
	str += 				'</tr>';
	str += 				'<tr>';
	str += 					'<td>휴대전화</td>';
	str += 					`<td>`;	
	str += 						`<input type="number" id="phoneTel" name="phoneTel" placeholder="${empDetail.phoneTel}" min="0" class="form-control form-control-sm">`;
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

//사진 등록

function regEmpDetail() {
	const empno = document.querySelector('#empno').textContent;
	const orignFileName = document.querySelector('#empImgInput').value;
	const ename = document.querySelector('#ename').value;
	const ejob = document.querySelector('#eJob').value;
	const officeTel = document.querySelector('#officeTel').value;
	const phoneTel = document.querySelector('#phoneTel').value;

	regDetail={
		'empno' : empno,
		'orignFileName' :orignFileName,
		'ename':ename,
		'ejob' : ejob,
		'officeTel':officeTel,
		'phoneTel': phoneTel
		
	}
	console.log(regDetail)
		
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


