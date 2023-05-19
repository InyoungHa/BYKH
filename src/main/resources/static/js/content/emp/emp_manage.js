
//사번 생성(사원 등록)
function regEmp(){
	const ename_tag = document.querySelector('#ename');
	const epw_tag = document.querySelector('#epw');
	const join_date_tag = document.querySelector('[name ="joinDate"]');
	const deptno_tag = document.querySelector('[name ="deptno"]');
	const e_job_tag = document.querySelector('[name ="eJob"]');
	const e_status_tag = document.querySelector('[name ="eStatus"]');
	
	//erroMessage
	const error_message = document.querySelector('#errorMessage');

	ename_tag.addEventListener('keyup', function(){
	//이름에 공백 확인 		
	if(ename_tag.value.trim() !== ''){
		error_message.textContent = '';
	} else{
		error_message.textContent ='사원명에 공백을 입력할 수 없습니다.';
		
	}
	});
	
	//이름이 빈 값인지 확인
	if(ename_tag.value ==''){
		alert('사원명 입력은 필수입니다. \n사원명을 입력해주세요');
		return;
	}
		
	
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
