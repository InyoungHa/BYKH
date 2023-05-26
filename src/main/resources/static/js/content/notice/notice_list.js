//페이지 이동 + 검색
function movePage(pageNum) {
	const noticeForm = document.querySelector('#noticeForm');
	document.querySelector('#nowPage').value = pageNum;	
	noticeForm.submit();
}