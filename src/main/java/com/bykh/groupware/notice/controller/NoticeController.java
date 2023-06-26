package com.bykh.groupware.notice.controller;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.bykh.groupware.notice.service.NoticeService;
import com.bykh.groupware.notice.vo.BoardFileVO;
import com.bykh.groupware.notice.vo.BoardMenuVO;
import com.bykh.groupware.notice.vo.BoardVO;
import com.bykh.groupware.util.ConstVariable;
import com.bykh.groupware.util.UploadUtil;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletResponse;


//공지사항 게시판
@Controller
@RequestMapping("/notice")
public class NoticeController {
	@Resource(name = "noticeService")
	private NoticeService noticeService;
	
	//게시판 목록
	@GetMapping("/list")
	public String noticeList(Model model, BoardVO boardVO) {
		BoardMenuVO boardMenuVO = new BoardMenuVO();
		boardMenuVO.setBoardMenuCode("BOARD_MENU_002");
		
		boardVO.setBoardMenuVO(boardMenuVO);
		
		//전체 데이터 수
		boardVO.setTotalDataCnt(noticeService.getBoardCnt(boardVO));
		
		//페이지 정보 세팅
		boardVO.setPageInfo();
		
		//전체 글 목록 조회
		model.addAttribute("noticeList", noticeService.getBoardList(boardVO));
		
		//중요글 목록 조회
		model.addAttribute("noticeImportantList", noticeService.getBoardImportantList(boardVO));

		
		return "content/notice/notice_list";
	}
	
	//글쓰기 페이지 이동
	@GetMapping("/regForm")
	public String regForm(Model model, Authentication authentication) {
		String boardMenuCode = "BOARD_MENU_002";
		model.addAttribute("boardMenuCode", boardMenuCode);
		
		User user = (User) authentication.getPrincipal();
		int loginEmpno = Integer.parseInt(user.getUsername());
		
		Map<String, Object> dataMap = new HashMap<>();
		dataMap.put("boardMenuCode", boardMenuCode);
		dataMap.put("empno", loginEmpno);
		
		model.addAttribute("tempBoardCnt", noticeService.getTempBoardCntByEmpno(dataMap));
		
		return "content/notice/notice_form";
	}
	
	//글 신규 등록
	@PostMapping("/regNotice")
	public String regNotice(BoardVO boardVO, String[] deleteFileNum, MultipartFile[] files, Authentication authentication) {
		User user = (User) authentication.getPrincipal();
		int loginEmpno = Integer.parseInt(user.getUsername());
		
		boardVO.setBoardWriter(loginEmpno);
		
		if(boardVO.getBoardNum() == null) { //신규 등록
			regBoard(boardVO, files);
		}
		else { // 임시저장하고 등록
			//상태값 변경
			boardVO.setBoardStatus(1);
			boardVO.setBoardDate("CURRENT_DATE");
			
			updateBoard(boardVO, deleteFileNum, files);			
		}
		
		return "redirect:/notice/list";
	}
	
	//글 임시 저장
	@ResponseBody
	@PostMapping("/tempRegNoticeAjax")
	public BoardVO tempRegNotice(BoardVO boardVO, String[] deleteFileNum, MultipartFile[] files, Authentication authentication) {
		User user = (User) authentication.getPrincipal();
		int loginEmpno = Integer.parseInt(user.getUsername());
		
		boardVO.setBoardWriter(loginEmpno);
		
		//가져온 정보에서 글 번호가 없을 때
		if (boardVO.getBoardNum() == null) { //새로운 임시 글 등록
			//글 등록 쿼리
			regBoard(boardVO, files);
		}
		else { //같은 임시글 저장
			boardVO.setBoardDate("CURRENT_DATE");
			updateBoard(boardVO, deleteFileNum, files);
		}
		
		return boardVO; //매개변수로 객체(참조변수)를 전달하면 주소값을 보낸거니까 다시 받아오지 않아도 됨.
	}
	
	//임시저장함 조회
	@ResponseBody
	@PostMapping("/tempBoardListAjax")
	public List<BoardVO> tempBoardList(Authentication authentication) {
		String boardMenuCode = "BOARD_MENU_002";
		
		User user = (User) authentication.getPrincipal();
		int loginEmpno = Integer.parseInt(user.getUsername());

		Map<String, Object> dataMap = new HashMap<>();
		dataMap.put("boardMenuCode", boardMenuCode);
		dataMap.put("empno", loginEmpno);
		
		return noticeService.getTempBoardListByEmpno(dataMap);
	}
	
	//임시저장 글 조회
	@ResponseBody
	@PostMapping("/getTempDetailAjax")
	public BoardVO getTempDetail(BoardVO boardVO) {
		return noticeService.getBoardDetailForUpdate(boardVO);
	}
	
	//임시저장 글 삭제
	@ResponseBody
	@PostMapping("/tempDeleteAjax")
	public void deleteTempBoard(BoardVO boardVO) {
		noticeService.deleteBoard(boardVO);
	}
	
	//글 상세 조회
	@GetMapping("/detail")
	public String noticeDetail(BoardVO boardVO, Model model) {
		//상세 조회 + 조회수 증가 (글 + 첨부파일 + 댓글)
		model.addAttribute("notice", noticeService.getBoardDetail(boardVO));
		
		return "content/notice/notice_detail";
	}
	
	//글 삭제
	@GetMapping("/delete")
	public String deleteNotice(BoardVO boardVO) {
		noticeService.deleteBoard(boardVO);
		
		return "redirect:/notice/list";
	}
	
	//글 수정 페이지로 이동
	@GetMapping("/update")
	public String updateForm(BoardVO boardVO, Model model) {
		model.addAttribute("notice", noticeService.getBoardDetailForUpdate(boardVO));
		
		return "content/notice/notice_update";
	}
	
	//글 수정
	@PostMapping("/update")
	public String noticeUpdate(BoardVO boardVO, String[] deleteFileNum, MultipartFile[] files) {
		
		updateBoard(boardVO, deleteFileNum, files);
		
		return "redirect:/notice/detail?boardNum=" + boardVO.getBoardNum();
	}

	//첨부파일 다운로드
	@GetMapping("/download")
	public void fileDownload(String fileNum, HttpServletResponse response) {
		BoardFileVO downloadFile =  noticeService.getDownloadFileVO(fileNum);
		String attachedFileName = downloadFile.getAttachedFileName();
		String originFileName =  downloadFile.getOriginFileName();

		try {
			File file = new File(ConstVariable.FILE_PATH + attachedFileName);
			
			byte[] fileByte = Files.readAllBytes(file.toPath());
			
			response.setContentType("application/octet-stream");
            response.setContentLength(fileByte.length);
            
            response.setHeader("Content-Disposition",
            		"attachment; fileName=\"" + URLEncoder.encode(originFileName, "UTF-8") + "\";");
            response.setHeader("Content-Transfer-Encoding", "binary");
			
			response.getOutputStream().write(fileByte);
			response.getOutputStream().flush();
			response.getOutputStream().close();
		}
		catch (IOException e) {
			e.printStackTrace();
		}
	}
	



	
	
	
	
	
	//글 등록을 위한 메소드(첨부파일 등록 + 쿼리 등록할 boardVO 반환)
	public void regBoard(BoardVO boardVO, MultipartFile[] files) {
		// 글 등록
		String boardNum = noticeService.getNextBoardNum();
		boardVO.setBoardNum(boardNum);
		
		// 첨부파일
		if(files != null) {
			List<BoardFileVO> attachedBoardFileList = regFile(boardNum, files);
			
			// boardVO에 리스트 set
			boardVO.setBoardFileList(attachedBoardFileList);
		}
		
		noticeService.regBoard(boardVO);
	}
	
	
	//글 수정 메소드
	public void updateBoard(BoardVO boardVO, String[] deleteFileNum, MultipartFile[] files) {
		//새로 추가된 첨부파일 처리
		if(files != null) {
			List<BoardFileVO> attachedBoardFileList = regFile(boardVO.getBoardNum(), files);
			
			// boardVO에 리스트 set
			boardVO.setBoardFileList(attachedBoardFileList);
		}
		
		//중요글 체크 해제 시 null값 체크
		if(boardVO.getIsImportant() == null) {
			boardVO.setIsImportant("N");
		}
		
		//비밀글 체크 해제 시 null 값 체크
		if(boardVO.getIsPrivate() == null) {
			boardVO.setIsPrivate("N");
		}
		
		noticeService.updateBoard(boardVO, deleteFileNum);
	}
	
	
	//파일 첨부 메소드
	public List<BoardFileVO> regFile(String boardNum, MultipartFile[] files) {
		List<BoardFileVO> attachedBoardFileList = UploadUtil.multiFileUpload(files);
		
		// 첨부파일 등록 쿼리 실행 시 빈 값을 채워줄 데이터를 저장할 리스트에 boardNum 데이터 추가
		for(BoardFileVO boardfile : attachedBoardFileList) {
			boardfile.setBoardNum(boardNum);
		}
		
		//다음으로 들어갈 첨부파일 번호 조회
		int nextFileNumber = noticeService.getNextFileNumber();
		
		//fileNum 세팅
		for(int i = 0; i < attachedBoardFileList.size(); i++) {
			BoardFileVO boardFile = attachedBoardFileList.get(i);
			String fileNumFormat = String.format("%03d", nextFileNumber + i);
			String nextFileNum = "FILE_" + fileNumFormat;
			
			boardFile.setFileNum(nextFileNum);
		}
		
		return attachedBoardFileList;
	}
	
	
	
	
	
}
