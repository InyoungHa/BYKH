//html열리자마자 Ajax 실행
getSaleStatusByCategoryAjax();



function getSaleStatusByCategoryAjax(){
	//ajax start
	$.ajax({
		url: '/resource/selectEventCountAjax', //요청경로
		type: 'post',
		async: true,
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

	const cateNameArr = [];
	const sumbyCntArr = [];

	data.forEach(function(item, index){
		cateNameArr[index] = item['EVENT_NAME'];
		sumbyCntArr[index] = item['RESOURCE_CNT'];	
	});
	



new Chart(ctx, {
	type: 'pie',
	data: {
		labels: cateNameArr,
		datasets: [
			{
				label: '자원 사용 횟수',
				data: sumbyCntArr,
			}
		]
	},
	plugins: [ChartDataLabels],
	options: {
		responsive: false,
		plugins: {
			
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				
			}
			,
	          datalabels: {
                    formatter: function (value, context) {
                        return Math.round(value / context.chart.getDatasetMeta(0).total * 100) + "%";
                    },
                    color: '#fff',
                     font: {
                        size: 28
                    }
                }
                
		}
	}
});
	
}

function drawTable(data){
	const tableDiv = document.querySelector('.tableDiv');
	
	let str = ``;

	str+= `<table class="table text-center" style='margin-top:30px; width:600px;'>`;
		str+= `<colgroup>`;
	str+= `<col width="*">`;
	str+= `<col width="40%">`;
	str+= `<col width="40%">`;
	str+= `</colgroup>`;
	str+= `<thead>`;
	str+= `<tr>`;
	str+= `<td style=font-weight:bold;>No</td>`;
	str+= `<td style=font-weight:bold;>자원명</td>`;
	str+= `<td style=font-weight:bold;>자원 사용 횟수</td>`;
	str+= `</tr>`;
	str+= `</thead>`;
	str+= `<tbody>`;
	
	for(let i = 0; i < data.length; i++){
		str += `<tr>`;
		str += `<td>${data.length - i}</td>`;
		str += `<td>${data[i]['EVENT_NAME']}</td>`;
		str += `<td>${data[i]['RESOURCE_CNT']}</td>`;
		str += `</tr>`;
	}
	
	str+= ``;
	str+= ``;
	str+= `</tbody>`;
	str+= `</table>`;
	
	tableDiv.insertAdjacentHTML('afterbegin', str);
	
}









