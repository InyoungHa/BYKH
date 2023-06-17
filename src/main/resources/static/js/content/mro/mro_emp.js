//'수량' 변경 시 
function updateItemCnt(clickTag){
	//tr 선택
	const tdList = clickTag.closest("tr").querySelectorAll("td");
	const selectCntTag = tdList[4].querySelector("input[type='number']");
	const selectCnt = parseInt(selectCntTag.value);
	const itemCnt = parseInt(tdList[4].dataset.itemCnt)
	const itemPrice = parseInt(tdList[3].dataset.itemPrice);
	if(selectCnt > itemCnt){
		alert(`재고부족\n${itemCnt}개 이하로 선택해 주세요.`);
		selectCntTag.value = itemCnt;
		return ;
	}
	setTotalPrice(selectCnt*itemPrice, tdList[5]);
}

//총 가격 세팅
function setTotalPrice(totalPrice, updateTag){
	const totalPriceView = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(totalPrice);
	updateTag.textContent = totalPriceView;
	updateTag.dataset.totalPrice = totalPrice;
	
}

//'추가' 버튼 클릭 시 실행
function addBuyTable(clickTag){
	const buyTbody = document.querySelector('.buy-table tbody');
	const tdList = clickTag.closest("tr").querySelectorAll("td");
	
	const itemNo = tdList[2].dataset.itemNo
	const itemName = tdList[2].textContent
	const itemCnt = tdList[4].querySelector("input[type='number']").value;
	const totalPrice = tdList[5].dataset.totalPrice;
	console.log(tdList[5]);
	console.log(tdList[5].dataset.totalPrice);
	//중복 검사		
	const buyTrs = buyTbody.querySelectorAll('tr');
	let isDuplicated = false;
	
	buyTrs.forEach(function(buyTr){
		if(!isDuplicated){
			//중복일 경우 수량, 가격 변경
			if(buyTr.children[0].dataset.itemNo == itemNo){
				isDuplicated = true;
				const updateItemCnt = parseInt(buyTr.children[1].textContent) + parseInt(itemCnt);
				const updateTotalPrice = parseInt(tdList[3].dataset.itemPrice)*updateItemCnt;
				const updateTotalPriceView = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(updateTotalPrice);
				buyTr.children[1].textContent = updateItemCnt;	
				buyTr.children[2].dataset.totalPrice = updateTotalPrice;
				buyTr.children[2].textContent = updateTotalPriceView;
				
			}
		}
	});
	if(!isDuplicated){
		//중복이 아닐 경우 tr 추가
		const totalPriceView = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(totalPrice);
		let str = '';
		str += `<tr>
					<td data-item-no="${itemNo}">${itemName}
						<svg class="minus-svg" onclick="delBuyItem(this);" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm4.253 9.25h-8.5c-.414 0-.75.336-.75.75s.336.75.75.75h8.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z" fill-rule="nonzero"/>
						</svg>
					</td>
					<td>${itemCnt}</td>
					<td data-total-price="${totalPrice}">${totalPriceView}</td>
				</tr>`;
		buyTbody.insertAdjacentHTML('beforeend', str);	
		
		
		
	}
	setFinalPrice();
	
	//수량 초기화
	tdList[4].querySelector("input[type='number']").value = 1;
	
	
}

//최종 가격 세팅
function setFinalPrice(){
	const totalTds = document.querySelectorAll('.buy-table tbody tr td:last-child');
	let finalPrice = 0;
	totalTds.forEach(function(totalTd){
		finalPrice += parseInt(totalTd.dataset.totalPrice);
	});
	const finalPriceView = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(finalPrice);
	
	document.querySelector('.final-price').textContent = finalPriceView + ' 원';
}
//구매목록 삭제
function delBuyItem(clickTag){
	console.log(clickTag);
	clickTag.closest("tr").remove();
}

//검색 버튼 클릭 시 실행
function searchItemList(){
	const searchCateNo = document.querySelector('.search-cate-no').value;
	const searchItemName = document.querySelector('.search-item-name').value;
	
	//ajax start
	$.ajax({
		url: '/mro/searchItemListAjax', //요청경로
		type: 'post',
		async: false, //동기/비동기
		//contentType: 'application/json; charset=UTF-8',
		//contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: {'searchItemVO.searchCateNo':searchCateNo, 'searchItemVO.searchItemName':searchItemName}, //필요한 데이터
		success: function(result) {
			//테이블 그리기(삭제 후)
			const itemTbody = document.querySelector('.item-table tbody');
			itemTbody.replaceChildren();
			
			let str = '';
			//조회한 item 개수에 따라 코드 추가
			if(result.length > 0){
				for(let i=0; i < result.length; i++){
					const itemPriceView = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(result[i].itemPrice);
					str += `
						<tr>
							<td>${i+1}</td>
							<td>${result[i].categoryVO.cateName}</td>
							<td data-item-no="${result[i].itemNo}">${result[i].itemName}</td>
							<td data-item-price="${result[i].itemPrice}>${itemPriceView}</td>
							<td data-item-cnt="${result[i].itemCnt}">
								<input type="number" class="form-select" value="1" min="1" th:max="${result[i].itemCnt}" 
								onchange="updateItemCnt(this);" onkeyup="updateItemCnt(this);">
							</td>
							<td data-total-price="${result[i].itemPrice}">${itemPriceView}</td>
							<td>
								<input type="button" class="btn" value="추가" onclick="addBuyTable(this);">
							</td>
						</tr>
					
					`;
				}
			}else{
				str += `
				<tr>
					<td colspan="7">구매할 수 있는 상품이 없습니다.</td>
				</tr>`;
			}
			
			itemTbody.insertAdjacentHTML('beforeend', str);
				
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}

// 구매신청서 작성 페이지이동
function goPurchaseOrderForm(){
	//구매목록 데이터
	const buyTrs = document.querySelectorAll('.buy-table tr');
	
	const itemArr = []
	buyTrs.forEach(function(buyTr){
		item = {
			'itemNo':buyTr.children[0].dataset.itemNo
			, 'itemCnt':buyTr.children[1].textContent
		}
		itemArr.push(item);
	});
	
	//ajax로 데이터 전달 + 구매신청서 작성 페이지 이동
};












