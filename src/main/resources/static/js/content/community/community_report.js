
//신고글 모달
function getReportBoard(boardNum) {
	//ajax start
	$.ajax({
		url: '/community/getReportBoardAjax', //요청경로
		type: 'post',
		async: true,
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {'boardNum' : boardNum}, //필요한 데이터
		success: function(result) {
			const boardTableBody = document.querySelector('#boardTableBody');
			
			boardTableBody.replaceChildren();
			
			let str = '';			
			
			str += `<tr>                                                    `;
			str += `	<td class="table-light">제목</td>                   `;
			str += `	<td class="text-start">${result.boardTitle}</td>   `;
			str += `	<td class="table-light">작성자</td>                 `;
			str += `	<td>${result.ename}</td>                           `;
			str += `</tr>                                                   `;
			str += `<tr>                                                    `;
			str += `	<td class="table-light">작성일</td>                 `;
			str += `	<td class="text-start">${result.boardDate}</td>   `;
			str += `	<td class="table-light">조회수</td>                 `;
			str += `	<td>${result.boardView}</td>                      `;
			str += `</tr>                                                   `;
			str += `<tr>                                                    `;
			str += `	<td class="table-light">첨부파일</td>               `;
			str += `	<td colspan="3" class="text-start">                 `;
			if(result.boardFileList.length == 0) {
			str += `<span class="text-secondary">첨부된 파일이 없습니다.</span>    `;
			}
			else {
				for(const file of result.boardFileList) {
			str += `<div><a href="community/download?fileNum=${file.fileNum}" style="color: black; text-decoration:underline; text-underline-offset : 5px;">`;
			str += `${file.originFileName}</a> (${file.fileSize})</div>                             `;
				}
			}
			str += `	</td>                                               `;
			str += `</tr>                                                   `;
			str += `<tr>                                                    `;
			str += `	<td colspan="4" class="text-start align-baseline">  `;
			str += `		<div style="min-height: 20rem">${result.boardContent}</div>       `;
			str += `	</td>                                               `;
			str += `</tr>                                                   `;
			
			boardTableBody.insertAdjacentHTML('afterbegin', str);
			
			$("#reportBoardLink").attr("href", `/community/detail?boardNum=${boardNum}`);
			
			
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}


//글 삭제
function deleteBoard(boardNum) {
	if(confirm('글을 삭제하시겠습니까?')) {
		location.href = `/community/deleteReportBoard?boardNum=${boardNum}`;
	}
}


//신고 취소
function deleteReport(reportNum, boardNum) {
	if(confirm('신고를 취소하시겠습니까?')) {
		location.href = `/community/deleteReport?reportNum=${reportNum}&boardNum=${boardNum}`;
	}
}



