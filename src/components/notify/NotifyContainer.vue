<template>
  <teleport to="body">
    <div class="righttop_notify">
      <slot></slot>
    </div>
  </teleport>
</template>
<style>
.righttop_notify {
  position: absolute;
  overflow: hidden;
  top: 16px;
  right: 16px;
  height: 100vh;
}
</style>