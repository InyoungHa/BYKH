


//부서 등록 비활성화하는 방법
function setDisabled(disabled) {
  const join_dept_btn = document.querySelector('#joinDeptBtn');
  if (disabled) {
    join_dept_btn.disabled = true;
    join_dept_btn.classList.add('disabled');
  } else {
    join_dept_btn.disabled = false;
    join_dept_btn.classList.remove('disabled');
  }
}

//부서 중복 확인
function isDuplicate(){
	const loc=document.querySelector('select[name="loc"]').value;
	const dename = document.querySelector('#dename').value;

	$.ajax({
		url: '/dept/isDuplicateAjax', //요청경로
		type: 'post',
		async: false, // 동기 방식으로 설정
		//contentType :'application/json; charset=UTF-8', //Json 타입
		contentType: "application/x-www-form-urlencoded; charset=UTF-8", //default
		data: {'loc' : loc
			, 'dename' : dename}, //필요한 데이터
		success: function(result) {
			
			if(result){
				alert('중복된 부서명입니다.');
				setDisabled(true);
			} else{					
				//부서 등록의 비활성화 기능을 제거한다	
				setDisabled(false);		
				//유효성 검사
				deptJoinValidate();
			}
		},
		error: function() {
			alert('중복 확인 실패');
		}
	});
}

//오류 메세지 div 전체 제거
function deleteErrorDiv(){
	const errorDivs = document.querySelectorAll('div[class="my-invalid"]');

	//여러 태그들인 erroDivs를 하나씩 출력해준다
	//잘 진행되지만, 창에서 나갔다가 다시 돌아오면 input 태그에 내용이 그대로 있다 -> init함수에도 적용하기
	for(const errorDiv of errorDivs){
		errorDiv.remove();
	}
}


//부서 등록 유효성 검사
function deptJoinValidate(){
	
	//기존의 오류 메세지 전부 삭제
	deleteErrorDiv();
	
	
	//함수의 리턴 결과를 저장하는 변수
	//let result = true;
	let result_dename = true;
	
	//오류 메세지
	//let str ='';
	let str_dename = '';
	
	//부서 등록 form 태그의 자식 div 전체 선택
	const divs = document.querySelectorAll('#regDeptForm > div');
	
	//부서 등록 버튼을 누르면 validation처리
	const dename = document.querySelector('#dename').value;
	
	if(dename ==''){
		str_dename = '부서명 입력은 필수입니다.';
		result_dename = false;
	}else if(dename.trim() ==''){
		str_dename = '부서명을 공백 없이 입력해주세요';
		result_dename = false;
	} else{
		str_dename='';
	}
	
	
	//유효성 검사 실패시 오류 메세지 출력(false 일때)
	if(!result_dename){
		const errorHTML = `<div class="my-invalid" style="color: red; font-size: 1rem;">${str_dename}</div>`;
		divs[1].insertAdjacentHTML('beforeend', errorHTML);
		setDisabled(true);
	}
	else{
		setDisabled(true);
	}
		
	//모든 제약에 걸리지 않을때(true 일때)
	return result_dename;
}


//부서 등록
function regDept(){
	//유효성 검사 진행
	const isValide = deptJoinValidate();
	
	if(!isValide){
	return; // 유효하지 않는다면 deptJoinValidate()함수 진행 종료 false가 됨
	//isValide가 유효하다면 true; 
	}
	const loc=document.querySelector('select[name="loc"]').value;
	const dename = document.querySelector('#dename').value;
	
	console.log(`loc=${loc}`)
	console.log(`dename=${dename}`)
	
	if(dename.value == ''){
		alert('부서명 입력은 필수입니다 \n부서명을 입력해주세요');
		return;
	}	
	
	$.ajax({
		url: '/dept/regDeptAjax', //요청경로
		type: 'post',
		//async: true, // 동기 방식으로 설정
		//contentType :'application/json; charset=UTF-8', //Json 타입
		contentType: "application/x-www-form-urlencoded; charset=UTF-8", //default
		data: {'loc' : loc
			, 'dename' : dename}, //필요한 데이터
		success: function(result) {
			alert('부서 등록 완료입니다.')
			drawDeptList(result);
		},
		error: function() {
			alert('부서 등록 실패');
		}
	});
	
}

//부서 테이블 그리는 함수
function drawDeptList(deptList){
	
	//사번 조회 테이블
	const tbody = document.querySelector('#deptListTable').querySelector('tbody');
	
	tbody.replaceChildren(); 
	
	let str ='';
		
	deptList.forEach(function(dept, index){		
		str +=`<tr>`;
		str +=`<td>${index+1}</td>`;
		str +=`<td>${dept.loc}</td>`;
		str +=`<td>${dept.dename}</td>`;
		str +=`<td>${dept.isUse}</td>`;
		str +=`<td>${dept.deptno}</td>`;
		str +=`<td>`;
		str +=`<input onclick="deleteDept(${dept.deptno});" type="button" value="삭제" class="btn btn-secondary">`;
		str +=`</td>`;							
		str +=`</tr>`;
		
	});								
	
	tbody.insertAdjacentHTML('afterbegin',str);	
			
	//부서 등록 완료되면 html form 삭제
	const reg_dept_form= document.querySelector('#regDeptForm');
	
	reg_dept_form.reset();
}


//부서 삭제
function deleteDept(deptno){
	
	$.ajax({
		url: '/dept/deleteDeptAjax', //요청경로
		type: 'post',
		//async: true, // 동기 방식으로 설정
		//contentType :'application/json; charset=UTF-8', //Json 타입
		contentType: "application/x-www-form-urlencoded; charset=UTF-8", //default
		data: {deptno}, //필요한 데이터
		success: function(result) {
			alert('부서 삭제 되었습니다.')
			location.reload();
		},
		error: function() {
			alert('부서 삭제 실패');
		}
	});
	
}
