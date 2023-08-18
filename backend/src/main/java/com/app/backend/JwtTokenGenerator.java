package com.app.backend;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenGenerator {

    @Value("${luma.app.jwtSecret}}")
    private String secretKey;

    public String generateToken(String subject) {
        
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
    
        return Jwts
            .builder()
            .setSubject(subject)
            .signWith(Keys.hmacShaKeyFor(keyBytes), SignatureAlgorithm.HS256)
            .compact();

    }
}

