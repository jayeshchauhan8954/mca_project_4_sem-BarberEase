package com.barberease.controller;

import com.barberease.model.Staff;
import com.barberease.service.StaffService;
import com.barberease.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/owner")
@CrossOrigin(origins = "*")
public class StaffController {
    
    @Autowired
    private StaffService staffService;
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/shops/{shopId}/staff")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SHOP_OWNER')")
    public ResponseEntity<Staff> createStaff(@PathVariable String shopId, @Valid @RequestBody Staff staff) {
        Staff createdStaff = staffService.createStaff(staff, shopId);
        return ResponseEntity.ok(createdStaff);
    }
    
    @GetMapping("/shops/{shopId}/staff")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SHOP_OWNER')")
    public ResponseEntity<List<Staff>> getStaffByShop(@PathVariable String shopId) {
        List<Staff> staff = staffService.getStaffByShop(shopId);
        return ResponseEntity.ok(staff);
    }
    
    @GetMapping("/staff/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SHOP_OWNER') or hasRole('STAFF')")
    public ResponseEntity<Staff> getStaff(@PathVariable String id) {
        Staff staff = staffService.getStaffById(id);
        return ResponseEntity.ok(staff);
    }
    
    @PutMapping("/staff/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SHOP_OWNER') or hasRole('STAFF')")
    public ResponseEntity<Staff> updateStaff(@PathVariable String id, @Valid @RequestBody Staff staff) {
        Staff updatedStaff = staffService.updateStaff(id, staff);
        return ResponseEntity.ok(updatedStaff);
    }
    
    @DeleteMapping("/staff/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SHOP_OWNER')")
    public ResponseEntity<Void> deleteStaff(@PathVariable String id) {
        staffService.deleteStaff(id);
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/staff/{id}/availability")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SHOP_OWNER') or hasRole('STAFF')")
    public ResponseEntity<Staff> updateAvailability(@PathVariable String id, @RequestBody Staff staff) {
        Staff updatedStaff = staffService.updateAvailability(id, staff.getAvailability());
        return ResponseEntity.ok(updatedStaff);
    }
}

