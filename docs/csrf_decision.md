# CSRF Security Implementation Decision

## Overview
This document outlines the decision not to merge the `features-csrf` branch into the `main` branch of the project.

## Background
The `features-csrf` branch was created to implement Cross-Site Request Forgery (CSRF) security measures in the web application. The open-source utility `csrf-csrf` was chosen instead of `csurf` because `csurf` has been deprecated.

## Decision
After careful consideration and evaluation of the application's security requirements, it was determined that CSRF protection is not necessary and too complex for the current scenario. Therefore, the decision has been made not to merge the `features-csrf` branch into `main`.

## Rationale
- The web application does not handle sensitive data or perform critical operations that would be susceptible to CSRF attacks.
- Implementing CSRF security introduces additional complexity to the codebase without significant security benefits.
- Based on external feedback from other developers the application currently does not use cookie based auth, and is instead providing a token directly to the frontend, which is sent via a header, so CSRF attacks are not something that needs to be worried about yet.

## Future Considerations
- If the application's security requirements change or evolve, the decision to implement CSRF protection may be revisited in the future.
- Consider security implications of using JWT according to OWASP guidelines: OWASP do not recommend storing JWT's (or any kind of auth tokens) in local storage, and whilst they advise against storing them in session storage, it is a safer alternative.
- Consider implementing token refresh and rotation using http-only cookies. HTTP-only cookies are less vulnerable to XSS attacks because they cannot be accessed via client-side scripts.

## Conclusion
The `features-csrf` branch serves as a record of the CSRF security implementation efforts. It will be kept separate from the `main` branch to maintain code clarity and simplicity.