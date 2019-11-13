<template>
  <div class="home">
    <div class="nav">
      <div class="left">
        <div>过滤条件一：<input type="text" placeholder="RegEx supported" v-model="filterReg1"></div>
        <div>过滤条件二：<input type="text" placeholder="RegEx supported" v-model="filterReg2"></div>
        <div>过滤条件三：<input type="text" placeholder="RegEx supported" v-model="filterReg3"></div>
        <div>过滤条件四：<input type="text" placeholder="RegEx supported" v-model="filterReg4"></div>
      </div>
      <div class="right">
        <div>
          <button value="search" @click="filterClear">清除过滤条件</button>
        </div>
        <div>
          <button value="search" @click="contentClear">清除源文本</button>
        </div>
      </div>
    </div>
    <div class="content">
      <textarea class="source" :style="{height: `${text1Height}px`,width:`${textwidth}px`}" v-model="inputValue"
                placeholder="Paste source data here.."></textarea>
      <textarea class="result" :style="{height: `${text2Height}px`,width:`${textwidth}px`}" v-model="resultVaule"
                placeholder="The filter of data.."></textarea>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    components: {},
    data () {
      return {
        inputValue: '',
        filterReg1: '',
        filterReg2: '',
        filterReg3: '',
        filterReg4: '',
        text1Height: '',
        text2Height: '',
        textwidth: '',
        timer: false
      }
    },
    methods: {
      filterClear () {
        this.filterReg1 = ''
        this.filterReg2 = ''
        this.filterReg3 = ''
        this.filterReg4 = ''
      },
      contentClear () {
        this.inputValue = ''
      },
      clientSize () {
        if (window.innerHeight !== undefined) {
          return {
            'width': window.innerWidth,
            'height': window.innerHeight
          }
        } else if (document.compatMode === 'CSS1Compat') {
          return {
            'width': document.documentElement.clientWidth,
            'height': document.documentElement.clientHeight
          }
        } else {
          return {
            'width': document.body.clientWidth,
            'height': document.body.clientHeight
          }
        }
      },
      settingSize () {
        this.text1Height = (this.clientSize().height - 100) * 0.3
        this.text2Height = (this.clientSize().height - 100) * 0.5
        this.textwidth = this.clientSize().width * 0.8
      }
    },
    mounted () {
      this.settingSize()
      window.onresize = () => {
        if (!this.timer) {
          this.timer = true
          setTimeout(() => {
            this.settingSize()
            this.timer = false
          }, 400)
        }
      }
    },
    computed: {
      resultVaule () {
        let listString = decodeURIComponent(this.inputValue).trim().split('\n')
        let _this = this
        let Exp1 = new RegExp(this.filterReg1)
        let Exp2 = new RegExp(this.filterReg2)
        let Exp3 = new RegExp(this.filterReg3)
        let Exp4 = new RegExp(this.filterReg4)
        let NewlistString = listString.filter(function (ele, index, array) {
          // 字符串匹配
          let value1 = ele.indexOf(_this.filterReg1) > -1 && ele.indexOf(_this.filterReg2) > -1 && ele.indexOf(_this.filterReg3) > -1 && ele.indexOf(_this.filterReg4) > -1
          // 正则匹配
          let value2 = Exp1.test(ele) && Exp2.test(ele) && Exp3.test(ele) && Exp4.test(ele)
          return value1 || value2
        })
        return NewlistString.join('\n')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  input, button, textarea
    border: .02rem solid #ccc
    border-radius: .06rem

  input
    margin: .06rem 1.2rem .06rem .3rem
    padding: 0 .06rem
    width: 10rem

  button
    padding: 0 .08rem
    margin: .2rem .2rem .1rem
    width: 2rem

  .nav
    display: flex
    justify-content: center
    margin-top: .3rem

  .left
    width: 15rem
    display: flex
    flex-direction: column
    justify-content: center
    align-items: flex-end

  .right
    width: 5rem
    display: flex
    flex-direction: column
    justify-content: center
    align-items: flex-start

  textarea
    min-width: 20rem
    min-height: 3rem
    margin: .3rem 0 .2rem 0
    white-space: nowrap
    overflow-x: scroll
    padding: .1rem .2rem

  .result
    min-height: 5rem
    margin-top: .4rem

</style>
