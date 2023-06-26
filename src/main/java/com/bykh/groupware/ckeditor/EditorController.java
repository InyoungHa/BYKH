package com.bykh.groupware.ckeditor;

import java.io.File;
import java.util.UUID;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.bykh.groupware.util.ConstVariable;

@Controller
@RequestMapping("/editor")
public class EditorController {
	
	//본문 이미지 등록
	@ResponseBody
	@PostMapping("/imgUploadAjax")
	public ModelAndView imgUpload(MultipartHttpServletRequest request) throws Exception {
		// ckeditor는 이미지 업로드 후 이미지 표시하기 위해 uploaded 와 url을 json 형식으로 받아야 함
		// modelandview를 사용하여 json 형식으로 보내기위해 모델앤뷰 생성자 매개변수로 jsonView 라고 써줌
		// jsonView 라고 쓴다고 무조건 json 형식으로 가는건 아니고 @Configuration 어노테이션을 단 
		// WebConfig 파일에 MappingJackson2JsonView 객체를 리턴하는 jsonView 매서드를 만들어서 bean으로 등록해야 함 
		ModelAndView mav = new ModelAndView("jsonView");

		// ckeditor 에서 파일을 보낼 때 upload : [파일] 형식으로 해서 넘어오기 때문에 upload라는 키의 밸류를 받아서 uploadFile에 저장함
		MultipartFile uploadFile = request.getFile("upload");
		
		//원본 파일명
		String originFileName = uploadFile.getOriginalFilename();
		
		//서버에 올라갈 파일명 생성(랜덤한 문자열 생성)
		String uuid = UUID.randomUUID().toString();
		
		//첨부된 파일의 확장자 추출
		int index = originFileName.lastIndexOf(".");
		String extension = originFileName.substring(index);
		
		//첨부될 파일명
		String attachedFileName = uuid + extension;
		
		//파일 업로드
		try {
			
			File file = new File(ConstVariable.IMG_PATH + attachedFileName);
			uploadFile.transferTo(file);

		} catch (Exception e) {
			e.printStackTrace();
		}
		
		// uploaded, url 값을 modelandview를 통해 보냄
		mav.addObject("uploaded", true); // 업로드 완료
		mav.addObject("url", "/upload/image/" + attachedFileName); // 업로드 파일의 경로
		System.out.println(mav.toString());

		return mav;
	}
	

}
