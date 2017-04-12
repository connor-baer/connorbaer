/**
 * Vue Instance
 */
new Vue({
  el: '#app',
  delimiters: ['[[', ']]'],
  data () {
    return {
      time: '🕓',
      sunrise: '⌛️',
      sunset: '⌛️',
    };
  },
  mounted () {
    setInterval(this.updateDateTime, 1000);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function(location) {
        const suntimes = sunTimes(location);
        const sunrise = suntimes.sunrise.getHours() + ':' + suntimes.sunrise.getMinutes();
        const sunset = suntimes.sunset.getHours() + ':' + suntimes.sunset.getMinutes();

        this.sunrise = sunrise;
        this.sunset = sunset;
      }.bind(this), function(err) {
        let message = {};

        switch(err.code) {
          case err.PERMISSION_DENIED:
            message = new Error('You didn’t share your location.');
            break;
          case err.POSITION_UNAVAILABLE:
            message = new Error('Location information is unavailable.');
            break;
          case err.TIMEOUT:
            message = new Error('The request to get your location timed out.');
            break;
          case err.UNKNOWN_ERROR:
            message = new Error('An unknown error occurred.');
            break;
        }
        error(message);
      }, {
        timeout: 10000
      });
    }
  },
  methods: {
    updateDateTime () {
      let now = new Date();
      this.time = now.getHours() + ':' + ('0' + now.getMinutes()).slice(-2);
    },
  },
  computed: {
    greeting() {
      const now = new Date().getHours();
      if ( now <= 5 || now >= 22 ) {
        return 'Good night';
      } else if ( now > 5 && now <= 11 ) {
        return 'Good morning';
      } else if ( now > 11 && now <= 16 ) {
        return 'Good afternoon';
      } else if ( now > 16 && now <= 21 ) {
        return 'Good evening';
      }
    },
  }
});
