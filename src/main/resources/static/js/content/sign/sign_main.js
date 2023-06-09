//모달 선택(여닫기 위한)
const showSignDocModalTag = document.querySelector('#showSignDoc');
const modal = new bootstrap.Modal(showSignDocModalTag);
//제목 클릭 시 - 임시저장일 경우
function goWriteForm(clickTag){
	const docType = clickTag.dataset.docType;
	const docNo = clickTag.dataset.docNo;
	const address = docType == 1 ? '/sign/annualLeaveForm?docNo=' : '/sign/purchaseOrderForm?docNo=';
	
	location.href = address + docNo;
	
}

//제목 클릭 시 - 임시저장이 아닐 경우
function showSignDocModal(clickTag){
	
	//모달 내용 영역 선택
	const modalBodyArea = document.querySelector('#showSignDoc .modal-body');
	
	//내용 초기화
	//modalTitleArea.replaceChildren();
	modalBodyArea.replaceChildren();
	//문서번호, 타입, 결재여부 가져오기
	const docNo = clickTag.dataset.docNo;
	const docType = clickTag.dataset.docType;
	const isApproved = clickTag.dataset.isApproved;
	
	//ajax start
	$.ajax({
		url: '/sign/getSignDocDetailAjax', //요청경로
		type: 'post',
		async: true, //동기/비동기
		//contentType: 'application/json; charset=UTF-8',
		//contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: {'docNo':docNo, 'docType':docType}, //필요한 데이터
		success: function(result) {
			console.log(result);
			//키값 가져옴(list 형태)
			const key = Object.keys(result);
			console.log(result);
			const loginId = document.querySelector('.login-id').value;
			let isNextApprover = false;
			let isCanBeDeleted = false;
			let str = '';
			//연차신청서일 경우
			if(key[0] == 'docAnnualLeave'){
				const signWriteInfo = result[key[0]];
				str += `
				<div class="row">
						<div class="col-8" id="sgnDocArea" style="border: 1px solid #dee2e6;">
							<input type="hidden" class="docNo" value="${signWriteInfo.docNo}">
							<input type="hidden" class="docType" value="${docType}">
							<div class="row mt-3 mb-3">
								<div class="col text-center">
									<h2>연차신청서</h2>
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-7">
									<table class="table table-bordered text-center sgn-info-table">
										<tbody>
											<tr>
												<td>기안자</td>
												<td>
													${signWriteInfo.empVO.ename}
												</td>
											</tr>
											<tr>
												<td>기안부서</td>
												<td>
													${signWriteInfo.empVO.deptVO.dename}
												</td>
											</tr>
											<tr>
												<td>기안일</td>
												<td>
													${signWriteInfo.insertDate}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div class=" col-5">
									<div class="float-end">
										<table class="table table-bordered text-center stamp-table">
											<tbody>
												<tr class="eJobTr">
													<td>담당</td>`;
												
												signWriteInfo.signVOList.forEach(function(signVO){													
													str += `
														<td>
															${signVO.approverJob}
														</td>`;
												});
												str +=	`
												</tr>
												<tr class="enameTr">
													<td>
														${signWriteInfo.empVO.ename}
													</td>`;
												signWriteInfo.signVOList.forEach(function(signVO){
												str +=
												   `<td>
												   		
														${signVO.sgnResultStr == '결재' ? signVO.approverName : signVO.sgnResultStr == '미결재' ? '반려' : ''}
													</td>`;
												});
												str +=	`
												</tr>
												<tr class="nowDateTr">
													<td>${signWriteInfo.insertDate}</td>`;
												signWriteInfo.signVOList.forEach(function(signVO){
												str +=	`
													<td>${signVO.sgnDate != null ? signVO.sgnDate : ''}</td>`;
												});
												str +=	`
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<table class="table table-bordered text-center annual-content-table">
										<tbody>
											<colgroup>
												<col width="20%">
												<col width="*">
											</colgroup>
											<tr>
												<td>휴가 종류</td>
												<td>
													${signWriteInfo.docAnnualLeaveVO.dalType}
												</td>
											</tr>
										<tr>
											<td>기간 및 일시</td>
											<td>
												<div class="row">
													<div class="col-7">
														${signWriteInfo.docAnnualLeaveVO.startDate}
														 ~ 
														${signWriteInfo.docAnnualLeaveVO.endDate}
													</div>`;
													if(signWriteInfo.docAnnualLeaveVO.startTime != 0 && signWriteInfo.docAnnualLeaveVO.endTime != 0){
														str += `
														<div class="col-5">
															${signWriteInfo.docAnnualLeaveVO.startTime}	 
															시 ~ 
															${signWriteInfo.docAnnualLeaveVO.endTime}시	
														</div>`;
													}
													str += `
												</div>
											</td>
										</tr>
										<tr>
												<td>연차일수</td>
												<td>
													${signWriteInfo.docAnnualLeaveVO.leaveDays}일
												</td>
											</tr>
											<tr>
												<td>휴가 사유</td>
												<td>
													${signWriteInfo.docAnnualLeaveVO.leaveReason}
												</td>
											</tr>
											<tr>
												<td colspan="2">
													1. 연차의 사용은 근로기준법에 따라 전년도에 발생한 개인별 잔여 연차에 한하여 사용합을 원칙으로 한다. 단, 최초입사시에는 근로기준법에 따라 발생 예정된 연차를 차용하여 월 1회 사용 할 수 있다.<br>
													2. 경조사 휴가는 행사일을 증명할 수 있는 가족 관계 증명서 또는 등본, 청첩장 등 제출<br>
													3. 공가(예비군/민방위)는 사전에 통지서를, 사후에 참석증을 반드시 제출
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>			
						</div>
						<div class="col-4">
						<div class="row" style="min-height: 400px;">
						<div class="col">
						
							<div class="row">
								<div class="col">
									<h3>결재라인</h3>
								</div>
							</div>`;
							
							signWriteInfo.signVOList.forEach(function(sign){
								str += `<div class="row pt-2 pb-2 d-flex align-items-center justify-content-center border-bottom">
									<div class="col-3">
										<img src="${sign.attachedFileName == null ? '/upload/empImg/test.jpg' : '/upload/empImg/' + sign.attachedFileName}" width="60px;"
											class="rounded-image">
									</div>
									<div class="col-9">
										${sign.approverName} ${sign.approverJob}
									</div>`;
								if(sign.sgnComent != null){
									str += `
									<div class="col-12 mt-3">
										${sign.sgnComent}
									</div>
									`;
								}
								//결재/반려 버튼 노출여부 지정
								if(loginId == sign.nextApproverNo){
									isNextApprover = true;
								}
								// 삭제버튼 노출여부 지정 (작성자이고, 결재한 결재자가 없다면 노출)
								if(loginId == signWriteInfo.writerNo && isApproved == 0){
									isCanBeDeleted = true;
								}	
								str += `</div>
								`;
							});
							str += `
							</div>
								</div>
								`;
							if(isNextApprover){	
								str += `
							<!-- 다음 결재자일 경우 코맨트 활성화 -->
							<div class="row" style="min-height: 400px;">
							<div class="col">
							<div class="row">
								<div class="col-12">
									<h3>코멘트</h3>
								</div>
								<div class="col">
									<textarea rows="5" cols="30" class="sgnComent"></textarea>
								</div>
							</div>
							</div>
							</div>`;
							
							str += `
								<div class="row">
									
									<div class="col-6 d-grid">
										<input type="button" class="btn btn-primary" value="반려" onclick="updateSignResult(0, ${docNo});">
									</div>
									<div class="col-6 d-grid">
										<input type="button" class="btn btn-primary" value="결재" onclick="updateSignResult(1, ${docNo});">
									</div>
								</div>`
							}
							if(isCanBeDeleted){
								str += `
								<div style="min-height:350px;"></div>
								<div class="row">
									<div class="col-12 d-grid">
										<input type="button" class="btn btn-primary" value="삭제" onclick="deleteSgnDoc(${docType}, ${docNo});">
									</div>
								</div>
								`;
							}
							if(!isCanBeDeleted && !isNextApprover){
								str+= `<div style="min-height:400px;"></div>`;
							}
						str += `
								<div class="row mt-1">
									<div class="col-12 d-grid">
										<input type="button" class="btn btn-primary" value="인쇄" onclick="printArea();">
									</div>
								</div>
							</div>
				
				`;
				
				
				
			}
			//구매신청서일 경우
			else if(key[0] == 'docPurchaseOrder'){
				const signWriteInfo = result[key[0]];
				console.log(signWriteInfo);
				str += `
			<div class="row">
			<div class="col-8 sign-doc-scroll" id="sgnDocArea" style="border: 1px solid #dee2e6;">
			<input type="hidden" class="docType" value="${docType}">
			<div class="row mt-3 mb-3">
								<div class="col text-center">
									<h2>구매신청서</h2>
								</div>
							</div>
			<div class="row mb-3">
				<div class="col-7">
					<table class="table table-bordered text-center sgn-info-table">
						<tbody>
							<tr>
								<td>기안자</td>
								<td>
									${signWriteInfo.empVO.ename}
								</td>
							</tr>
							<tr>
								<td>기안부서</td>
								<td>
									${signWriteInfo.empVO.deptVO.dename}<!-- 자동입력 -->
									<input type="hidden" class="deptNo" th:value="${signWriteInfo.empVO.deptno}">
								</td>
							</tr>
							<tr>
								<td>기안일</td>
								<td>
									${signWriteInfo.insertDate}<!-- 자동입력 -->
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class=" col-5">
					<div class="float-end">
						<table class="table table-bordered text-center stamp-table">
							<tbody>
								<tr class="eJobTr">
									<td>담당</td>`;
								signWriteInfo.signVOList.forEach(function(signVO){
									str += `
									<td>
										${signVO.approverJob}
									</td>`;									
								});
									
									str += `
								</tr>
								<tr class="enameTr">
									<td>
										${signWriteInfo.empVO.ename}
									</td>`;
								signWriteInfo.signVOList.forEach(function(signVO){
									str += `
									<td>
										${signVO.sgnResultStr == '결재' ? signVO.approverName : signVO.sgnResultStr == '미결재' ? '반려' : ''}
									</td>`;
								});
									str += `
								</tr>
								<tr class="nowDateTr">
									<td>${signWriteInfo.insertDate}</td><!-- 시간 -->
									`;
								signWriteInfo.signVOList.forEach(function(signVO){	
									str += `
									<td>${signVO.sgnDate != null ? signVO.sgnDate : ''}</td>`;
								});	
									str += `
								</tr>
								<!-- 결재자 추가시 추가되어야 하는 코드 끝 -->
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="row">
				
				<div class="col-12 mt-3">
					<table class="table table-bordered text-center purchase-content-table">
						<colgroup>
							<col width="40%">
							<col width="20%">
							<col width="20%">
							<col width="20%">
						</colgroup>
						<thead>
							<tr>
								<td>품 명</td>
								<td>수 량</td>
								<td>단 가</td>
								<td>금 액</td>
							</tr>
						</thead>
						<tbody>`;
					signWriteInfo.docPurchaseOrderVO.buyVO.buyDetailVOList.forEach(function(buyDetail){
						str += `
							<tr>
								<td>${buyDetail.itemVO.itemName}</td>
								<td>${buyDetail.buyCnt}</td>
								<td>${buyDetail.itemVO.itemPrice}</td>
								<td>${buyDetail.buyDetailPrice}</td>
							</tr>
						`;
					});
						str += `
							<tr>
								<td>합 계</td>
								<td colspan="2"></td>
								<td  class="buyPriceTd">
									${signWriteInfo.docPurchaseOrderVO.buyVO.buyPrice}
								</td>
							</tr>
							<tr>
								<td>구매사유</td>
								<td colspan="3"
								style="width: 100%; height: 200px; text-align: left;">
									${signWriteInfo.docPurchaseOrderVO.dpoComment == null ? '' : signWriteInfo.docPurchaseOrderVO.dpoComment}
								</td>
							</tr>
							
						</tbody>
					</table>
				</div>
			</div>			
		</div>
		
		<div class="col-4">
		<div class="row" style="min-height: 400px;">
						<div class="col">
						
							<div class="row">
								<div class="col">
									<h3>결재라인</h3>
								</div>
							</div>`;
							
							
							signWriteInfo.signVOList.forEach(function(sign){
								str += `<div class="row pt-2 pb-2 d-flex align-items-center justify-content-center border-bottom">
									<div class="col-3">
										<img src="${sign.attachedFileName == null ? '/upload/empImg/test.jpg' : '/upload/empImg/' + sign.attachedFileName}" width="60px;"
											class="rounded-image">
									</div>
									<div class="col-9">
										${sign.approverName} ${sign.approverJob}
									</div>`;
								if(sign.sgnComent != null){
									str += `
									<div class="col-12 mt-3">
										${sign.sgnComent}
									</div>
									`;
								}
								//결재/반려 버튼 노출여부 지정
								if(loginId == sign.nextApproverNo){
									isNextApprover = true;
								}	
								// 삭제버튼 노출여부 지정 (작성자이고, 결재한 결재자가 없다면 노출)
								if(loginId == signWriteInfo.writerNo && isApproved == 0){
									isCanBeDeleted = true;
								}	
								str += `</div>
								`;
							});
							str += `
							</div>
								</div>
								`;
							if(isNextApprover){	
								str += `
							<!-- 다음 결재자일 경우 코맨트 활성화 -->
							<div class="row" style="min-height: 400px;">
							<div class="col">
							<div class="row">
								<div class="col-12">
									<h3>코멘트</h3>
								</div>
								<div class="col">
									<textarea rows="5" cols="30" class="sgnComent"></textarea>
								</div>
							</div>
							</div>
							</div>`;
							
							str += `
								<div class="row">
									
									<div class="col-6 d-grid">
										<input type="button" class="btn btn-primary" value="반려" onclick="updateSignResult(0, ${docNo});">
									</div>
									<div class="col-6 d-grid">
										<input type="button" class="btn btn-primary" value="결재" onclick="updateSignResult(1, ${docNo});">
									</div>
								</div>`
							}
							if(isCanBeDeleted){
								str += `
								<div style="min-height:350px;"></div>
								<div class="row">
									<div class="col-12 d-grid">
										<input type="button" class="btn btn-primary" value="삭제" onclick="deleteSgnDoc(${docType}, ${docNo});">
									</div>
								</div>
								`;
							}
							if(!isCanBeDeleted && !isNextApprover){
								str+= `<div style="min-height:400px;"></div>`;
							}
						str += `
								<div class="row mt-1">
									<div class="col-12 d-grid">
										<input type="button" class="btn btn-primary" value="인쇄" onclick="printArea();">
									</div>
								</div>
							</div>
				
				`;
				
			}
			//매출보고서일 경우
			
			
			//
			modalBodyArea.insertAdjacentHTML('afterbegin', str);
			
			
			modal.show();
		},
		error: function() {
			alert('실패');
		}
	});
	
	modal.hide();
}
//인쇄
function printArea(){
 var initBody = document.body.innerHTML;
 	console.log(initBody);
    window.onbeforeprint = function(){
        document.body.innerHTML = document.querySelector("#sgnDocArea").innerHTML;
    }
    window.onafterprint = function(){
        document.body.innerHTML = initBody;
    }
    window.print();
    location.reload();
}
function deleteSgnDoc(docType, docNo){
	let pass = confirm('정말 삭제하시겠습니까?');
	if(!pass){
		return ;
	}
	//ajax start
	$.ajax({
		url: '/sign/delSgnDocAjax', //요청경로
		type: 'post',
		async: true, //동기/비동기
		//contentType: 'application/json; charset=UTF-8',
		//contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: {'docType':docType, 'docNo':docNo}, //필요한 데이터
		success: function(result) {
			alert('삭제되었습니다.');
			location.href='/sign/signMain';
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}

//반려 또는 결재 버튼 클릭 시 실행
function updateSignResult(sgnResult, docNo){
	
	//결재자 아이디값 세팅(현재 로그인중인 사람)
	if(confirm(`${sgnResult == 0 ? '반려' : '결재'}하시겠습니까?`)){
		const approverNo = document.querySelector('.login-id').value;
		const sgnComent = document.querySelector('.sgnComent').value;
		const docType = document.querySelector('.docType').value;
		//ajax start
		$.ajax({
			url: '/sign/updateSignResultAjax', //요청경로
			type: 'post',
			async: true, //동기/비동기
			//contentType: 'application/json; charset=UTF-8',
			//contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {'sgnResult':sgnResult, 'approverNo':approverNo, 'docNo':docNo, 'sgnComent':sgnComent, 'docType':docType}, //필요한 데이터
			success: function(result) {
					alert(`${sgnResult == 0 ? '반려' : '결재'}되었습니다.`);
					//modal.hide();
					location.href='/sign/signMain'
			},
			error: function() {
				alert('실패');
			}
		});
		//ajax end
	}
}


//===========이벤트================

