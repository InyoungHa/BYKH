

//오류 메세지 div 전체 제거
function delete_error_div(){
	const error_divs= document.querySelectorAll('div[class="my-invalid"]');
	
	for(const error_div of error_divs){
		error_div.remove();
	}
}

//비밀번호 변경 유효성 검사
function change_epw_validate(){
	
	//기존 오류 메세지 전부 삭제
	delete_error_div();
	
	//reg_emp_validate()함수의 리턴 결과를 저장하는 변수
	let result_epw = true;
	let result_confirm_epw = true;

	
	//오류 메세지
	let str_epw ='';
	let str_confirm_epw ='';

	

	//변경 비밀번호 
	const change_password_tag = document.querySelector('#changePassword').closest('div');
	//비밀번호 확인
	const confirm_password_tag = document.querySelector('#confirmPassword').closest('div');

	

	//변경할 비밀번호 유효성 확인
	const change_password_value = document.querySelector('#changePassword').value;

	
	if (change_password_value == "") {
	  str_epw = "비밀번호는 필수 입력입니다.";
	  result_epw = false;
	} else if (/\s/.test(change_password_value)) {
	  str_epw = "공백 없이 입력해주세요.";
	  result_epw = false;
	} else if (change_password_value.length < 5 ||change_password_value.length > 10) {
	  str_epw = "5자리~10자리 이내로 입력해주세요.";
	  result_epw = false;
	} else if (!/[^a-zA-Z\d]/.test(change_password_value)) {
	  str_epw = "특수문자를 하나 이상 포함해주세요.";
	  result_epw = false;
	}
	
	//변경할 비밀번호와 일치하는지 확인
	const confirm_password_value = document.querySelector('#confirmPassword').value;
	
	if(change_password_value != confirm_password_value){
		str_confirm_epw ='비밀번호가 일치하지 않습니다.';
		result_confirm_epw = false;		
		
	}
	
	
	//유효성 검사 오류 메세지 출력(false일때)
	if(!result_epw){
		const errorHTML = `<div class="my-invalid" style="color: red; font-size: 0.8rem;">${str_epw}</div>`;
		change_password_tag.insertAdjacentHTML('beforeend', errorHTML);
	}
	if(!result_confirm_epw){
		const errorHTML = `<div class="my-invalid" style="color: red; font-size: 0.8rem;">${str_confirm_epw}</div>`;
		confirm_password_tag.insertAdjacentHTML('beforeend', errorHTML);
	}

	
	//모든 유효성이 확인될 때
	return result_epw && result_confirm_epw;	
}




//비밀번호 변경
function changeEPw(){
	
	const isValidate = change_epw_validate();
	
	if(!isValidate){
		return;
	}

	
	const changePassword= document.querySelector('#changePassword').value;
	console.log(changePassword);
	
	$.ajax({
		url: '/user/changeEPWAjax', //요청경로
		type: 'post',
		async: true, // 동기 방식으로 설정
		//contentType: 'application/json; charset=UTF-8', //Json 타입
		contentType: "application/x-www-form-urlencoded; charset=UTF-8", //default
		data: {'changePassword' : changePassword}, //필요한 데이터
		success: function(result) {
			
			if(result== true){
				alert('비밀번호가 변경되었습니다.');
				window.location.href="/user/main";
			}
			else if(result != true){
				alert('이전 비밀번호와 동일합니다. 다시 입력해주세요');
				location.reload();
			}
		},
		error: function() {
			alert('실패');
		}
	});

	
}












