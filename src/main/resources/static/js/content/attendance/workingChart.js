//html열리자마자 Ajax 실행
getSaleStatusByCategoryAjax();



function getSaleStatusByCategoryAjax(){
	//ajax start
	$.ajax({
		url: '/attendance/selectTotalChartAjax', //요청경로
		type: 'post',
		async: true,
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: {}, //필요한 데이터
		success: function(result) {
			console.log(result);
			 drawChart(result);
			 drawTable(result);
			
		},
		error: function() {
			alert('실패');
		}
	});
//ajax end
	
}

function drawChart(data){
	
const ctx = document.getElementById('categoryPieChart');
	//data에 들어있는 모든 데이터 중 CATE_NAME 데이터만 추출해서 
	//추출한 데이터를 배열로 만들로 생성 
	
	//data에 들어있는 모든 데이터 중 SUM_BUY_CNT 데이터만 추출해서 
	//추출한 데이터를 배열로 만들로 생성 

	const cateNameArr = [];
	const sumbyCntArr = [];

	data.forEach(function(item, index){
		cateNameArr[index] = item['ENAME'];
		sumbyCntArr[index] = item['WORKING_DAYS'];	
	});
	



new Chart(ctx, {
	type: 'bar',
	data: {
		labels: cateNameArr,
		datasets: [
			{
				label: '총 근무시간',
				data: sumbyCntArr,
				//backgroundColor: Object.values(Utils.CHART_COLORS),
				  backgroundColor: [
                'rgba(54, 162, 235, 0.6)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
            ]
				
			}
		]
	},
	options: {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				
			}
		}
	}
});
	
}

//테이블을 그리는 함수
function drawTable(data){
	//테이블이 그려질 div태그 선택
	const tableDiv = document.querySelector('.tableDiv');
	
	//그려질 테이블 태그를 문자열로 작성
	let str = ``;
	str+= `<table class="table text-center" style='margin-top:50px;'>`;
	str+= `<colgroup>`;
	str+= `<col width="*">`;
	str+= `<col width="40%">`;
	str+= `<col width="40%">`;
	str+= `</colgroup>`;
	str+= `<thead>`;
	str+= `<tr>`;
	str+= `<td style=font-weight:bold;>No</td>`;
	str+= `<td style=font-weight:bold;>사원명</td>`;
	str+= `<td style=font-weight:bold;>총 근무시간</td>`;
	str+= `</tr>`;
	str+= `</thead>`;
	str+= `<tbody>`;
	
	for(let i = 0; i < data.length; i++){
		str += `<tr>`;
		str += `<td>${data.length - i}</td>`;
		str += `<td>${data[i]['ENAME']}</td>`;
		str += `<td>${data[i]['WORKING_DAYS']}</td>`;
		str += `</tr>`;
	}
	
	str+= ``;
	str+= ``;
	str+= `</tbody>`;
	str+= `</table>`;
	
	//테이블이 들어갈 div 태그에 위에서 만든 코드를 삽입
	tableDiv.insertAdjacentHTML('afterbegin', str);
	
}









