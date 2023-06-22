init();

//기본 설정
function init() {
	$('.dept').hide();
	
	//도시명 눌렀을 때
	$(".loc").click(function() {
		//누른 도시 말고 다른 li 태그의 ul 들고와서 닫아주기
		const otherDept = $(".loc").not(this).next(".dept");
		
		$.each(otherDept, function() {
			if($(this).css("display") == "block") {
				$(this).slideUp(500);
			}
		});
		
		//내거는 열기
		$(this).next(".dept").slideToggle(500);
	});
}


// 조직도 사원 조회
function getDeptEmpList(deptno) {
	//ajax start
	$.ajax({
		url: '/user/getDeptEmpListAjax', //요청경로
		type: 'post',
		async: true,
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'deptno' : deptno}, //필요한 데이터
		success: function(result) {
			const empListDiv = document.querySelector('#empListDiv');
			
			empListDiv.replaceChildren();
			
			let str = '';
			
			for(const emp of result) {
				str += `<div class="d-flex justify-content-between mb-2">                                                                                              `;
				str += `	<div><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-fill me-2" viewBox="0 0 16 16">`;
				str += `			<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>                                             `;
				str += `		</svg>${emp.ename} ${emp.e_job}</div>                                                                                                                `;
				str += `	<div><button type="button" class="btn btn-sm" onclick="updateRoleCheck('${emp.empno}');">추가</button></div>                                                                          `;
				str += `</div>                                                                                                                                         `;
			}
			
			empListDiv.insertAdjacentHTML('afterbegin', str)
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}


// 설정 항목 선택
function selectRole(eRole, selectedLi) {
	//input에 role 추가
	const roleInput = document.querySelector('#eRole');
	roleInput.value = eRole;
	
	//기존 배경색 해제
	const prevLi = document.querySelector('.selectedLi');
	if(prevLi != null) {
		prevLi.classList.remove('selectedLi')
	}
	
	//배경색 추가
	selectedLi.classList.add('selectedLi');
	
	getEmpRoleList(eRole);
}


//항목별 관리자 리스트 조회 메소드
function getEmpRoleList(eRole) {
	//ajax start
	$.ajax({
		url: '/user/getEmpRoleListAjax', //요청경로
		type: 'post',
		async: true,
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'eRole' : eRole}, //필요한 데이터
		success: function(result) {
			const alertDiv = document.querySelector('#alertDiv');
			alertDiv.replaceChildren();
			
			
			const roleEmpListDiv = document.querySelector('#roleEmpListDiv');
			roleEmpListDiv.replaceChildren();
			
			let str = '';
			
			if(result.length == 0) {
				str += `<div class="mt-5 mb-2">`;
				str += `	<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">`;
				str += `	  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>`;
				str += `	  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>`;
				str += `	</svg>`;
				str += `</div>`;
				str += `<div class="fs-3">관리자가 존재하지 않습니다.</div>`;
				
				alertDiv.insertAdjacentHTML('afterbegin', str);
			}
			else {
				for(const emp of result) {
				str += `<div class="col mb-2">                                                                                                                                                      `;
				str += `    <div class="card">                                                                                                                                                      `;
				str += `      <div class="card-body pt-0 pe-1">                                                                                                                                               `;
				str += `      	<div class="float-end text-danger" onclick="deleteRole('${emp.empno}', this)" style="cursor: pointer;"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">`;
				str += `		  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>`;
				str += `		</svg></div>       `;
				str += `      	<div class="d-flex gap-2 align-items-center mt-3 mb-2">                                                                                                                  `;
				str += `      		<div class="col-sm-4">                                                                                                                                          `;
				if(emp.eimgVO.attached_file_name != null) {
				str += `		      	<img src="/upload/empImg/${emp.eimgVO.attached_file_name}" width="50px" class="mx-0 rounded-circle border">                              `;
				}
				else {
				str += `		      	<img src="/upload/empImg/test.jpg" width="50px" class="mx-0 rounded-circle border">                                                                         `;
				}
				str += `      		</div>                                                                                                                                                          `;
				str += `      		<div class="col-sm-8">                                                                                                                                          `;
				str += `		        <h5 class="card-title fs-4 mb-0">${emp.ename}</h5>                                                                                                                `;
		      	str += `				<div class="gap-1 d-flex align-items-center fs-6">                                                                                                          `;
				str += `					<span class="align-items-center">${emp.deptVO.loc}</span>                                                                                                            `;
				str += `					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">                     `;
				str += `					  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>`;
				str += `					</svg>                                                                                                                                                  `;
				str += `					<span class="align-items-center">${emp.deptVO.dename}</span>                                                                                                          `;
				str += `				</div>                                                                                                                                                      `;
				str += `      		</div>                                                                                                                                                          `;
				str += `      	</div>                                                                                                                                                              `;
				str += `      	<div>                                                                                                                                                               `;
				str += `	        <p class="card-text fs-6 mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">`;
				str += `			  <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>`;
				str += `			</svg> ${emp.eemail}</p>                                                                                                             `;
				str += `	        <p class="card-text fs-6"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">`;
				str += `			  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>`;
				str += `			</svg> ${emp.office_tel}</p>                                                                                                                       `;
				str += `      	</div>                                                                                                                                                              `;
				str += `      </div>                                                                                                                                                                `;
				str += `    </div>                                                                                                                                                                  `;
			    str += `</div>                                                                                                                                                                      `;
				}
				
				roleEmpListDiv.insertAdjacentHTML('afterbegin', str);
			}
			
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}


//권한 추가
function updateRoleCheck(empno) {
	const eRole = document.querySelector('#eRole').value;
	
	//설정 항목 선택 체크
	if(eRole == '') {
		alert('설정 항목을 선택해주세요.');
		
		return false;
	}
	
	//권한 중복 조회
	$.ajax({
		url: '/user/roleCheckAjax', //요청경로
		type: 'post',
		async: true,
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'eRole' : eRole, 'empno' : empno}, //필요한 데이터
		success: function(result) {
			if(result == 1) { // 중복인 경우
				alert('이미 관리자입니다.');
		
				return false;
			}
			else {
				//관리자 추가
				if(confirm('관리자로 추가하시겠습니까?')) {
					updateRole(eRole, empno);
				}
			}
		},
		error: function() {
			alert('실패');
		}
	});
}


//관리자 추가
function updateRole(eRole, empno) {
	//ajax start
	$.ajax({
		url: '/user/updateRoleAjax', //요청경로
		type: 'post',
		async: true,
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'eRole' : eRole, 'empno' : empno}, //필요한 데이터
		success: function(result) {
			const emp = result;

			//'관리자가 존재하지 않습니다.' div 제거
			const alertDiv = document.querySelector('#alertDiv');
			alertDiv.replaceChildren();
			
			//관리자 정보 추가
			const roleEmpListDiv = document.querySelector('#roleEmpListDiv');
			
			let str = '';
			
			str += `<div class="col mb-2">                                                                                                                                                      `;
			str += `    <div class="card">                                                                                                                                                      `;
			str += `      <div class="card-body pt-0 pe-1">                                                                                                                                               `;
			str += `      	<div class="float-end text-danger" onclick="deleteRole('${emp.empno}', this)" style="cursor: pointer;"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">`;
			str += `		  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>`;
			str += `		</svg></div>       `;
			str += `      	<div class="d-flex gap-2 align-items-center mt-3 mb-2">                                                                                                                  `;
			str += `      		<div class="col-sm-4">                                                                                                                                          `;
			if(emp.eimgVO.attached_file_name != null) {
			str += `		      	<img src="/upload/empImg/${emp.eimgVO.attached_file_name}" width="50px" class="mx-0 rounded-circle border">                              `;
			}
			else {
			str += `		      	<img src="/upload/empImg/test.jpg" width="50px" class="mx-0 rounded-circle border">                                                                         `;
			}
			str += `      		</div>                                                                                                                                                          `;
			str += `      		<div class="col-sm-8">                                                                                                                                          `;
			str += `		        <h5 class="card-title fs-4 mb-0">${emp.ename}</h5>                                                                                                                `;
	      	str += `				<div class="gap-1 d-flex align-items-center fs-6">                                                                                                          `;
			str += `					<span class="align-items-center">${emp.deptVO.loc}</span>                                                                                                            `;
			str += `					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">                     `;
			str += `					  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>`;
			str += `					</svg>                                                                                                                                                  `;
			str += `					<span class="align-items-center">${emp.deptVO.dename}</span>                                                                                                          `;
			str += `				</div>                                                                                                                                                      `;
			str += `      		</div>                                                                                                                                                          `;
			str += `      	</div>                                                                                                                                                              `;
			str += `      	<div>                                                                                                                                                               `;
			str += `	        <p class="card-text fs-6 mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">`;
			str += `			  <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>`;
			str += `			</svg> ${emp.eemail}</p>                                                                                                             `;
			str += `	        <p class="card-text fs-6"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">`;
			str += `			  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>`;
			str += `			</svg> ${emp.office_tel}</p>                                                                                                                       `;
			str += `      	</div>                                                                                                                                                              `;
			str += `      </div>                                                                                                                                                                `;
			str += `    </div>                                                                                                                                                                  `;
		    str += `</div>                                                                                                                                                                      `;
			
			roleEmpListDiv.insertAdjacentHTML('beforeend', str);
			
			
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}


//관리자 삭제
function deleteRole(empno, deleteBtn) {
	if(confirm('관리자 권한을 삭제하시겠습니까?')) {
		const eRole = document.querySelector('#eRole').value;
		
		//ajax start
		$.ajax({
			url: '/user/deleteRoleAjax', //요청경로
			type: 'post',
			async: true,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			data: {'eRole' : eRole, 'empno' : empno}, //필요한 데이터
			success: function(result) {
				//해당 카드 삭제
				const card = deleteBtn.closest('.col');
				card.remove();
				
				//관리자 리스트에 아무도 없는지 확인
				const cardList = document.querySelectorAll('.card');
				
				console.log(cardList);
				
				if(cardList.length == 0) {
					let str = '';
					
					str += `<div class="mt-5 mb-2">`;
					str += `	<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">`;
					str += `	  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>`;
					str += `	  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>`;
					str += `	</svg>`;
					str += `</div>`;
					str += `<div class="fs-3">관리자가 존재하지 않습니다.</div>`;
					
					alertDiv.insertAdjacentHTML('afterbegin', str);
				}
			},
			error: function() {
				alert('실패');
			}
		});
		//ajax end
	}
}



