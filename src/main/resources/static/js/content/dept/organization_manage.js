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
    
    

//클릭한 부서의 사원 정보 띄우기   
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


//클릭한 부서 사원 정보 그리기
function drawEmpList(empList){
	const deptEmpListTable = document.querySelector('#deptEmpListTable');
	deptEmpListTable.replaceChildren();
	
	let str = '';
	
	//사진 없으면 default 이미지로 설정/ 있으면 등록된 사진으로 띄우기
	// 각 사원들은
	str += '<table class="table table-striped table-hover">';
	/*	
		str += '<colgroup>';	
		str += 	'<col width="*">';	
		str += 	'<col width="5%">';	
		str += 	'<col width="5%">';	
		str += 	'<col width="5%">';	
		str += 	'<col width="5%">';	
		str += '</colgroup>';	*/
		str += '<tr>';	
		str += 		'<td>사진</td>';
		str += 		'<td>사번</td>';
		str += 		'<td>이름</td>';
		str += 		'<td>직책</td>';
		str += 		'<td>전화번호</td>';
		str += '</tr>';

	empList.forEach(function(emp){
		console.log(emp);
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
	str += '</table>';

	
	
	deptEmpListTable.insertAdjacentHTML('afterbegin', str);
	
}















