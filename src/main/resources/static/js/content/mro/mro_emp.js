//'수량' 변경 시 
function setTotalPrice(clickTag){
	//tr 선택
	const tdList = clickTag.closest("tr").querySelectorAll("td");
	const selectCntTag = tdList[4].querySelector("input[type='number']");
	const selectCnt = parseInt(selectCntTag.value);
	const itemCnt = parseInt(tdList[4].dataset.itemCnt)
	const itemPrice = parseInt(tdList[5].textContent.replace(/[^\d]/g, ""));
	if(selectCnt > itemCnt){
		alert(`재고부족\n${itemCnt}개 이하로 선택해 주세요.`);
		selectCntTag.value = itemCnt;
		return ;
	}
	const finalPriceView = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(selectCnt*itemPrice);
	tdList[5].textContent = finalPriceView;
	tdList[5].dataset.totalPrice = selectCnt*itemPrice;
}

//'추가' 버튼 클릭 시 실행
function addBuyTable(clickTag){
	const buyTable = document.querySelector('.buy-table tbody');
	const tdList = clickTag.closest("tr").querySelectorAll("td");
	
	const itemNo = tdList[2].dataset.itemNo
	const itemName = tdList[2].textContent
	const itemCnt = tdList[4].querySelector("input[type='number']").value;
	const totalPrice = tdList[5].dataset.totalPrice;
	
	//중복 검사		
	const buyTrs = buyTable.querySelectorAll(tr);
	let isDuplicated = false;
	buyTrs.forEach(function(buyTr){
		if(!isDuplicated){
			if(buyTr.children[0].dataset.itemNo = itemNo){
				isDuplicated = true;
				buyTr.children[1].textContent = parseInt(buyTr.children[1].textContent) + itemCnt;			
				
				
			}
		}
	});
	if(!isDuplicated){
		//중복이 아닐 경우
		let str = '';
		str += `<tr>
					<td data-item-no="${itemNo}">${itemName}</td>
					<td>${itemCnt}</td>
					<td>${totalPrice}</td>
				</tr>`;
		buyTable.insertAdjacentHTML('afterbegin', str);	
	}
		
}