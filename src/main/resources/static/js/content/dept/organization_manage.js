 //오류 메세지 div 전체 제거
function deleteErrorDiv(){
	const errorDivs = document.querySelectorAll('div[class="my-invalid"]');

	//여러 태그들인 erroDivs를 하나씩 출력해준다
	//잘 진행되지만, 창에서 나갔다가 다시 돌아오면 input 태그에 내용이 그대로 있다 -> init함수에도 적용하기
	for(const errorDiv of errorDivs){
		errorDiv.remove();
	}
}

 
 
    $(document).ready(function(){
        $(".menu>a").click(function(){
            var submenu = $(this).next("ul");
 
            // submenu 가 화면상에 보일때는 위로 보드랍게 접고 아니면 아래로 보드랍게 펼치기
            if( submenu.is(":visible") ){
                submenu.slideUp();
            }else{
                submenu.slideDown();
            }
        }).mouseover(function(){
            $(this).next("ul").slideDown();
        });
 
 
        // menu class 중에 두번째 있는 menu 의 하위에 있는 a태그에 클릭 이벤트를 발생시킨다.
        $(".menu:eq(0)>a").click();
    });
    
    

//클릭한 부서 추가 모달의 사원 정보 띄우기   
function detailDept(deptno){
	
	
	$.ajax({
		url: '/dept/getDeptEmpAjax', //요청경로
		type: 'post',
		async: true, // 동기 방식으로 설정
		//contentType: 'application/json; charset=UTF-8', //Json 타입
		contentType: "application/x-www-form-urlencoded; charset=UTF-8", //default
		data: { 'deptno': deptno }, //필요한 데이터
		success: function(result) {

			for(i=0; i<result.length; i++){
				console.log(result[i])
			}
			
			drawEmpList(result)
		},
		error: function() {
			alert('실패');
		}
	});
}


//클릭한 부서 추가 모달 사원 정보 그리기
function drawEmpList(empList){
	const deptEmpListTable = document.querySelector('#deptEmpListTable');
	deptEmpListTable.replaceChildren();
	
	let str = '';
	
	//사진 없으면 default 이미지로 설정/ 있으면 등록된 사진으로 띄우기
	// 각 사원들은
	str += '<table class="table table-striped table-hover">';

		str += '<tr>';	
		str += 		'<td>사진</td>';
		str += 		'<td>사번</td>';
		str += 		'<td>이름</td>';
		str += 		'<td>직책</td>';
		str += 		'<td>전화번호</td>';
		str += '</tr>';

			
		if(empList.length != 0){
			empList.forEach(function(emp){
							
			str += 	'<tr>';		
			str += 		'<td>';
			str += 			`<img src="${emp.eimgVO.attached_file_name ? '/upload/empImg/' + emp.eimgVO.attached_file_name : '/upload/empImg/default.png'}"
								style="width: 5rem; display: block;">`;
			str += 		'</td>';
			str += 		`<td>${emp.empno}</td>`;
			str += 		`<td>${emp.ename}</td>`;
			str += 		`<td>${emp.e_job}</td>`;
			
			if(emp.phone_tel == null){			
				str += 		`<td></td>`;		
			}else{
				str += 		`<td>${emp.phone_tel}</td>`;					
			}
			str += 	'</tr>';	
					
			});
		
		}else{
			str += 	'<tr>';		
			str += 		'<td colspan="5" style="text-align:center;">현재 등록된 사원이 없습니다.</td>';
			str += 	'</tr>';		
			
		}		
	str += '</table>';
	
	deptEmpListTable.insertAdjacentHTML('afterbegin', str);
	
}

///////////////////////////////////////모달 작업//////////////////////////////



//부서 추가 모달 등록 비활성화하는 방법
function setDisabled() {
  document.querySelector('#addDeptBtn').disabled = true;
 
}

//부서 추가 모달 중복 확인
function isDuplicate(){
	const loc=document.querySelector('#addDeptModal_loc').value;
	const dename = document.querySelector('#addDeptModal_dename').value;
	

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
				alert('중복된 부서입니다.');				
			} else{					
				alert('등록 가능한 부서입니다.')
				
				//부서 추가 모달 등록의 비활성화 기능을 제거한다	
				document.querySelector('#addDeptBtn').disabled = false;
				
			}
		},
		error: function() {
			alert('중복 확인 실패');
		}
	});
}



//부서 추가 모달 등록 유효성 검사
function deptJoinValidate(){
	
	//기존의 오류 메세지 전부 삭제
	deleteErrorDiv();
	
	
	//함수의 리턴 결과를 저장하는 변수
	//let result = true;
	let result_dename = true;
	
	//오류 메세지
	//let str ='';
	let str_dename = '';
	
	//부서 추가 모달 등록 form 태그의 자식 div 전체 선택
	//const divs = document.querySelectorAll('#regDeptForm > div > div');
	
	//dename div 선택
	const dename_div = document.querySelector('#addDeptModal_dename').closest('div');
	
	//부서 추가 모달 등록 버튼을 누르면 validation처리
	const dename = document.querySelector('#addDeptModal_dename').value;
	
	//부서 추가 모달 등록 공백 정규식 
	const denameExp = /\s/;
	
	if(dename ==''){
		str_dename = '부서 입력은 필수입니다.';
		result_dename = false;
	}else if(denameExp.test(dename)){
		str_dename = '부서 명을 공백 없이 입력해주세요';
		result_dename = false;
	} 
	
	
	//유효성 검사 실패시 오류 메세지 출력(false 일때)
	if(!result_dename){
		const errorHTML = `<div class="my-invalid" style="color: red; font-size: 1rem;">${str_dename}</div>`;
		dename_div.insertAdjacentHTML('beforeend', errorHTML);
		document.querySelector('#addDeptBtn').disabled = true;
	}
	else{
		document.querySelector('#addDeptBtn').disabled = true;
	}
		
	//모든 제약에 걸리지 않을때(true 일때)
	return result_dename;
}


//부서 추가 모달 등록
function regDept(){
	//유효성 검사 진행
	const isValide = deptJoinValidate();
	
	if(!isValide){
	return; // 유효하지 않는다면 deptJoinValidate()함수 진행 종료 false가 됨
	//isValide가 유효하다면 true; 
	}
	
	const loc=document.querySelector('#addDeptModal_loc').value;
	const dename = document.querySelector('#addDeptModal_dename').value;
	
	console.log(`loc=${loc}`)
	console.log(`dename=${dename}`)
	
	if(dename.value == ''){
		alert('부서 추가 모달명 입력은 필수입니다 \n부서 추가 모달명을 입력해주세요');
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
			location.reload();		
		},
		error: function() {
			alert('부서 추가 모달 등록 실패');
		}
	});
	
}

//부서 수정 _ 원래 데이터 띄우기
//select된 loc로 부서 리스트 조회
function showDeptList(){
	
	const loc = document.querySelector('#modifyDeptModal_loc').value;
	//console.log(loc);
	$.ajax({
		url: '/dept/getDeptListAjax', //요청경로
		type: 'post',
		//async: true, // 동기 방식으로 설정
		//contentType :'application/json; charset=UTF-8', //Json 타입
		contentType: "application/x-www-form-urlencoded; charset=UTF-8", //default
		data: {'loc': loc}, //필요한 데이터
		success: function(result) {
			
			add_select_modal(result)
		},
		error: function() {
			alert('부서 조회 실패');
		}
	});
	
}

function add_select_modal(deptList){
	console.log(deptList);
	
	const locMatachDept =document.querySelector('#locMatachDept');
	locMatachDept.replaceChildren();
	
	let str ='';
	
	str += `<select id="deptModal_dept" class="form-control">`;
	deptList.forEach(function(dept){
		
		str += 		`<option value="${dept.deptno}">${dept.dename}</option>`;
	});		

	str += '</select>';
	str += '<div class="modal-footer">';
	str += 	`<input type="text" id="modifyDename">`;
	str += 		`<input type="button" value="중복확인" onclick="isDuplicate();" class="btn">`;
	str += 		`<button type="button" onclick="regDept();" class="btn btn-secondary" data-bs-dismiss="modal">수정하기</button>`;
	str += '</select>';
	
	
	locMatachDept.insertAdjacentHTML('beforeend', str);
	
}







