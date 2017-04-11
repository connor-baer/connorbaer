/**
 * Show an error message
 *
 * @param  {Object} error  Error object
 */
function error(err) {

  alertify
    .closeLogOnClick(true)
    .error(err.message);
}


/**
 * Set a cookie
 *
 * @param {String} cookieName  Name of the cookie
 * @param {String} cookieValue  Value of the cookie
 * @param {Integer} nDays  Number of days after which the cookie will expire, default: 1
 */
function setCookie(cookieName, cookieValue, nDays = 1) {

  const today = new Date();
  const expire = new Date();

  expire.setTime(today.getTime() + 3600000 * 24 * nDays);
  document.cookie = cookieName + '=' + escape(cookieValue) + ';expires=' + expire.toGMTString() + '; path=/';
}


/**
 * Get a cookie
 *
 * @param  {String} cookieName  Name of the cookie
 *
 * @return {String}  Value of the cookie
 */
function getCookie(cookieName) {

  let value = '; ' + document.cookie;
  let parts = value.split('; ' + cookieName + '=');

  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
}


/**
 * Get user's current location
 *
 * @return  {Object}  Current GPS coordinates of the user
 */
function getLocation() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      return position;
    }, function(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          error('You didn’t share your location.');
          break;
        case error.POSITION_UNAVAILABLE:
          error('Location information is unavailable.');
          break;
        case error.TIMEOUT:
          error('The request to get your location timed out.');
          break;
        case error.UNKNOWN_ERROR:
          error('An unknown error occurred.');
          break;
      }
    }, {
      timeout: 10000
    });
  } else {
    const err = new Error('Geolocation is not supported by this browser.');

    error(err);
  }
}


/**
 * Get sunrise and sunset times
 *
 * @param  {Object} position  GPS coordinates
 * @param  {Object} date  DateTime object, default: now
 *
 * @return  {Object}  Sunrise and sunset times for the user's current location
 */
function sunTimes(position, date = new Date()) {

  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  const suntimes = SunCalc.getTimes(date, lat, long);

  return suntimes;
}


/**
 * Toggle the dark theme
 *
 * @param  {Boolean} darkMode  Turn darkmode on/off, optional
 */
function toggleDarkness(darkMode) {

  darkCookie = (getCookie('darkMode') === 'true') ? false : true;
  darkMode = (typeof darkMode !== 'undefined') ? darkMode : darkCookie;

  const html = document.documentElement;

  if (darkMode) {
    html.classList.add('theme-dark');
  } else {
    html.classList.remove('theme-dark');
  }
  setCookie('darkMode', darkMode, 1);
  alertify
    .closeLogOnClick(true)
    .log('Darkmode turned ' + ((darkMode === true) ? 'on' : 'off') + '.');
}

/**
 * Ask to toggle dark theme based on time
 *
 * @param  {Boolean} auto  Toggle darkmode automatically, default: false
 * @param  {Integer} sunrise  Time of sun rise, default: 0700
 * @param  {Integer} sunset  Time of sunset, default: 2000
 */
function joinTheDarkSide(auto, sunrise = 700, sunset = 2100) {

  auto = (typeof auto !== 'undefined') ? auto : getCookie('darthVader');

  let now = new Date();
  let time = Number(('0' + now.getHours()).slice(-2) + '' + ('0' + now.getMinutes()).slice(-2));
  let darkMode = (getCookie('darkMode') === null) ? false : getCookie('darkMode');

  if (time < sunrise || time > sunset) {
    let askedDark = (sessionStorage.getItem('askedDark') === null) ? false : sessionStorage.getItem('askedDark');

    if (!darkMode && auto) {
      toggleDarkness(true);
    } else if (!darkMode && !askedDark) {
      sessionStorage.setItem('askedDark', true);
      alertify
        .okBtn('Turn On')
        .cancelBtn('Cancel')
        .confirm('It’s getting late! Want to turn on dark mode?', function () {
          toggleDarkness(true);
        });
    }
  } else {
    let askedLight = (sessionStorage.getItem('askedLight') === null) ? false : sessionStorage.getItem('askedLight');

    if (darkMode && auto) {
      toggleDarkness(false);
    } else if (darkMode && !askedLight) {
      sessionStorage.setItem('askedLight', true);
      alertify
        .okBtn('Turn Off')
        .cancelBtn('Cancel')
        .confirm('Dawn is here! Want to turn off dark mode?', function () {
          toggleDarkness(false);
        });
    }
  }

  // Run every 2 minutes.
  setTimeout(joinTheDarkSide, 120000, auto, sunrise, sunset);
}

/**
 * Automatically toggle dark theme
 *
 * @param  {Integer} sunrise  When the sun rises, default: 0700
 * @param  {Integer} sunset  When the sun sets, default: 2000
 */
function darthVader() {
  let times = sunTimes();

  sunrise = Number(('0' + times.sunrise.getHours()).slice(-2) + '' + ('0' + times.sunrise.getMinutes()).slice(-2));
  sunset = Number(('0' + times.sunset.getHours()).slice(-2) + '' + ('0' + times.sunset.getMinutes()).slice(-2));

  console.log('☀️ ' + sunrise + ' | 🌙 ' +  sunset);

  joinTheDarkSide(sunrise, sunset);
}
