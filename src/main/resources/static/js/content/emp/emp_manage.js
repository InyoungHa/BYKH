
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
	}else if(epw.lenght <3){
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
	
	const ename_tag = document.querySelector('#ename');
	const epw_tag = document.querySelector('#epw');
	const join_date_tag = document.querySelector('[name ="joinDate"]');
	const deptno_tag = document.querySelector('[name ="deptno"]');
	const e_job_tag = document.querySelector('[name ="eJob"]');
	const e_status_tag = document.querySelector('[name ="eStatus"]');
	
	
	paramData={
		'ename' : ename_tag.value,
		'epw'	: epw_tag.value,
		'join_date'	: join_date_tag.value,
		'deptno'	: deptno_tag.value,
		'e_job'	: e_job_tag.value,
		'e_status' : e_status_tag.value,		
	}
	
	console.log('paramData =' + JSON.stringify(paramData));
	
	$.ajax({
		url: '/emp/regEmpAjax', //요청경로
		type: 'post',
		async: true, // 동기 방식으로 설정
		contentType :'application/json; charset=UTF-8', //Json 타입
		//contentType: "application/x-www-form-urlencoded; charset=UTF-8", //default
		data: JSON.stringify(paramData), //필요한 데이터
		success: function(result) {
			if(result){
				alert('등록 완료입니다.')
				drawEmpTable(result);
			}
		},
		error: function() {
			alert('등록 실패');
		}
	});	
}


function drawEmpTable(empList){
	//사원 리스트 테이블
	const emp_table_tage=document.querySelector('#empListTable').querySelector('tbody');
	//비우기
	emp_table_tage.replaceChildren();
	
	let str ='';
	
	console.log('empList =' + JSON.stringify(empList));
	
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

/*
//페이지 이동
function getEmpListPaging(pageNum){
	//hidden으로 받아온 nowPage의 value 값을 가져온다.
	document.querySelector('#nowPage').value = pageNum;
	
}*/




//계정 상태 변경
// 변경을 누르면 휴먼 계정으로 변경, 사원 세부 정보에서 퇴직일때는 삭제 버튼으로 변경 가능
// 휴먼 계정으로 바뀌면 계정은 휴직으로 변경된다...?
function changAccount(empno){
	
}


