//CKEditor 설정
let editor;
    
ClassicEditor
	.create( document.querySelector( '#boardContent' ), {
		ckfinder: {
			uploadUrl : '/editor/imgUploadAjax'
		},
    	language: "ko",
    	toolbar : {
			items : ['undo',
					'redo', 
					'|',
					'heading', 
					'|',
					'bold', 
					'italic', 
					'indent', 
					'outdent',
					'|',
					'numberedList', 
					'bulletedList', 
					'|',
					'blockQuote', 
					'insertTable',
					'link',
					'imageUpload'
					]
		}
  	} )
	.then( newEditor => {
		editor = newEditor;
		//이미지 업로드 시 이벤트
    	editor.plugins.get( 'FileRepository' ).on( 'change:uploaded', evt => {
			console.log( 'Image uploaded!' );
			
			//타임 딜레이 + 리로드
			setTimeout(function() {
			  	const images = document.querySelector('.ck-editor__main').querySelectorAll('img');
				for(const img of images) {
					img.src = img.src;					
				}
			}, 2000);
		} );
	} )
  	.catch( error => {
        console.error( error );
    } );
    
//정상 글 등록
function updateArchive() {
	if(!formCheck()) {
		return false;
	}
	else {
		document.querySelector('#archiveUpdateForm').submit();
	}
}


//제목, 내용, 파일 첨부 유효성 체크
function formCheck() {
	const boardTitle = document.querySelector('#boardTitle').value;
	const boardContent = editor.getData();
	const fileInputList = document.querySelectorAll('#fileInput');

	
	if(boardTitle == '' || boardTitle == null) {
		alert('제목을 입력해주세요.')
		return false;
	};
	
	if(boardContent == '' || boardContent == null) {
		alert('내용을 입력해주세요.')
		return false;
	};
		
	if(fileInputList.length != 0) {
		for(const fileInput of fileInputList) {
			if(fileInput.value == '' || fileInput.value == null) {
				alert('파일을 첨부해주세요.');
				return false;
			}
		}
	}
	
	return true;
}

//파일 추가 버튼
function addFileInputDiv(buttonTag) {
	const fileTd = buttonTag.parentElement;
	
	let str = '';
	str += `<div class="input-group my-2">                                              `;
	str += `	<input class="form-control form-control-sm" type="file" name="files" id="fileInput">                   `;
	str += `	<button class="btn btn-outline-secondary btn-sm" type="button" onclick="deleteFileInputDiv(this);">삭제</button>`;
	str += `</div>                                                                      `;
	
	fileTd.insertAdjacentHTML('beforeend', str);
};

//파일 태그 삭제 버튼
function deleteFileInputDiv(deleteBtn) {
	const fileInputDiv = deleteBtn.parentElement;
	
	fileInputDiv.remove();
};


//첨부된 파일 삭제 버튼
function deleteAttachedFile(fileNum, attachedFileBtn) {
	if(confirm('해당 파일을 삭제하시겠습니까?')) {
		const hiddenDiv = document.querySelector('#hiddenDiv');
		
		const str = `<input type="hidden" name="deleteFileNum" value="${fileNum}">`;
		hiddenDiv.insertAdjacentHTML('beforeend', str);
	
		const attachedFileDiv = attachedFileBtn.parentElement;
		attachedFileDiv.remove();
	}
};