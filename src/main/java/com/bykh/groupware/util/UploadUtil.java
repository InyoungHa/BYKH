package com.bykh.groupware.util;

import java.io.File;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.bykh.groupware.notice.vo.BoardFileVO;

public class UploadUtil {

	//단일 파일 업로드 메소드
	public static BoardFileVO fileUpload(MultipartFile boardFile) {
		//반환할 파일 객체 생성
		BoardFileVO boardFileVO = null;
		
		if(!boardFile.isEmpty()) {
			boardFileVO = new BoardFileVO();
			
			//원본 파일명
			String originFileName = boardFile.getOriginalFilename();
			
			//서버에 올라갈 파일명 생성(랜덤한 문자열 생성)
			String uuid = UUID.randomUUID().toString();
			
			//첨부된 파일의 확장자 추출
			int index = originFileName.lastIndexOf(".");
			String extension = originFileName.substring(index);
			
			//첨부될 파일명
			String attachedFileName = uuid + extension;
			
			//파일 사이즈
			long fileSize = boardFile.getSize();
			String fileFancySize = fancySize(fileSize);
			
			
			//파일 업로드
			try {
				File file = new File(ConstVariable.BOARD_UPLOAD_PATH + attachedFileName);
				boardFile.transferTo(file);
				
				boardFileVO.setOriginFileName(originFileName);
				boardFileVO.setAttachedFileName(attachedFileName);
				boardFileVO.setFileSize(fileFancySize);
			} catch (Exception e) {
				e.printStackTrace();
			}
			
		}
		
		return boardFileVO;
	}
	
	
	//다중 파일 업로드 메소드
	public static List<BoardFileVO> multiFileUpload(MultipartFile[] boardFiles) {
		List<BoardFileVO> boardFileVOList = new ArrayList<>();
		
		for(MultipartFile boardFile : boardFiles) {
		  	BoardFileVO vo = fileUpload(boardFile);
			boardFileVOList.add(vo);
		}
		
		return boardFileVOList;
	}
	
	private static DecimalFormat df = new DecimalFormat("#,###.0");

	private static String fancySize(long size) {
		if (size < 1024) { // 1k 미만
			return size + " Bytes";
		} else if (size < (1024 * 1024)) { // 1M 미만
			return df.format(size / 1024.0) + " KB";
		} else if (size < (1024 * 1024 * 1024)) { // 1G 미만
			return df.format(size / (1024.0 * 1024.0)) + " MB";
		} else {
			return df.format(size / (1024.0 * 1024.0 * 1024.0)) + " GB";
		}
	}
	
	
	
	
}
