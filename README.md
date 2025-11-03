# MediBand Website

A comprehensive website for the MediBand smart wristband project, created for DECA competition with a clean, professional design inspired by modern healthcare technology interfaces.

## Password Protection

This website is now protected with JavaScript-based authentication for security.

### Access Information
- **Password**: `mediband2025`
- **Session Duration**: 24 hours
- **Max Attempts**: 3 (with 15-minute lockout)

### Developer Access
- Add `?skip_auth=true` to URL for development bypass
- Authentication auto-disabled on localhost/127.0.0.1
- Change password in `auth.js` (CONFIG.password)

### Authentication Features
- Session-based authentication with localStorage
- Failed attempt tracking and lockout protection
- Manual logout: `medibandLogout()`
- Session extension: `medibandExtendSession()`

## About MediBand

MediBand is a smart wristband that combines medical emergency data, health tracking, and personalized condition management in one inclusive device. Designed for all users, especially those with chronic conditions or accessibility needs.

### Key Features

- **Emergency Scan**: EMTs or bystanders can scan the band using QR or NFC to access critical medical information
- **Health Tracking**: Monitors heart rate, oxygen levels, glucose (if applicable), and hydration
- **Smart Reminders**: Custom alerts for medication, water intake, and activity levels
- **AI Predictions**: Learns user patterns to detect early signs of danger
- **App Integration**: Connects with mobile app for progress logs and data sharing
- **Offline Functionality**: Emergency data accessible without internet connection

### Product Variants

1. **MediBand Core** ($100) - Basic health tracking and emergency preparedness
2. **MediBand Care** ($125) - Specialized for chronic conditions like diabetes and asthma
3. **MediBand Sense** ($150) - Accessibility-focused with voice and vibration alerts
4. **MediBand Link** ($135) - Community safety model with local emergency integration
5. **MediBand Kids** ($110) - Child-friendly design with parental controls

### Accessibility Features

MediBand is designed with comprehensive accessibility features:

- Voice feedback and haptic alerts for visually impaired users
- Adjustable brightness, sound, and vibration modes
- Easy-to-read app interface for all ages
- Braille integration and large button interfaces
- Full compliance with accessibility standards (Section 508, WCAG 2.1 AA, ADA)

## Website Structure

- **index.html** - Homepage with hero section, features overview, and trust anchor
- **features.html** - Detailed feature breakdown with clean card layout
- **variants.html** - Complete product variant comparison and details
- **pricing.html** - Comprehensive pricing information and subscription options
- **accessibility.html** - Detailed accessibility features and inclusivity information
- **contact.html** - Contact forms and support information
- **style.css** - Clean, modern CSS styling inspired by healthcare technology interfaces
- **script.js** - JavaScript functionality for interactive features

## Design Features

- **Clean, Modern Design**: Minimalist interface inspired by medical technology
- **Professional Typography**: System fonts for optimal readability
- **Subtle Color Palette**: Professional blues and grays with red accent for CTAs
- **Card-Based Layout**: Clean, organized information presentation
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: High contrast, keyboard navigation, screen reader compatible
- **Interactive Elements**: Subtle hover effects and smooth transitions

## Technology Stack

- **HTML5**: Semantic markup and modern structure
- **CSS3**: Modern styling with Flexbox and Grid layouts
- **JavaScript**: Interactive functionality and form handling
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: WCAG 2.1 AA compliant design

## Color Scheme

- **Primary Blue**: #4169e1 (Professional medical blue)
- **Red Accent**: #dc3545 (Call-to-action buttons)
- **Background**: #f5f7fa (Clean, subtle background)
- **Card Background**: #ffffff (Pure white for content cards)
- **Text**: #1a1a1a (High contrast dark text)
- **Secondary Text**: #666 (Subtle gray for descriptions)

## Target Audience

- Individuals with chronic health conditions
- Users with accessibility needs
- Healthcare professionals and institutions
- Educational institutions and campus safety
- General health-conscious consumers
- Parents of children with medical conditions

## DECA Competition Context

This website was created as part of a Distributive Education Clubs of America (DECA) project, demonstrating:

- **Business Planning**: Comprehensive product strategy and market analysis
- **Web Design**: Professional, accessible website development  
- **Marketing**: Clear value proposition and customer segmentation
- **Innovation**: Inclusive technology solution addressing real-world healthcare needs
- **Social Impact**: Focus on accessibility and health equity
- **Entrepreneurship**: Innovative business model for healthcare technology

## Mission Statement

"Make healthcare accessible, inclusive, and proactive. Save lives by reducing emergency response errors. Empower people to manage health independently, regardless of disability or condition."

## Slogan Options

- "MediBand — Health that connects."
- "MediBand — Because every second matters."
- "MediBand — Inclusive innovation for every heartbeat."

---

**Created by Charvi Konda for DECA Competition 2025**

*"Inclusive innovation for every heartbeat"*
