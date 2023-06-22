

//오류 메세지 div 전체 제거
function delete_error_div(){
	const error_divs= document.querySelectorAll('div[class="my-invalid"]');
	
	for(const error_div of error_divs){
		error_div.remove();
	}
}

//임시비번 받기 위한 사번,사원 input태그 유효성 검사
function check_empno_validate(){
	
	//기존 오류 메세지 전부 삭제
	delete_error_div();
	
	//reg_emp_validate()함수의 리턴 결과를 저장하는 변수
	let result_empno = true;
	let result_ename = true;

	
	//오류 메세지
	let str_empno ='';
	let str_ename='';

	

	//사번 태그
	const empno_tag = document.querySelector('#empno').closest('div');
	//사원 이름 태그
	const ename_tag = document.querySelector('#ename').closest('div');

	

	//사번 유효성
	const empno_value = document.querySelector('#empno').value;

	
	if (empno_value == "") {
	  str_empno = "사번은 필수 입력입니다.";
	  result_empno = false;
	} else if (/\s/.test(empno_value)) {
	  str_empno = "공백 없이 입력해주세요.";
	  result_empno = false;
	} 
	
	//사원명 유효성
	const ename_value = document.querySelector('#ename').value;
	
	if (ename_value == "") {
	  str_ename = "사원명은 필수 입력입니다.";
	  result_ename = false;
	} else if (/\s/.test(ename_value)) {
	  str_ename = "공백 없이 입력해주세요.";
	  result_ename = false;
	} 
	

	
	//유효성 검사 오류 메세지 출력(false일때)
	if(!result_empno){
		const errorHTML = `<div class="my-invalid" style="color: red; font-size: 0.8rem;">${str_empno}</div>`;
		empno_tag.insertAdjacentHTML('beforeend', errorHTML);
	}
	if(!result_ename){
		const errorHTML = `<div class="my-invalid" style="color: red; font-size: 0.8rem;">${str_ename}</div>`;
		ename_tag.insertAdjacentHTML('beforeend', errorHTML);
	}

	
	//모든 유효성이 확인될 때
	return result_empno && result_ename;	
}




//비밀번호 변경
function getImsiEPW(){
	
	const isValidate = check_empno_validate();
	
	if(!isValidate){
		return;
	}
	
	const empno = document.querySelector('#getEmailEPWForm #empno').value;
	const ename = document.querySelector('#getEmailEPWForm #ename').value;


	//console.log(empno);
	//console.log(ename);
	
	$.ajax({
		url: '/user/getEmailEPWAjax', //요청경로
		type: 'post',
		async: true, // 동기 방식으로 설정
		//contentType: 'application/json; charset=UTF-8', //Json 타입
		contentType: "application/x-www-form-urlencoded; charset=UTF-8", //default
		data: { 'empno': empno,
				'ename':ename}, //필요한 데이터
		success: function(result) {
			
			if(result== true){
				alert('임시 비밀번호가 메일로 발송되었습니다.');
				window.location.href="/";
			}
			else if(result != true){
				alert('사번과 사원명이 일치하지 않습니다.');
				location.reload();
			}
		},
		error: function() {
			alert('실패');
		}
	});

	
}
