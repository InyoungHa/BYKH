//카테고리별 아이템 조회
function getItemInCate(clickTag){
	const cate_no = clickTag.value;
	location.href='/mro/mroManage?searchItemVO.searchCateNo='+cate_no;
	
}

//아이템 변경 모달
function showUpdateItemModal(clickTag){
	//모달 선택(여닫기 위한)
	const ItemModalTag = document.querySelector('#updateItemModal');
	const ItemModal = new bootstrap.Modal(ItemModalTag);
	
	//body 세팅(변경전 값 세팅)
	const rowData = clickTag.closest("tr");
	//카테고리 세팅
	const modalSelectTag = document.querySelector('.cate-no');
	const cateNo = rowData.querySelectorAll('td')[0].dataset.cateNo;
	const selector = `option[value='${cateNo}']`;
	modalSelectTag.querySelector(selector).selected = true;
	//상품명 세팅
	document.querySelector('.item-name').value = rowData.querySelectorAll('td')[1].textContent;
	//가격 세팅
	document.querySelector('.item-price').value = rowData.querySelectorAll('td')[2].dataset.itemPrice;
	//재고 세팅
	document.querySelector('.item-cnt').value = rowData.querySelectorAll('td')[3].textContent;
	//판매여부 세팅
	const isUse = rowData.querySelectorAll('td')[4].dataset.isUse;
	document.querySelector('#is-use-'+isUse).checked = true
	//itemno 세팅
	document.querySelector('.item-no').value = rowData.querySelectorAll('td')[1].dataset.itemNo;
	
	
	ItemModal.show();
}

//페이지 버튼 클릭 시 실행
function getOrderListPage(nowPage){
	document.querySelector('#nowPage').value = nowPage;
	//document.querySelector('#search-cate-no').value = document.querySelector('.select-cate').value;
	const searchForm = document.querySelector('#searchForm');
	searchForm.submit();
}