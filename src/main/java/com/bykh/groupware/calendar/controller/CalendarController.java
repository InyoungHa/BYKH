package com.bykh.groupware.calendar.controller;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bykh.groupware.calendar.service.CalendarService;
import com.bykh.groupware.calendar.vo.CalendarVO;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/calendar")
public class CalendarController {
    @Resource(name = "calendarService")
    private CalendarService calendarService;

    //캘린더 인서트
    @ResponseBody
    @RequestMapping("/calendarSave")
    public void calendarSaveAjax(@RequestBody List<CalendarVO> calendarVOs) {
    	
        for (CalendarVO calendarVO : calendarVOs) {
            calendarService.insertSchedule(calendarVO);
        }
       
    }
    
    // 캘린더 조회
    @ResponseBody
    @RequestMapping("/calendarLoad")
    public List<CalendarVO> calendarLoadAjax() {
        return calendarService.getAllSchedules();
    }

}
    
    
    
    






