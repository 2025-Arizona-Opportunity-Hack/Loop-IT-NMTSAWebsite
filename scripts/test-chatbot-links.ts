/**
 * Chatbot Test Queries - Clickable Links Feature
 * Use these queries to test the clickable links functionality
 */

// ============================================
// BASIC URL TESTS
// ============================================

// Test 1: Single URL
"What is the homepage link?"
// Expected: https://loop-it-nmtsa-website.vercel.app/
// Should be: Blue, clickable, opens in new tab

// Test 2: Multiple URLs
"Show me all the main pages"
// Expected: Multiple URLs for homepage, about, programs, etc.
// Should be: All clickable with external link icons

// ============================================
// FORM LINK TESTS
// ============================================

// Test 3: Volunteer Form
"How do I apply to volunteer?"
// Expected: https://loop-it-nmtsa-website.vercel.app/get-involved
// Should be: Clickable link with context

// Test 4: Therapy Request Form
"I want to request music therapy services"
// Expected: https://loop-it-nmtsa-website.vercel.app/programs/therapy?form=request
// Should be: Direct link to the form modal

// Test 5: Music Lessons
"How do I enroll in music lessons?"
// Expected: https://loop-it-nmtsa-website.vercel.app/programs/music-lessons?form=music-lessons
// Should be: Clickable link to music lessons form

// Test 6: All Forms
"Show me all the forms available"
// Expected: Multiple form URLs listed
// Should be: All clickable, clearly formatted

// ============================================
// CONTACT INFORMATION TESTS
// ============================================

// Test 7: Contact Page
"How do I contact NMTSA?"
// Expected: https://loop-it-nmtsa-website.vercel.app/contact
// May also include: Phone (602) 840-6410, Email info@nmtsa.org

// Test 8: Donation Page
"How can I donate?"
// Expected: https://loop-it-nmtsa-website.vercel.app/donate
// Should be: Clickable donation page link

// ============================================
// PROGRAM SPECIFIC TESTS
// ============================================

// Test 9: About Page
"Tell me about NMTSA"
// Expected: May include https://loop-it-nmtsa-website.vercel.app/about
// Should be: Clickable link to about page

// Test 10: Specific Program
"What therapy programs do you offer?"
// Expected: https://loop-it-nmtsa-website.vercel.app/programs
// Should be: Link to programs page

// ============================================
// EDGE CASES
// ============================================

// Test 11: URL with trailing punctuation (FIXED)
"Visit https://loop-it-nmtsa-website.vercel.app/get-involved)."
// Expected: URL without ). at the end should be clickable
// Punctuation ). should appear as plain text after the link

// Test 12: URL in parentheses
"You can apply here (https://loop-it-nmtsa-website.vercel.app/get-involved) for more info."
// Expected: URL without closing ) should be clickable
// Closing ) and period should be plain text

// Test 13: Multiple URLs with punctuation
"Check out the forms: https://loop-it-nmtsa-website.vercel.app/contact, https://loop-it-nmtsa-website.vercel.app/donate."
// Expected: Both URLs without comma/period should be clickable
// Comma and period should be plain text

// Test 14: Multiple URLs in One Response
"Give me links to volunteer, contact page, and donation page"
// Expected: 3 separate clickable URLs
// Should be: All properly spaced and clickable

// Test 15: URL with Query Parameters
"How do I apply for internship?"
// Expected: May include URL with ?form=internship parameter
// Should be: Entire URL including parameters is clickable

// Test 16: Long URL
"What's the clinical observation form link?"
// Expected: https://loop-it-nmtsa-website.vercel.app/programs/therapy?form=observation
// Should be: Full URL is clickable, doesn't break layout

// ============================================
// VERIFICATION CHECKLIST
// ============================================

/*
For each test, verify:
□ Link is properly formatted (blue for assistant, white for user)
□ External link icon appears
□ Link is clickable
□ Opens in new tab
□ URL is complete and correct
□ Hover effect works (color change)
□ No console errors
□ Layout doesn't break with long URLs
□ Multiple links in same message all work
*/

// ============================================
// EXAMPLE EXPECTED RESPONSES
// ============================================

/*
GOOD RESPONSE FORMAT:
"You can volunteer by visiting:
https://loop-it-nmtsa-website.vercel.app/get-involved

Just click the link above and fill out the application form!"

GREAT RESPONSE FORMAT:
"Here are the main pages you can visit:

• Homepage: https://loop-it-nmtsa-website.vercel.app/
• Programs: https://loop-it-nmtsa-website.vercel.app/programs
• Contact: https://loop-it-nmtsa-website.vercel.app/contact

Feel free to explore!"
*/

// ============================================
// REGRESSION TESTS (Things that should NOT break)
// ============================================

// Test R1: Text without URLs
"What is NMTSA?"
// Expected: Regular text response without links
// Should be: Normal formatting, no broken styling

// Test R2: Mixed content
"NMTSA provides therapy services. You can learn more at https://loop-it-nmtsa-website.vercel.app/programs or call (602) 840-6410"
// Expected: URL is clickable, phone number is plain text
// Should be: Link works, rest is normal text

// Test R3: User message with URL (if user types a URL)
// Expected: URL in user's orange bubble should be white and clickable
// Should be: White link with white underline

// ============================================
// ACCESSIBILITY TESTS
// ============================================

/*
Manual checks:
1. Tab through the chat with keyboard - links should be focusable
2. Screen reader should announce "link" for URLs
3. External link icon should have proper alt/aria label
4. Links should have visible focus state
*/

// ============================================
// PERFORMANCE TESTS
// ============================================

/*
1. Send message with 10+ URLs - should all render quickly
2. Scroll through long conversation with many links - should be smooth
3. Clicking links shouldn't freeze the chat interface
*/

export {};
