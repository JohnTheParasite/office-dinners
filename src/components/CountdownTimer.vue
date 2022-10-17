<template>
  <div class="timer" v-if="!hasNoDate">
    <div class="hour">
      <span class="number">{{ hours }}</span>
      <div class="format">Hours</div>
    </div>
    <div class="min">
      <span class="number">{{ minutes }}</span>
      <div class="format">Minutes</div>
    </div>
    <div class="sec">
      <span class="number">{{ seconds }}</span>
      <div class="format">Seconds</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CountdownTimer",
  data() {
    return {
      endTime: new Date(),
      end: "",
      hours: 0,
      minutes: 0,
      seconds: 0,
      interval: ""
    }
  },
  props: {
    autoCloseDate: {
      type: String,
      required: true
    }
  },
  watch: {
    autoCloseDate: {
      deep: true,
      handler: function (value) {
        if (value.length < 1) {
          this.hours = 0
          this.minutes = 0
          this.seconds = 0
          window.clearInterval(this.interval)
        } else {
          this.initTimer(value)
        }
      }
    }
  },
  computed: {
    hasNoDate() {
      return (this.autoCloseDate && this.autoCloseDate.length < 1) || (this.hours === 0 && this.minutes === 0 && this.seconds === 0)
    }
  },
  mounted() {
    this.initTimer(this.autoCloseDate)
  },
  methods: {
    initTimer(date) {
      this.endTime = new Date(date)
      this.end = this.endTime.getTime()

      this.timerCount()
      this.interval = setInterval(() => {
        this.timerCount()
      }, 1000)
    },
    timerCount() {
      let now = new Date().getTime()
      let passTime = this.endTime.getTime() - now

      if (passTime > 0) {
        this.hours = Math.floor((passTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        this.minutes = Math.floor((passTime % (1000 * 60 * 60)) / (1000 * 60))
        this.seconds = Math.floor((passTime % (1000 * 60)) / 1000)
      } else {
        clearInterval(this.interval)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/components/color";

.timer {
  font-size: 20px;
  color: #fff;
  text-align: center;

  .day,
  .hour,
  .min,
  .sec {
    font-size: 30px;
    display: inline-block;
    font-weight: 500;
    text-align: center;
    margin: 0 5px;

    .format {
      font-weight: 300;
      font-size: 14px;
      //@include margin-start(5);
      //display: inline-block;
      //opacity: 0.8;
      width: 60px;
      color: $primary;
    }
  }

  .number {
    background: $primary;
    padding: 0 5px;
    border-radius: 5px;
    display: inline-block;
    width: 60px;
    text-align: center;
  }
}
</style>
