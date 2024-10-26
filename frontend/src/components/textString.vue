<script>
export default {
  name: 'textString',
  props: {
    msg: String
  }
}
</script>
<template>
  <div class="font-semibold text-[14px]">
    <h1>{{ msg }}</h1>
  </div>
</template>