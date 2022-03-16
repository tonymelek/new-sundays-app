<template>
<div class="my-modal" :class="display">
  <div v-if="!!user" class="mx-auto my-3 card full-width">
  <h3 class="w-100 text-left m-3">Update my profile</h3>
  <form>
    <div class="row  my-2">
       <label class="col-3 text-left mx-2">Display name</label>
       <div class="d-flex col-8" v-if="!edit">
       <p  class="text-left my-0 me-3">{{user.displayName}}</p> <a href="#" @click="startEdit"><small>Change</small></a>
       </div>
       <input v-else class="col-8" type="text" v-model="displayName"/>
    </div>
      <div class="row my-3">
       <label class="col-3 text-left mx-2">Email</label>
       <p class="col-8 text-left m-0">{{user.email}}
         <sup>
      <span class="badge rounded-pill" 
      :class="{'bg-success-light text-success':user.emailVerified, 'text-danger bg-danger-light':!user.emailVerified}">
      {{user.emailVerified?'email verified':'email not verified'}}</span>
      </sup>
      <button v-if="!user.emailVerified" class="small-btn btn-success mx-2" @click="verifyEmail"><small>Verify</small></button>
      </p>
    </div>
    <div class="d-flex justify-content-around flex-wrap">
        <button @click="update" class="btn btn-warning my-3 min-btn-width">Update</button>
        <button @click="exit" class="btn btn-danger my-3 min-btn-width">Exit</button>
    </div>
  </form>
</div>
</div>
</template>

<script>

export default {
    name:"UpdateDetails",
    props:{
        display:String,
        user:{
            type:Object
        }
    },
    data(){
    return{
        displayName:'',
        edit:false
    }
    },
    methods:{
    update(e){
        e.preventDefault();
        this.$emit('update-profile', this.displayName)
    } ,
    exit(e){
        e.preventDefault();
        this.$emit('display-modal', 'd-none')
    },
    startEdit(e){
        e.preventDefault();
        this.edit=true;
        this.displayName=this.user.displayName

    }
    },
 
}
</script>

<style scoped>
.my-modal{
    position: absolute;
    z-index: 10;
    top: 25%;
    left:50%;
    transform: translate(-50%,-50%); 
    width: 90vw;
    max-width: 600px;
}
.min-btn-width{
    min-width: 8rem;
}
</style>