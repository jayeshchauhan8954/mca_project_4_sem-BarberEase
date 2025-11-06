package com.barberease.service;

import com.barberease.model.Staff;
import com.barberease.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class StaffService {
    
    @Autowired
    private StaffRepository staffRepository;
    
    public Staff createStaff(Staff staff, String shopId) {
        staff.setShopId(shopId);
        staff.setCreatedAt(LocalDateTime.now());
        staff.setUpdatedAt(LocalDateTime.now());
        return staffRepository.save(staff);
    }
    
    public List<Staff> getStaffByShop(String shopId) {
        return staffRepository.findByShopIdAndActive(shopId, true);
    }
    
    public Staff getStaffById(String id) {
        return staffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Staff not found with id: " + id));
    }
    
    public Staff updateStaff(String id, Staff staffDetails) {
        Staff staff = getStaffById(id);
        
        staff.setName(staffDetails.getName());
        staff.setPhone(staffDetails.getPhone());
        staff.setEmail(staffDetails.getEmail());
        staff.setSpecialization(staffDetails.getSpecialization());
        staff.setProfileImage(staffDetails.getProfileImage());
        staff.setServiceIds(staffDetails.getServiceIds());
        staff.setUpdatedAt(LocalDateTime.now());
        
        return staffRepository.save(staff);
    }
    
    public Staff updateAvailability(String id, Map<String, List<Staff.TimeSlot>> availability) {
        Staff staff = getStaffById(id);
        staff.setAvailability(availability);
        staff.setUpdatedAt(LocalDateTime.now());
        return staffRepository.save(staff);
    }
    
    public void deleteStaff(String id) {
        Staff staff = getStaffById(id);
        staff.setActive(false);
        staff.setUpdatedAt(LocalDateTime.now());
        staffRepository.save(staff);
    }
}

