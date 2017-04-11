/**
 * Vue Instance
 */
new Vue({
  el: '#app',
  delimiters: ['[[', ']]'],
  data: {
    hours: '',
    minutes: '',
  },
  mounted () {
    this.updateDateTime;
    setInterval(this.updateDateTime, 1000);
  },
  methods: {
    updateDateTime () {
      let now = new Date();
      this.hours = now.getHours();
      this.minutes = (parseInt(now.getMinutes(), 10) >= 10 ? '' : '0') + now.getMinutes();
    }
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
    }
  }
});
