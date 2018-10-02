<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from './todo/header'
import Footer from './todo/footer'
import Todo from './todo/todo'

export default {
  components: {
    Header,
    Footer,
    Todo
  }
}
</script>
<style lang="stylus" scoped>
#app
  position absolute
  left 0
  right 0
  top 0
  bottom 0
#cover
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  background-color #999
  z-index -1
  opacity .4 
</style>

