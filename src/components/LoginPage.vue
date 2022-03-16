<template>
<UpdateDetails @display-modal="changeModalStatus" 
:display="display"
 @update-profile="updateProfile" 
 :user="user"/>
<nav class="d-flex max-width-500 mx-auto justify-content-end mt-2">
<div v-if="!signedIn" class="d-flex max-width-500 mx-auto justify-content-end">
  <button  class="btn btn-primary mx-2" :class="{'btn-secondary':selectedForm==='Sign in'}" @click="selectForm('Sign in')" :disabled="selectedForm==='Sign in'">Sign In</button>
  <button   class="btn btn-primary mx-2" :class="{'btn-secondary':selectedForm==='Sign up'}" @click="selectForm('Sign up')" :disabled="selectedForm==='Sign up'">Sign Up</button>
</div>  
<button v-else class="btn btn-secondary" @click="handleSignOut">Sign Out</button> 
</nav>



<div class="container max-width-500 card my-3 p-3">
<h3 class="w-100 text-left mb-4">{{selectedForm}} Form</h3>
<form @submit="handleFormSubmit">
  <div class="mb-3">
    <label for="exampleInputEmail1" class="w-100 text-left">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="w-100 text-left">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
  </div>
  <div class="d-flex justify-content-center">
  <button type="submit" class="btn btn-primary w-50">{{selectedForm}}</button>
  </div>
</form>
<p class="text-danger my-3" :class="!error&&'d-none'">{{error}}</p>
<p class="text-success my-3" :class="!success&&'d-none'">{{success}}</p>


</div>
</template>

<script>
import UpdateDetails from './UpdateDetails.vue'
import {db, auth} from '../firebase/main';
import { collection, getDocs } from "firebase/firestore";
import { createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword,sendEmailVerification,updateProfile } from 'firebase/auth'

export default {
  name: 'LoginPage',
  components:{
    UpdateDetails
  },
  props: { 
  },
  data:()=>({
    email:"",
    password:"",
    error:"",
    success:"",
    signedIn:false,
    selectedForm:"Sign in",
    user:null,
    false:false,
    display:'d-block'
  }),
  computed:{
    disabled(){
      return this.selectedForm==='Sign in'
    }
  },
  methods:{
    selectForm(form){
      this.selectedForm=form
      this.error=""
      this.success=""
    },
    changeModalStatus(value){
      this.display=value
    }
    
    ,verifyEmail(e){
      e.preventDefault();
      sendEmailVerification(this.user)
    },
    async handleFormSubmit(e){
      e.preventDefault();
      switch (this.selectedForm){
        case 'Sign in':
          this.handleSignIn()
          break;
        case 'Sign up':
          this.handleSignUp()
          break;
        default:
          break;    
      }
  
    },
    async handleSignUp(){
          try{
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        this.success="You have been successfully signed up to the app, you can navigate the app"
      
      }catch(err){
        if(err.code==='auth/email-already-in-use'){
            this.error="This email already exists, please use Sign-in form to login or reset your password"
          } 
        
        }
    }

    ,async handleSignOut(){
      try{
        await signOut(auth)
      }catch(err){
        console.log(err);
      }
    },
    async handleSignIn(){
      try{
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.success="You have been successfully signed in to the app, you can navigate the app";
      }catch(error){
        console.log(error.code);
        if(error.code==='auth/wrong-password'){
            this.error="This email already exists, but you typed wrong password,try again or reset your password"
      }else if(error.code==='auth/user-not-found') {
        this.error="This email is not found in the database, check for typos or Sign up"
      }
    }
  },
  updateProfile(displayName){
      updateProfile(this.user, {
                    displayName 
    }).then(res=>{
        console.log(res);
    })
    }
  },
  mounted(){
    auth.onAuthStateChanged(user=> {
  if (user) {
    console.log(user);
    this.signedIn=true
    this.user=user;
    sessionStorage.setItem("loggedInUser",JSON.stringify(user)) 
  }else{
    this.signedIn=false
    this.user=null
    console.log('no user signed in');
      getDocs(collection(db, "shops")).then(snapShot=>{
      console.log(snapShot.docs[0].data());
    })
  
  }
});
  },
  created(){
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.max-width-500{
  width: 100%;
  max-width: 500px;
}
.text-left{
  text-align: left!important;
}
.bg-danger-light{
  background: #FFF0F0;
}
.bg-success-light{
  background: #90EE90;
}
.small-btn{
 border-radius: 1rem;
 padding: 0 1rem;
}
</style>
