package com.bykh.groupware.notice.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.bykh.groupware.notice.service.NoticeService;
import com.bykh.groupware.notice.vo.BoardFileVO;
import com.bykh.groupware.notice.vo.BoardVO;
import com.bykh.groupware.util.UploadUtil;

import jakarta.annotation.Resource;


//공지사항 게시판
@Controller
@RequestMapping("/notice")
public class NoticeController {
	@Resource(name = "noticeService")
	private NoticeService noticeService;
	
	//게시판 목록
	@GetMapping("/list")
	public String noticeList(Model model) {
		//전체 글 목록 조회
		model.addAttribute("noticeList", noticeService.getNoticeList());
		
		//중요글 목록 조회
		model.addAttribute("noticeImportantList", noticeService.getNoticeImportantList());
		
		return "content/notice/notice_list";
	}
	
	//글쓰기 페이지 이동
	@GetMapping("/regNotice")
	public String regForm() {
		
		return "content/notice/notice_form";
	}
	
	//글 등록
	@PostMapping("/regNotice")
	public String regNotice(BoardVO boardVO, MultipartFile[] files) {
		// 글 등록
		String boardNum = noticeService.getNextBoardNum();
		boardVO.setBoardNum(boardNum);
		
		// 첨부파일
		if(files != null) {
			List<BoardFileVO> attachedBoardFileList = UploadUtil.multiFileUpload(files);
			
			// 첨부파일 등록 쿼리 실행 시 빈 값을 채워줄 데이터를 저장할 리스트에 boardNum 데이터 추가
			for(BoardFileVO boardfile : attachedBoardFileList) {
				boardfile.setBoardNum(boardNum);
			}
			
			// boardVO에 리스트 set
			boardVO.setBoardFileList(attachedBoardFileList);
		}

		noticeService.regNotice(boardVO);
		
		return "redirect:/notice/list";
	}
	
	//글 상세 조회
	@GetMapping("/detail")
	public String noticeDetail(BoardVO boardVO, Model model) {
		//상세 조회 + 조회수 증가
		model.addAttribute("notice", noticeService.getNoticeDetail(boardVO));
		
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
	public String noticeForm(BoardVO boardVO, Model model) {
		model.addAttribute("notice", noticeService.getNoticeDetail(boardVO));
		
		return "content/notice/notice_update";
	}
	
	//글 수정
	@PostMapping("/update")
	public String noticeUpdate(BoardVO boardVO) {
		//중요글 체크 해제 시 null값 체크
		if(boardVO.getIsImportant() == null) {
			boardVO.setIsImportant("N");
		}
		
		noticeService.updateBoard(boardVO);
		
		return "redirect:/notice/detail?boardNum=" + boardVO.getBoardNum();
	}
	
	
}
