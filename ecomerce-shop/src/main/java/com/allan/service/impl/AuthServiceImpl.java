package com.allan.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.allan.config.JwtProvider;
import com.allan.domain.USER_ROLE;
import com.allan.model.Cart;
import com.allan.model.Seller;
import com.allan.model.User;
import com.allan.model.VerificationCode;
import com.allan.repository.CartRepository;
import com.allan.repository.SellerRepository;
import com.allan.repository.UserRepository;
import com.allan.repository.VerificationCodeRepository;
import com.allan.request.LoginRequest;
import com.allan.response.AuthResponse;
import com.allan.response.SignupRequest;
import com.allan.service.AuthService;
import com.allan.service.EmailService;
import com.allan.utils.OtpUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CartRepository cartRepository;
    private final JwtProvider jwtProvider;
    private final VerificationCodeRepository verificationCodeRepository;
    private final EmailService emailService;
    private final CustomUserServiceImpl customUserService;
    // sellerRepo
    private final SellerRepository sellerRepository;

    @Override
    public String createUser(SignupRequest req) throws Exception {
        // Check if the verificationcode already exists
        VerificationCode verificationCode = verificationCodeRepository.findByEmail(req.getEmail());
        if (verificationCode == null || !verificationCode.getOtp().equals(req.getOtp())) {
            throw new Exception("Verification code (otp) not found for email: " + req.getEmail());
        }

        User user = userRepository.findByEmail(req.getEmail());
        if (user == null) {
            User createdUser = new User();
            createdUser.setEmail(req.getEmail());
            createdUser.setFullName(req.getFullName());
            createdUser.setRole(USER_ROLE.ROLE_CUSTOMER);
            createdUser.setMobile("0720060210");
            createdUser.setPassword(passwordEncoder.encode(req.getOtp()));

            user = userRepository.save(createdUser);

            Cart cart = new Cart();
            cart.setUser(user);
            cartRepository.save(cart);
        }

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(USER_ROLE.ROLE_CUSTOMER.toString()));

        Authentication authentication = new UsernamePasswordAuthenticationToken(req.getEmail(), null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtProvider.generateToken(authentication);
    }

    @Override
    public void sentLoginOtp(String email, USER_ROLE role) throws Exception {

        String SIGNING_PREFIX = "signing_";

        if (email.startsWith(SIGNING_PREFIX)) {
            email = email.substring(SIGNING_PREFIX.length());

            if (role.equals(USER_ROLE.ROLE_SELLER)) {

                Seller seller = sellerRepository.findByEmail(email);
                if (seller == null) {
                    throw new Exception("user with provided email not found");
                }

            } else {
                User user = userRepository.findByEmail(email);
                if (user == null) {
                    throw new Exception("User not found with email: " + email);
                }
            }

        }
        VerificationCode isExist = verificationCodeRepository.findByEmail(email);
        if (isExist != null) {
            verificationCodeRepository.delete(isExist);
        }
        String otp = OtpUtil.generateOtp();
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setOtp(otp);
        verificationCode.setEmail(email);

        // save into database
        verificationCodeRepository.save(verificationCode);

        String subject = "Huru Login/Signup otp";
        String text = "Your Login/Signup otp is : " + otp + "\n" +
                "Please do not share this otp with anyone.";
        emailService.sendVerificationOtpEmail(email, otp, subject, text);

    }

    @Override
    public AuthResponse signing(LoginRequest req) throws Exception {
        String username = req.getEmail();
        String otp = req.getOtp();

        Authentication authentication = authenticate(username, otp);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Login Successeful");

        // getting role or access authorities
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String roleName = authorities.isEmpty()
                ? null
                : authorities
                        .iterator()
                        .next()
                        .getAuthority();
        authResponse.setRole(USER_ROLE.valueOf(roleName));
        return authResponse;
    }

    private Authentication authenticate(String username, String otp) throws Exception {
        UserDetails userDetails = customUserService.loadUserByUsername(username);

        String SELLER_PREFIX = "seller_";
        if (username.startsWith(SELLER_PREFIX)) {
            username = username.substring(SELLER_PREFIX.length());

            Seller seller = sellerRepository.findByEmail(username);
            if (seller == null) {
                throw new Exception("user with provided email not found");
            }

        }

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username ");
        }
        VerificationCode verificationCode = verificationCodeRepository.findByEmail(username);

        if (verificationCode == null || !verificationCode.getOtp().equals(otp)) {
            throw new Exception("Otp does not match");
        }
        return new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities());
    }

}
