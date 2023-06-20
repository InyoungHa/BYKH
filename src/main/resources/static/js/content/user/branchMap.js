

//누를 때마다 active 효과 주기
const header_div = document.querySelector('.header_branch_map ul');
const li_tags = header_div.querySelectorAll('li');

let anchor;

li_tags.forEach(function(li) {
  const a_tag = li.querySelector('a');

  if (a_tag.getAttribute('id') === '001') {
    anchor = li;
    anchor.classList.add('active');
  }

  a_tag.addEventListener('click', function() {
    li_tags.forEach(function(li) {
      li.classList.remove('active');
    });

    li.classList.add('active');

    const click_branch_code = a_tag.getAttribute('id');
    changeMap(click_branch_code);
  });
});


//html default 설정
document.addEventListener('DOMContentLoaded', function() {
  anchor.classList.add('active');
  changeMap('001');
});


	

function changeMap(click_branch_code){	
	console.log(click_branch_code);
	
	let branchCode ='';
	
	if(click_branch_code =='001'){
		branchCode ='BRANCH_001';
	}else if(click_branch_code =='002'){
		branchCode ='BRANCH_002';
	} else if(click_branch_code =='003'){
		branchCode ='BRANCH_003';
	} else if(click_branch_code =='004'){
		branchCode ='BRANCH_004';
	}
	
	
	$.ajax({
		url: '/user/getBranchInfoAjax', //요청경로
		type: 'post',
		async: true, // 동기 방식으로 설정
		//contentType: 'application/json; charset=UTF-8', //Json 타입
		contentType: "application/x-www-form-urlencoded; charset=UTF-8", //default
		data: {'branchCode':branchCode}, //필요한 데이터
		success: function(result) {
			
			console.log(result);
			drawMapTable(result);
			draw_map(result.latitude, result.longitude)
	

		},
		error: function() {
			alert('실패');
		}
	});
}
	
function drawMapTable(branch_location_info){
	
	const map_table= document.querySelector('.mapTable');
	map_table.replaceChildren();
	
	
	let str ='';
	
	str += '<table class="table table-hover" style="border-top:1px solid black;">';
	str += 	'<tbody>';
	str += 		'<tr>';
	str += 			'<th class="text-center">주소</th>';
	str += 			`<td id="branchAddr">${branch_location_info.branchAddr}</td>`;
	str += 		'</tr>';
	str += 		'<tr>';
	str += 			'<th class="text-center">버스</th>';
	str += 			`<td id="byWayBus"><img src="/img/bus.png" width="40px">${branch_location_info.byWayBus}</td>`;
	str += 		'</tr>';
	str += 		'<tr style="border-bottom:1px solid black;">';
	str += 			'<th class="text-center">지하철</th>';
	
	if(branch_location_info.byWaySubway ==null){
		
		str += 			`<td id="byWaySubway"></td>`;
	}else{
		str += 			`<td id="byWaySubway"><img src="/img/subway.png" width="40px">${branch_location_info.byWaySubway}</td>`;
		
	}	
	str += 		'</tr>';
	str += 		'<tr>';
	str += 			'<td colspan="3">';
	str += 				`<div id="map" style="width: 100%; height: 350px;"></div>`;
	str += 			'</td>';
	str += 		'</tr>';
	str += '</table>';
	
	
	map_table.insertAdjacentHTML('afterbegin', str);
	
}
	

function draw_map(latitude, longitude){
	console.log(latitude, longitude);
	
	var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

	var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
	
	// 마커가 표시될 위치입니다 
	var markerPosition  = new kakao.maps.LatLng(latitude, longitude); 
	
	// 마커를 생성합니다
	var marker = new kakao.maps.Marker({
	    position: markerPosition
	});
	
	// 마커가 지도 위에 표시되도록 설정합니다
	marker.setMap(map);
	
	// 아래 코드는 지도 위의 마커를 제거하는 코드입니다
	// marker.setMap(null);  

}
	
	
	
	
	
	
	
	
	
	
	
	
