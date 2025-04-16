package com.allan.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.allan.domain.AccountStatus;
import com.allan.exceptions.SellerException;
import com.allan.model.Seller;
import com.allan.model.SellerReport;
import com.allan.model.VerificationCode;
import com.allan.repository.VerificationCodeRepository;
import com.allan.request.LoginRequest;
import com.allan.response.AuthResponse;
import com.allan.service.AuthService;
import com.allan.service.EmailService;
import com.allan.service.SellerReportService;
import com.allan.service.SellerService;
import com.allan.utils.OtpUtil;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sellers")
public class SellerController {

    private final EmailService emailService;
    private final AuthService authService;
    private final VerificationCodeRepository verificationCodeRepository;
    private final SellerService sellerService;
    private final SellerReportService sellerReportService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginSeller(@RequestBody LoginRequest req) throws Exception {

        // String otp = req.getOtp();
        String email = req.getEmail();

        req.setEmail("seller_" + email);
        AuthResponse authResponse = authService.signing(req);
        return ResponseEntity.ok(authResponse);
    }

    @PatchMapping("/verify/{otp}")
    public ResponseEntity<Seller> verifySellerEmail(@PathVariable String otp) throws Exception {

        VerificationCode verificationCode = verificationCodeRepository.findByOtp(otp);

        if (verificationCode == null || !verificationCode.getOtp().equals(otp)) {
            throw new Exception("Wrong Otp...");
        }

        Seller seller = sellerService.verifyEmail(verificationCode.getEmail(), otp);

        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Seller> createSeller(@RequestBody Seller seller) throws Exception {
        Seller savedSeller = sellerService.createSeller(seller);

        String otp = OtpUtil.generateOtp();

        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setOtp(otp);
        verificationCode.setEmail(seller.getEmail());
        verificationCodeRepository.save(verificationCode);

        String subject = "Huru Bazar Email Verification Cade";
        String text = "Welcome to Huru Bazar, Verify your account using this Link";
        String frontend_url = "http://localhost:3000/verify-seller";
        emailService.sendVerificationOtpEmail(seller.getEmail(), verificationCode.getOtp(), subject,
                text + frontend_url);

        return new ResponseEntity<>(savedSeller, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seller> getSellerById(@PathVariable Long id) throws SellerException {
        Seller seller = sellerService.getSellerbyId(id);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<Seller> getSellerByJwt(@RequestHeader("Authorization") String jwt) throws Exception {

        Seller seller = sellerService.getSellerProfile(jwt);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @GetMapping("/report")
    public ResponseEntity<SellerReport> getSellerReport(@RequestHeader("Authorization") String jwt) throws Exception {
        Seller seller = sellerService.getSellerProfile(jwt);
        SellerReport report = sellerReportService.getSellerReport(seller);
        return new ResponseEntity<>(report, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Seller>> getAllSellers(@RequestParam(required = false) AccountStatus status) {
        List<Seller> sellers = sellerService.getAllSellers(status);
        return ResponseEntity.ok(sellers);
    }

    @PatchMapping()
    public ResponseEntity<Seller> updateSeller(
            @RequestHeader("Authorization") String jwt,
            @RequestBody Seller seller) throws Exception {
        Seller profile = sellerService.getSellerProfile(jwt);
        Seller updatedSeller = sellerService.updatSeller(profile.getId(), seller);
        return ResponseEntity.ok(updatedSeller);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeller(@PathVariable Long id) throws Exception {
        sellerService.deleteSeller(id);
        return ResponseEntity.noContent().build();
    }

}
