

function searchFormEmp(){
	
	const searchValue =document.querySelector('#searchFormHeader #searchValue').value;

	$.ajax({
		url: '/user/searchEmpAjax', //요청경로
		type: 'post',
		async: true, // 동기 방식으로 설정
		//contentType: 'application/json; charset=UTF-8', //Json 타입
		contentType: "application/x-www-form-urlencoded; charset=UTF-8", //default
		data: {'searchValue':searchValue}, //필요한 데이터
		success: function(result) {
			//모달 태그 선택
			const modal_tag = document.querySelector('#searchEmpModal');
			console.log(result);
			//모달 내용 그리기
			drawSearchEmp(result);
	
			//bootstrap 모달 불러오기
			const modal = new bootstrap.Modal(modal_tag);
			modal.show();
		},
		error: function() {
			alert('실패');
		}
	});
}


function drawSearchEmp(empList){
	
	const modal_body=document.querySelector('.modal-body-header');
	modal_body.replaceChildren();
	
	let str ='';
	

	str +='<div class="row">';
	str +=	'<div class="col fs-6">';
	str +=		'<table class="table table-striped">';	
	str +=		'<colgroup>';	
	str +=			'<col width="*">';	
	str +=			'<col width="20%">';	
	str +=			'<col width="20%">';	
	str +=			'<col width="18%">';	
	str +=			'<col width="18%">';	
	str +=			'<col width="13%">';	
	str +=			'<col width="9%">';	
	str +=		'</colgroup>';	
	str +=			'<thead>';
	str +=				'<tr>';
	str +=					'<th></th>';
	str +=					'<th>사원명</th>';
	str +=					'<th>부서</th>';
	str +=					'<th>내선번호</th>';
	str +=					'<th>휴대전화</th>';
	str +=					'<th>직급</th>';
	str +=					'<th>재직여부</th>';
	str +=				'</tr>';
	str +=			'</thead>';
	
	str +=			'<tbody>';
	
	empList.forEach(function(emp){
		
		str +=			'<tr>';		
		str +=				`<td>`;
		str +=					`<img src="${emp.eimgVO.attached_file_name ? '/upload/empImg/' + emp.eimgVO.attached_file_name : '/upload/empImg/test.jpg'}" 
									 style="width: 3rem;">`;
		str +=				`</td>`;
		str +=				`<td>${emp.ename}(${emp.empno})</td>`;
		str +=				`<td>${emp.deptVO.dename}(${emp.deptVO.loc})</td>`;
		
		if(emp.office_tel == null){
			str +=				'<td></td>';
		}
		else{
			str +=				`<td>${emp.office_tel}</td>`;
		}
		
		if(emp.phone_tel == null){
			str +=				'<td></td>';
		}
		else{
			str +=				`<td>${emp.phone_tel}</td>`;
		}
		str +=				`<td>${emp.e_job}</td>`;
		str +=				`<td>${emp.estatusStr}</td>`;		
		str +=			'</tr>';
	})
	str +=			'</tbody>';	
	str +=		'</table>';
	str +=	'</div>';
	str +='</div>';
	
	
	modal_body.insertAdjacentHTML('beforeend', str);
}