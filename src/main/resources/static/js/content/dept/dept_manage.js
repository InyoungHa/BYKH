

//부서 중복 확인
function isDuplicate(){
	const loc=document.querySelector('select[name="loc"]').value;
	const dename = document.querySelector('#dename').value;

	if(dename.trim() === ''){
		alert('띄어쓰기 없이 부서명을 입력해주세요.');
		return;
	}
	
	if(dename == ''){
		alert('부서명 입력은 필수입니다 \n부서명을 입력해주세요');
		return;
	}

	$.ajax({
		url: '/dept/isDuplicateAjax', //요청경로
		type: 'post',
		//async: true, // 동기 방식으로 설정
		//contentType :'application/json; charset=UTF-8', //Json 타입
		contentType: "application/x-www-form-urlencoded; charset=UTF-8", //default
		data: {'loc' : loc
			, 'dename' : dename}, //필요한 데이터
		success: function(result) {
			
			if(!result){
				alert('중복된 부서입니다.');
			} else{
				regDept();				
			}
		},
		error: function() {
			alert('중복 확인 실패');
		}
	});
}


//부서 등록
function regDept(){
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
		data: {loc, dename}, //필요한 데이터
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
