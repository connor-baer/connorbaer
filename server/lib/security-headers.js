export default function securityHeaders(req, res, next) {
  /**
   * Prevent Internet Explorer users from executing downloads in our
   * site's context
   * LINK: https://github.com/helmetjs/ienoopen
   */
  res.setHeader('X-Download-Options', 'noopen');
  /**
   * Don't allow the website to be embedded as an iframe to prevent clickjacking
   * LINK: https://scotthelme.co.uk/hardening-your-http-response-headers/#x-frame-options
   */
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  /**
   * Do not include Referer header when downgrading from HTTPS to HTTP
   * LINK: https://scotthelme.co.uk/a-new-security-header-referrer-policy/
   */
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
  /**
   * This header is used to configure the built in reflective XSS protection
   * found in some browsers
   * LINK: https://scotthelme.co.uk/hardening-your-http-response-headers/#x-xss-protection
   */
  res.setHeader('X-Xss-Protection', '1');
  /**
   * Prevents Google Chrome and Internet Explorer from trying to mime-sniff the
   * content-type of a response away from the one being declared by the server.
   * LINK: https://scotthelme.co.uk/hardening-your-http-response-headers/#x-content-type-options
   */
  res.setHeader('X-Content-Type-Options', 'nosniff');
  /**
   * Tell browsers that the domain should only be accessed using HTTPS, instead
   * of using HTTP.
   * LINK: https://scotthelme.co.uk/hsts-the-missing-link-in-tls/
   */
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  );
  /**
   * Prevent the use of browser features in a web page, and in iframes that it
   * embeds.
   * LINK: https://scotthelme.co.uk/a-new-security-header-feature-policy/
   */
  res.setHeader(
    'Feature-Policy',
    "geolocation 'self'; microphone 'none'; camera 'none'; payment: 'none'"
  );

  next();
}
