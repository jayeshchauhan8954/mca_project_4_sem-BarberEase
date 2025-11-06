# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to **security@barberease.com**

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

### What to Include

Please include the following information:

- Type of vulnerability
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the vulnerability
- Suggested fix (if any)

### Response Process

1. **Acknowledge receipt** within 48 hours
2. **Investigate and validate** the vulnerability (1-7 days)
3. **Develop and test a fix** (1-14 days)
4. **Release a security patch** and notify reporters
5. **Publish security advisory** on GitHub

---

## Security Measures

### Authentication & Authorization

#### JWT Token Security
- **Algorithm**: HS256 with strong secret key
- **Expiration**: 24 hours (configurable)
- **Token Storage**: Secure HTTP-only cookies (recommended) or localStorage
- **Refresh Tokens**: Implemented with rotation mechanism

#### Password Security
- **Hashing**: BCrypt with salt rounds of 10
- **Minimum Length**: 6 characters (recommend 8+)
- **Complexity**: Encourage special characters, numbers, uppercase
- **Reset**: Secure password reset with time-limited tokens

#### Role-Based Access Control (RBAC)
- Four distinct roles: ADMIN, SHOP_OWNER, STAFF, CUSTOMER
- Method-level security with `@PreAuthorize`
- Resource-level authorization checks

### Data Protection

#### In Transit
- **HTTPS**: All production traffic encrypted with TLS 1.2+
- **Certificate**: Let's Encrypt or commercial SSL certificate
- **HSTS**: HTTP Strict Transport Security enabled

#### At Rest
- **Database**: MongoDB authentication enabled
- **Passwords**: BCrypt hashed, never stored in plain text
- **Sensitive Data**: Payment info not stored (only transaction IDs)
- **Backups**: Encrypted database backups

### Input Validation

- **Backend Validation**: Jakarta Validation (JSR-380)
- **Frontend Validation**: React Hook Form with Yup/Zod schemas
- **Sanitization**: All user inputs sanitized
- **SQL Injection**: N/A (NoSQL database)
- **NoSQL Injection**: Parameterized queries only

### API Security

#### Rate Limiting
```yaml
# Recommended configuration
rate-limit:
  enabled: true
  requests-per-minute: 100
  requests-per-hour: 1000
```

#### CORS Configuration
```yaml
cors:
  allowed-origins: 
    - https://yourproductiondomain.com
  allowed-methods: GET,POST,PUT,DELETE,OPTIONS
  allowed-headers: "*"
  allow-credentials: true
```

#### Security Headers
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
Referrer-Policy: strict-origin-when-cross-origin
```

### External Service Security

#### Payment Gateway (Razorpay)
- **Webhook Signature**: Verified for all webhooks
- **API Keys**: Stored in environment variables only
- **PCI Compliance**: No card data stored on our servers
- **Transaction Logs**: Securely logged and monitored

#### Email Service
- **Credentials**: App passwords, never actual passwords
- **TLS**: Enabled for SMTP connections
- **Rate Limiting**: Prevent email flooding

#### WhatsApp (Twilio)
- **API Credentials**: Environment variables only
- **Webhook Verification**: Signature validation
- **Message Templates**: Pre-approved templates only

---

## Security Best Practices

### For Developers

1. **Never commit secrets**
   - Use `.env` files (add to `.gitignore`)
   - Use environment variables
   - Rotate keys regularly

2. **Validate all inputs**
   - Backend validation is mandatory
   - Frontend validation for UX
   - Sanitize HTML inputs

3. **Use parameterized queries**
   - Always use Spring Data repositories
   - Never concatenate user input in queries

4. **Implement proper error handling**
   - Don't expose stack traces to users
   - Log errors securely
   - Return generic error messages

5. **Keep dependencies updated**
   ```bash
   # Check for vulnerabilities
   mvn dependency-check:check
   npm audit
   ```

### For System Administrators

1. **Use strong passwords**
   - Minimum 12 characters
   - Mix of uppercase, lowercase, numbers, symbols
   - Use password manager

2. **Enable 2FA** for admin accounts

3. **Regular backups**
   - Daily MongoDB backups
   - Encrypted backup storage
   - Test restore procedures

4. **Monitor logs**
   - Set up alerts for suspicious activities
   - Regular log reviews
   - Use centralized logging (ELK Stack)

5. **Update regularly**
   - Apply security patches promptly
   - Keep all services updated
   - Subscribe to security advisories

### For Shop Owners

1. **Protect your account**
   - Use strong, unique password
   - Don't share credentials
   - Log out after use

2. **Verify payments**
   - Check payment confirmations
   - Monitor transaction history
   - Report suspicious activities

3. **Staff access control**
   - Revoke access for former employees
   - Use principle of least privilege
   - Regular access audits

---

## Compliance

### GDPR Compliance (EU)

For European users:
- **Right to Access**: Users can download their data
- **Right to Deletion**: Users can request account deletion
- **Data Minimization**: Collect only necessary data
- **Consent**: Explicit consent for marketing communications

### Data Retention

- **User Data**: Retained while account is active
- **Booking History**: Retained for 3 years
- **Payment Records**: Retained for 7 years (tax purposes)
- **Logs**: Retained for 90 days

### Privacy

- **Privacy Policy**: Clear privacy policy displayed
- **Cookie Consent**: GDPR-compliant cookie banner
- **Third-party Sharing**: Minimal, only necessary services
- **Data Export**: Users can export their data

---

## Security Audit Checklist

### Monthly Checks
- [ ] Review access logs for anomalies
- [ ] Check for failed login attempts
- [ ] Review user permissions
- [ ] Update dependencies
- [ ] Test backup and restore
- [ ] Review security alerts

### Quarterly Checks
- [ ] Penetration testing
- [ ] Code security review
- [ ] Update SSL certificates (if needed)
- [ ] Security training for team
- [ ] Incident response drill
- [ ] Third-party service audit

### Annual Checks
- [ ] Comprehensive security audit
- [ ] Update security policies
- [ ] Review and update encryption
- [ ] Disaster recovery test
- [ ] Compliance review
- [ ] Security infrastructure upgrade

---

## Known Security Considerations

### Current Limitations

1. **Session Management**: JWT tokens don't support logout (tokens valid until expiration)
   - **Mitigation**: Use short expiration times (24 hours)
   - **Future**: Implement token blacklisting with Redis

2. **Rate Limiting**: Not fully implemented
   - **Status**: Planned for v1.1
   - **Mitigation**: Use CloudFlare or API Gateway

3. **File Upload**: Limited validation
   - **Status**: Not fully implemented
   - **Mitigation**: Use whitelist for file types, scan for malware

### Recommended Enhancements

1. Implement refresh token mechanism
2. Add Redis-based rate limiting
3. Implement CAPTCHA for registration
4. Add IP-based access controls
5. Implement account lockout after failed attempts
6. Add security monitoring dashboard

---

## Incident Response Plan

### In Case of Security Breach

1. **Immediate Actions** (0-1 hour)
   - Contain the breach
   - Disable affected accounts
   - Notify security team
   - Begin investigation

2. **Short-term Actions** (1-24 hours)
   - Assess impact and scope
   - Notify affected users
   - Apply emergency patches
   - Document incident

3. **Long-term Actions** (1-7 days)
   - Conduct thorough investigation
   - Implement permanent fixes
   - Update security measures
   - Publish post-mortem (if applicable)

### Contact Information

- **Security Team**: security@barberease.com
- **Emergency**: +1-XXX-XXX-XXXX (24/7)

---

## Security Updates

Stay informed about security updates:

- **Security Advisories**: [GitHub Security Advisories](https://github.com/your-repo/security/advisories)
- **Mailing List**: Subscribe to security@barberease.com
- **Release Notes**: Check CHANGELOG.md for security fixes

---

## Hall of Fame

We recognize security researchers who help keep BarberEase secure:

| Researcher | Vulnerability | Severity | Date |
|------------|--------------|----------|------|
| - | - | - | - |

---

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Spring Security Documentation](https://spring.io/projects/spring-security)
- [MongoDB Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist/)
- [React Security Best Practices](https://react.dev/learn/thinking-in-react)

---

**Last Updated**: November 2024  
**Next Review**: December 2024

