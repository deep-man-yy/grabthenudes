<template>
  <div class="home" style=" -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;">
    <app-title>
      <h1 class="title" style="text-align: center;">
        Welcome to {{ app.name }} 
      </h1>

    </app-title>

    <div class="content-body photoselection" >
      <div class="notification is-transparent" style="  text-align: center;   border: 0px;   -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;">
        <button> <img v-bind:src="imageUrl" @click.prevent="goHomePage" style="width: 294px;"> </button>
        <br/>
        <h1 class="app-title" style="border:0px; font-size: 25px !important;">Please Input License</h1>
        <h3 class="app-welcome">
          <input type="text" class="licenseInput" id="licenseInput" v-bind:value="originalKey" style="font-size: 16px; width: 238px;"/>
        </h3>
      </div>
    </div>

    <div class="home-wip">
      <!-- Quick Upload -->
      
      
      <div class="container-footer">
        <button
          type="button"
          class="button is-primary is-xl"
          @click.prevent="doLogin"
        >Next</button>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
import path from 'path'

window.deepTools.createLicenseFile();

export default {
  data: () => ({
    cliDirPath: undefined,
    validCliDir: true,
    imageUrl: '/3.png',
    checkpointsDirPath: undefined,
    validCheckpointsDir: true,
    originalKey: window.deepTools.readLicenseKey()
  }),

  created() {/*
    this.cliDirPath = window.deepTools.getCliDirPath()
    this.validCliDir = window.deepTools.fs.exists(this.cliDirPath)

    this.checkpointsDirPath = path.join(
      window.deepTools.getCliDirPath(),
      'checkpoints'
    )

    this.validCheckpointsDir = window.deepTools.fs.exists(
      this.checkpointsDirPath
    )*/
  },

  methods: {
    doLogin() {
      var settingRoute = this.$router;
      
      //settingRoute.push('home');
      //return;

      var licenseKey = document.getElementById('licenseInput').value
      axios({
        method: 'get',
        url: "http://grabthenudes.com/verification.php" + "?licenseKey=" + licenseKey,
      })
      .then(function (response) {
        response = JSON.parse(response.data)
        var result = response.result

        if (result == "error")
        {
          alert("The following license key does not exist")
          return
        }
        else if(result == "success")
        {
          if (response.status == "active")
          {
            alert("Your license key is activated, enjoy the premium version of GrabTheNudes V2.0.1")
            window.deepTools.writeLicenseKey(licenseKey);
            settingRoute.push('home');
          }
          else
          {
            alert("The following license key is not activated.")
            return
          }
        }
        else{
          alert("The following license key is not activated.")
          return
        }//Your license key is activated and is valid till {date}, enjoy our premium version of GrabTheNudes.
      })
      .catch(function (error) {
        //alert(error)
        alert("Cannot connect to server. Please check network status...")
        return
      });
      
    },
    goHomePage() {
      window.deepTools.goHomePage("https://grabthenudes.com");
    }
  }
}
/*
.layout-navbar{
    width: 0px ;
    visibility: hidden ;
}*/
</script>

<style lang="scss">

.home {
  .home-wip {
    @apply flex flex-col justify-center items-center;

    a {
      @apply text-primary underline;
    }
  }
}
.photoselection {
  .container-body {
    @apply flex flex-col items-center justify-center;
  }

  .app-title {
    @apply text-3xl font-bold;
  }

  .app-welcome {
    @apply text-xl text-gray-600;
  }

  .licenseInput{
    outline:none;
    border-bottom: 2px solid;
    text-align: center;
    background-color: #ffffff !important;
  }

  .licenseInput:focus{
    border: 0px;
    border-bottom: 2px solid;
    border-bottom-color: #0000ff;
  }
}
</style>
