const addItemModal = new bootstrap.Modal(document.querySelector('#addItemModal'));
init();

function init(){
	
	setFinalPrice();
	
	$('.dept').hide();
	
	//도시명 눌렀을 때
	$(".loc").click(function() {
		//누른 도시 말고 다른 li 태그의 ul 들고와서 닫아주기
		const otherDept = $(".loc").not(this).next(".dept");
		
		$.each(otherDept, function() {
			if($(this).css("display") == "block") {
				$(this).slideUp(500);
			}
		});
		
		//내거는 열기
		$(this).next(".dept").slideToggle(500);
	});
}



//결재자 리스트 div에 추가
function addApproverHTML(approverNo, approverName, approverJob, img_route){
	//결재자 리스트 영역
	const approver_list_div = document.querySelector('.approver-list-div');
	
	//함수를 종료할지 결정(중복검사, 본인선택)
	const isReturn = false;
	//중복검사
	const approver_no_list = document.querySelectorAll('.approverNo');
	console.log(approver_no_list);
	let return_msg = '';
	for (let i=0; i<approver_no_list.length; i++){
		if(approver_no_list[i].value == approverNo){
			return_msg = '이미 결재 목록에 있습니다.';
			isReturn = true;
		}
	}
	//본인 선택 금지
	const writer_no = document.querySelector('.writerNo').value;
	if(writer_no == approverNo){
		return_msg = '자신은 추가할 수 없습니다.';
		isReturn = true;
	}
	
	if(isReturn){
		alert(return_msg);
		return ;
	}
	
	let str = '';
	str += `
		<div class="row pt-2 pb-2 d-flex align-items-center justify-content-center border-bottom approver-div">
			<div class="col-3">
				<img src="${img_route}" width="60px;" class="rounded-image">
			</div>
			<div class="col-7">
				${approverName} ${approverJob}
				<input type="hidden" value="${approverNo}" class="approverNo">
			</div>
			<div class="col-2 d-grid">
				<input type="button" class="btn btn-primary" value="삭제" onclick="delApproverHTML(this);">
			</div>
		</div>
			`;
	//'참조' 또는 '추가' 버튼 클릭에 따라 각 영역에 추가
	approver_list_div.insertAdjacentHTML('beforeend', str);
	//테이블 td 추가
	addStampTableTd(approverNo, approverName, approverJob);
	
}
//참조자 리스트 div에 추가
function addReferrerHTML(referrerNo, referrerName){
	//참조자 리스트 영역	
	const referrer_list_div = document.querySelector('.referrer-list-div');
	
	//중복검사
	const referrer_span_list = referrer_list_div.querySelectorAll('span');
	for(let i=0; i<referrer_span_list.length; i++){
		if(referrerNo == referrer_span_list[i].dataset.referrerNo){
			return ;
		}
	}
	
	let str = '';
	str += `
		<span data-referrer-no="${referrerNo}">
			${referrerName}
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
				class="bi bi-x-circle-fill" viewBox="0 0 16 16"
				onclick="delReferrerHTML(this);"
				style="cursor: pointer;">
			  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
			</svg>
		</span>
			`;
	//'참조' 또는 '추가' 버튼 클릭에 따라 각 영역에 추가
	referrer_list_div.insertAdjacentHTML('beforeend', str);
	
}
function delReferrerHTML(clickTag){
	
	clickTag.parentElement.remove();
}
// 조직도 사원 조회
function getDeptEmpList(deptno){
		//ajax start
	$.ajax({
		url: '/user/getDeptEmpListAjax', //요청경로
		type: 'post',
		async: true, //동기/비동기
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: {'deptno' : deptno}, //필요한 데이터
		success: function(result) {
			const empListArea = document.querySelector('.emp-list-area');
			empListArea.replaceChildren();
			let str = '';
			for (const emp of result){
				//console.log(emp.eImgVO.attachedFileName);
				const img_route = emp.eimgVO.attached_file_name == null ? '/upload/empImg/test.jpg' : '/upload/empImg/'+emp.eimgVO.attached_file_name;
				str += `
					<div class="row pt-2 pb-2 d-flex align-items-center justify-content-center border-bottom approver-div"
							>
						<div class="col-3">
							
							<img src="${img_route}" width="60px;" class="rounded-image">
						</div>
						<div class="col-7">
							${emp.ename} ${emp.e_job}
						</div>
						<div class="col-2 d-grid">
								<input type="button" class="btn btn-primary mb-1" value="참조" onclick="addReferrerHTML(${emp.empno}, '${emp.ename}');">
								<input type="button" class="btn btn-primary" value="추가" onclick="addApproverHTML(${emp.empno}, '${emp.ename}', '${emp.e_job}', '${img_route}');">
						</div>
					</div>
						`;				
			
			}
			empListArea.insertAdjacentHTML('afterbegin', str);
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}

// divA의 높이가 변경될 때마다 실행되는 함수
const deptListArea = document.querySelector(".dept-list-area");
const empListArea = document.querySelector(".emp-list-area");
function syncHeights() {
    const deptHeight = deptListArea.offsetHeight;
    console.log(deptHeight);
    empListArea.style.height = `${deptHeight}px`;
}
syncHeights();
//
deptListArea.addEventListener("resize", syncHeights);


//테이블 td 추가
function addStampTableTd(approverNo, approverName, approverJob) {
	const table = document.querySelector('.stamp-table');

	// 모든 <tr> 요소를 선택
	const trList = table.querySelectorAll('tr');

	// 각 <tr> 요소에 마지막 자식으로 <td> 요소 추가
	for(let i = 0; i<trList.length; i++){
		const td = document.createElement('td');
		if(i === 0){			
			td.dataset.approverNo = approverNo;
			td.textContent = approverJob;
		}
			trList[i].appendChild(td);
	}
	
}

//결재자 지정 - '삭제'버튼 클릭 시 실행
function delApproverHTML(this_tag){
	//스탬프 테이블 td 삭제
	delStampTableTd(this_tag);
	//결재자 목록의 결재자 삭제
	this_tag.parentElement.parentElement.remove();
}

//테이블 Td 삭제
function delStampTableTd(this_tag) {
	const approver = this_tag.parentElement.parentElement
	const delApproverNo = approver.querySelector('input[type="hidden"]').value;
	const table = document.querySelector('.stamp-table');
	//ejob tr에 삭제할 결제자번호와 같은 approver 번호가 있다면
	for(let i=0; i<table.rows[0].cells.length; i++){
		const approverNo = table.rows[0].cells[i].dataset.approverNo;
		if(approverNo == delApproverNo){
			//같은 열의 td 모두 삭제
			for(let j=0; j<table.rows.length; j++){
				table.rows[j].deleteCell(i)
			}
			
		}
	}
	
	
	
}

//'▼' 버튼 클릭 시 실행
//모달에 추가할 아이템 클릭시 선택
function addBuyList(){
	//itemTable에서 tr 태그 전체 가져오기
	const item_row_list = document.querySelectorAll('.itemTable tr');
	//추가될 테이블의 tbody 영역 선택
	const add_item_table_tbody = document.querySelector('.addItemTable tbody');
	//추가될 테이블의 tr 태그 선택
	const add_item_row_list = document.querySelectorAll('.addItemTable tr');
	item_row_list.forEach(function(item_row){
		const bgColor = window.getComputedStyle(item_row).getPropertyValue("background-color");
		if(bgColor == 'rgb(204, 204, 204)'){
			//tr의 background color 제거
			item_row.style.backgroundColor = '';
			
			//추가될 테이블의 tr 태그가 있을 경우에만 중복체크
			if(add_item_row_list.length != 0){
				//중복 체크
				let isDuplicated = false;
				for(let i=0; i<add_item_row_list.length; i++){
					if(add_item_row_list[i].dataset.itemNo == item_row.dataset.itemNo){
						isDuplicated = true;
					}
				}
				//중복이 아닐 경우에만 추가
				if(!isDuplicated){
					addCloneTr(item_row, add_item_table_tbody);
					
				}
				
			}else{
				addCloneTr(item_row, add_item_table_tbody);
			}
			
		}
	});
	
	//추가된 tr들을 선택할 수 있도록 이벤트 발생시키기
	const event = new Event('addItemFinished');
	document.dispatchEvent(event);
}

//매개변수 tr을 복제해 number td를 추가한 tr을 매개변수 tbody 영역에 추가하는 함수
function addCloneTr(item_row, add_item_table_tbody) {
	let str = `<td><input type="number" class="form-control" value="1" onkeyup="setTotalPrice(this);" onchange="setTotalPrice(this);"></td>`;
	//tr 복제
	const new_row = item_row.cloneNode(true);
	new_row.querySelector('td:first-child').insertAdjacentHTML('afterend', str);
	add_item_table_tbody.insertAdjacentHTML('beforeend', new_row.outerHTML);
	
	//
}




//'▲' 버튼 클릭 시 실행
function delBuyList(){
	//addItemTable에서 선택된 tr 태그 가져오기
	const add_item_table_row_list = document.querySelectorAll('.addItemTable tr')
	add_item_table_row_list.forEach(function(row){
		const bgColor = window.getComputedStyle(row).getPropertyValue("background-color");
		if(bgColor == 'rgb(204, 204, 204)'){
			//tr의 background color 제거
			row.style.backgroundColor = '';
			
			//추가될 테이블에 추가
			row.remove();
		}
	});
}

//클릭한 태그 색상 추가/삭제 이벤트 추가 함수
function toggleSelectedColor (tag_list, tag_name){
	for(let i = 0; i < tag_list.length; i++){
		//data-event-bound : 이벤트 중복 등록 방지용 속성
		if (!tag_list[i].hasAttribute('data-event-bound')) {
			tag_list[i].addEventListener('click', function(){
				if(tag_name == 'tr'){
					tag_list[i].style.backgroundColor = tag_list[i].style.backgroundColor ===  'rgb(204, 204, 204)' ? '' : 'rgb(204, 204, 204)';
				}
				else if(tag_name == 'td'){
					tag_list[i].parentElement.style.backgroundColor = tag_list[i].parentElement.style.backgroundColor ===  'rgb(204, 204, 204)' ? '' : 'rgb(204, 204, 204)';
				}
			});
			tag_list[i].setAttribute('data-event-bound', 'ture')
		}
		
	}
}

//상품 개수 변경할 때마다 총가격 변경
function setTotalPrice(changeTag){
	//행 선택
	const row = changeTag.closest('tr');
	//총 가격을 세팅할 태그 선택
	const total_td = row.querySelector('td:last-child');
	total_td.textContent = '';
	//수량 값
	const cnt = row.querySelector('td:nth-child(2) input[type="number"]').value;
	//개별 가격 값
	const price = total_td.dataset.itemPrice;
	//총 가격
	const total_price = cnt * price;
	//원화 형식으로 변환
	const formatted_total_price = total_price.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })
	
	//총 가격 세팅
	total_td.textContent = formatted_total_price;
}

//'추가' 버튼 클릭 시 addItem 테이블에 있는 목록 기안문서 테이블에 추가
function addItemTr(){
	// 1.필요한 데이터 가져오기(item_no, item_name, item_price, total_price)
	//addItem테이블의 tr들 전체 선택
	const tr_list = document.querySelectorAll('.addItemTable tr');
	
	//addItem 테이블에 데이터가 없을 경우 안내멘트
	if(tr_list.length == 0){
		alert('추가할 상품이 없습니다.');
		return ;
	}
	
	let item_no_list = [];
	let item_name_list = [];
	let item_cnt_list = [];
	let item_price_list = [];
	let total_price_list = [];
	tr_list.forEach(function(tr){
		const item_name_value = tr.querySelector('td:first-child').textContent;
		const item_price_value = tr.querySelector('td:last-child').dataset.itemPrice;
		const item_cnt_value = tr.querySelector('td:nth-child(2) input[type="number"]').value;
		const total_price_value_str = tr.querySelector('td:last-child').textContent.replace(/[₩,]/g, '');
		const total_price_value = parseInt(total_price_value_str);
		item_no_list.push(tr.dataset.itemNo);
		item_name_list.push(item_name_value);
		item_cnt_list.push(item_cnt_value);
		item_price_list.push(item_price_value);
		total_price_list.push(total_price_value);
	});
	
	// 2.삽입할 str 코드 작성
	let str = ``;
	const content_tr_list = document.querySelectorAll('.itemTr');
	let isDuplicated = false; //?
	
	if(content_tr_list.length > 0){
		for(let i=0; i<item_no_list.length; i++){
			for(let j=0; j<content_tr_list.length; j++){
				const content_item_no = content_tr_list[j].querySelector('input[type="hidden"]').value;
				//중복일 경우
				if(item_no_list[i] == content_item_no){
					const cnt_td = content_tr_list[j].querySelector('td:nth-child(2)');
					const item_cnt = parseInt(cnt_td.textContent);
					cnt_td.textContent = item_cnt + parseInt(item_cnt_list[i]);
					
					isDuplicated = true;
					break;
				}
			}
			//중복이 아닐 경우
			if(!isDuplicated){
				str +=
				`
						<tr class="itemTr">
							<td>
								${item_name_list[i]}
								<input type="hidden" name="docPurchaseOrderVO.buyVO.itemNo.buyDetailVOList.itemNo" 
								value="${item_no_list[i]}" class="item-no">
							</td>
							<td>${item_cnt_list[i]}</td>
							<td>${item_price_list[i]}</td>
							<td>${total_price_list[i]}</td>
						</tr>
						`;
			}
		}
	} else {
		for (let i = 0; i < item_no_list.length; i++) {
			str +=
				`
						<tr class="itemTr">
							<td>
								${item_name_list[i]}
								<input type="hidden" name="docPurchaseOrderVO.buyVO.itemNo.buyDetailVOList.itemNo" 
								value="${item_no_list[i]}" class="item-no">
							</td>
							<td>${item_cnt_list[i]}</td>
							<td>${item_price_list[i]}</td>
							<td>${total_price_list[i]}</td>
						</tr>
						`;
		}
	}
	
	
	// 3.합계 tr(마지막에서 2번째 tr)의 이전 형제태그로 추가
	const content_tr = document.querySelectorAll('.content-table tr');
	content_tr[content_tr.length - 2].insertAdjacentHTML('beforebegin', str);
	
	// 4. 합계 계산
	setFinalPrice();
	
	// 5.모달 닫기
	addItemModal.hide();
}

//합계 계산(모달창에서 '추가' 클릭시 실행)
function setFinalPrice(){
	//1. 중복 확인
	
	
	//2. 합계 계산
	//모든 tr들의 마지막 td 가져오기
	const total_price_td_list = document.querySelectorAll('.itemTr td:last-child');	
	let final_price = 0;
	total_price_td_list.forEach(function(total_price_td){
		final_price += parseInt(total_price_td.textContent);
	});
	//합계를 넣을 td 태그 가져오기
	const buy_price_td = document.querySelector('.buyPriceTd');
	buy_price_td.textContent = final_price;
	
};

//기안올리기
function insertPurchaseorder(sgnStatus){
	//1. 데이터 세팅
	//1-1. buyDetail
	const buy_datail_arr= [];
	const item_tr_list = document.querySelectorAll('.itemTr');
	item_tr_list.forEach(function(tr, index){
		const buy_detail = {
			'itemNo': tr.querySelector('input[type="hidden"]').value,
			'buyCnt': tr.querySelector('td:nth-child(2)').textContent,
			'buyDetailPrice': tr.querySelector('td:last-child').textContent
		};
		buy_datail_arr[index] = buy_detail;
	});
	//1-2 buy
	const buy = {
		'buyDeptNo': document.querySelector('.deptNo').value,
		'buyPrice': document.querySelector('.buyPriceTd').textContent,
	};
	//1-3 docPurchaseOrder
	const doc_purchase_order = {
		'dpoComment': document.querySelector('.dpo-comment').value
	};
	//1-4 sgn
	const sgn_arr = [];
	const approver_tag_list = document.querySelectorAll('.approverNo');
	approver_tag_list.forEach(function(approver_no, index){
		const sgn = {
			'approverNo':approver_no.value
		};
		sgn_arr[index] = sgn;
	});
	//1-5 referrer
	const referrer_arr = [];
	const referrer_tag_list = document.querySelectorAll('.referrer-list-div span');
	referrer_tag_list.forEach(function(referrer_tag, index){
		const referrer = {
			'referrerNo':referrer_tag.dataset.referrerNo
		}
		referrer_arr[index] = referrer;
	});
	//1-6 sgnDoc
	const sgn_doc = {
		'docType': 2,
		'docNo': document.querySelector('.docNo').value,
		'writerNo': document.querySelector('.writerNo').value,
		'docTitle': '구매신청서',
		'sgnStatus': sgnStatus
	}
	
	//전달할 데이터
	const data = {
		'buy_detail_arr' : buy_datail_arr,
		'buy' : buy,
		'sgn_arr' : sgn_arr,
		'referrer_arr':referrer_arr,
		'sgn_doc' : sgn_doc,
		'doc_purchase_order' : doc_purchase_order
	}
	//ajax start
	$.ajax({
		url: '/sign/insertPurchaseorderAjax', //요청경로
		type: 'post',
		async: false, //동기/비동기
		contentType: 'application/json; charset=UTF-8',
		//contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: JSON.stringify(data), //필요한 데이터
		success: function(result) {
			location.href = '/sign/signMain';
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
	
};


//========이벤트=========
//모달이 열릴 때 emp 리스트 조회해오기
const searchApproverModal = document.querySelector('#searchApproverModal');
/*
searchApproverModal.addEventListener('show.bs.modal', function() {
	//모달이 열릴 때
	const search_name_tag = document.querySelector('.search-name');
	//ajax start
	$.ajax({
		url: '/sign/getEmpListAjax', //요청경로
		type: 'post',
		async: true, //동기/비동기
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: {'ename':search_name_tag.value}, //필요한 데이터
		success: function(result) {
			
			const modal_body_div = searchApproverModal.querySelector('.modal-body');
			modal_body_div.replaceChildren('');
			let str = ``;
			str += `
			<table class="table table-hover align-middle">
						<colgroup>
							<col width="20%">
							<col width="*">
							<col width="20%">
						</colgroup>
						`;
			result['empList'].forEach(function(emp){
				str += ` 	<tr>	
								<td>
									<div>
										<img src="/img/content/emp/YangDongGun.jpg" width="70px;" class="rounded-image">
									</div>
								</td>
								<td>
									${emp.ename}  ${emp.e_job}
								</td>
								<td>
									<div class="d-grid">
										<button type="button" class="btn btn-primary add-approver-btn" onclick="addApproverHTML(${emp.empno}, '${emp.ename}', '${emp.e_job}');" >
											추가
										</button>
									</div>
								</td>
							</tr>`;
			});
			str += `</table>`;
			
			modal_body_div.insertAdjacentHTML('afterbegin', str);
			search_name_tag.value = '';
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end

});
*/
//모달 태그 선택
const addItemModalEvent = document.querySelector('#addItemModal');
//모달이 열리면 itemList 테이블의 tr을 클릭할 때마다 색상 추가/삭제 이벤트 추가
addItemModalEvent.addEventListener('show.bs.modal', function() {
	const row_list = document.querySelectorAll('.itemTable tr');
	toggleSelectedColor(row_list, 'tr');
	
	
	//addItem테이블에 
	

});
//모달이 닫힐 때 itemList 테이블과 addItem 테이블의 내용(tbody) 초기화
addItemModalEvent.addEventListener('hidden.bs.modal', function() {
	const add_item_tbody = document.querySelector('.addItemTable > tbody');
	add_item_tbody.replaceChildren();
});


//addItem 함수가 실행된 후 addItem 테이블의 tr을 선택
document.addEventListener('addItemFinished', function(e) {
	const td_list = document.querySelectorAll('.addItemTable tr td:first-child');
	toggleSelectedColor(td_list, 'td');

});

//시간 남으면 추가(addItem테이블에 추가된 tr이 없을 때마다 안내멘트 출력)

