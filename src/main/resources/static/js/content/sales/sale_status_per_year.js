

//차트 그리기
function drawChart(data){
	
	const ctx = document.getElementById('myChart');

	new Chart(ctx, {
		type: 'bar',
		data: {
			labels: ['1월', '2월', '3월',
				'4월', '5월', '6월',
				'7월', '8월', '9월',
				'10월', '11월', '12월'],
			datasets: [
				{
					label: '월 별 판매 금액', //범례
					data: data['saleList'],
					borderWidth: 3,
					yAxisID:'y' // 아래 Option에 y축 연결
				},
				{
					type: 'line',
					label: '월 별 판매 건수',
					data: data['cntList'],
					borderWidth: 3,
					yAxisID:'y1'// 아래 Option에 y1축 연결
				}

			]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true,
					type:'linear',
					display: true,
					position:'left'
				},
				y1: {
					beginAtZero: true,
					type:'linear',
					display: true,
					position:'right'
				}
				
			}
		}
	});
}

