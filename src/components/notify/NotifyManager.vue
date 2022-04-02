<script setup>

import NotifyContainer from './NotifyContainer.vue';
import Notification from './Notification.vue';
import { inject, unref, watchEffect } from 'vue';

const notifies = inject('notifies')
//const notifies = inject('notifies')
const notify = inject('notify')

watchEffect(()=>{
   console.log(unref(notifies));
})

function deleteNotification(id){
  console.log("delete?")
  notify({
    type:'remove'
    , id:id
  })
}

</script>
<template>
  <NotifyContainer>
    <Notification 
      v-for="notify in notifies" 
      :type="notify.type"
      :header="notify.header"
      :text="notify.text"
      :key="notify.id"

      @onDelete="()=>deleteNotification(notify.id)"
      />

  </NotifyContainer>
</template>