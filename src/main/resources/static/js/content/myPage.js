//오류 메세지 div 전체 제거
function delete_error_div(){
	const error_divs= document.querySelectorAll('div[class="my-invalid"]');
	
	for(const error_div of error_divs){
		error_div.remove();
	}
}


//마이페이지 정보 등록 유효성 검사
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
	const ename_tag = document.querySelector('#regSelfEmpDetailFrom input[name="ename"]').closest('td');
	const office_tel = document.querySelector('#regSelfEmpDetailFrom #officeTelInput');
	const office_tel_tag = office_tel.closest('div');
	
	const phone_tel = document.querySelector('#regSelfEmpDetailFrom #phoneTelInput').closest('div');
	const phone_tel_tag = phone_tel.closest('div');

	
	//validation 빈 값 처리
	const reg_empExp = /\s/;	

	
	const ename_tag_value = document.querySelector('#ename').value;

	if(ename_tag_value==''){
		str_ename ='사원명은 필수 입력입니다.';
		result_ename =false;
	}else if(reg_empExp.test(ename_tag_value)){
		str_ename ='사원명을 공백 없이 입력해주세요';
		result_ename = false;
	}
	
	const office_tel_tag_value = document.querySelector('#regSelfEmpDetailFrom #officeTelInput').value;
	
	if (office_tel_tag_value.length > 8 ||office_tel_tag_value.length <7) {
		str_office_tel = '사무실 번호 8자리 입력해주세요';
		result_office_tel = false;
	}


	const phone_tel_tag_value = document.querySelector('#regSelfEmpDetailFrom #phoneTelInput').value;
	
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


function regSelfEmpDetail() {
	//유효성 검사 진행
	const isValidate = reg_empDetail_validate();
	
	if(!isValidate){
		return;
	}	
	const empno = document.querySelector('#empno').textContent; //사번
	const ename = document.querySelector('#ename').value; //이름
	

	const eEmail = document.querySelector('#eEmail').textContent; //이메일
	
	const office_tel_first=document.querySelector('#officeTel').value;
	const office_tel_num=document.querySelector('#officeTelInput').value;
	const officeTel=office_tel_first+office_tel_num;
	
	const phone_tel_first=document.querySelector('#phoneTel').value;
	const phone_tel_num=document.querySelector('#phoneTelInput').value;
	const phoneTel=phone_tel_first+phone_tel_num;
	
	
	regDetail={
		'empno' : empno,		
		'ename':ename,
		'eEmail' : eEmail,
		'officeTel':officeTel,
		'phoneTel': phoneTel,
			
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
		url: '/user/regSelfEmpDetailAjax', //요청경로
		type: 'post',
		data: form_data,
	    processData: false,
	    contentType: false,
		async: true, // 동기 방식으로 설정
		success: function(result) {
			alert('마이페이지가 수정되었습니다.');
			location.reload();
			
		},
		error: function() {
			alert('실패');
		}
	});	

}

//마이페이지 취소
function revokeMyPage(){
	location.reload();
}
