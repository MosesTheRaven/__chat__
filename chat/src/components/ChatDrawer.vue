<template>
    <v-navigation-drawer v-model="rightDrawer" app clipped right>
      <v-toolbar class="py-3" style="border-bottom : solid 1px rgb(215,215,215); box-shadow : none !important">
        <v-toolbar-title>
          Conversation Information
        </v-toolbar-title>
      </v-toolbar>
      <v-list subheader class="pa-1">
        <v-subheader v-if="getCurrentProjectConversation">
          Project Description
        </v-subheader>
        <p style="margin-left : 16px" v-if="getCurrentProjectConversation">{{getCurrentConversationProjectDescription}}</p>
        <v-subheader class="subheader">
          Members
        </v-subheader>
        <v-chip  v-for="(user, i) in getCurrentConversationUsersObject" :key="i" text-color="primary">
          <v-avatar>
            <i :class="!user.avatar ? 'far fa-user' : 'far ' + user.avatar"></i>
          </v-avatar>
          {{ user.name }}
        </v-chip>
        <v-divider style="margin-top : 18px;"></v-divider>
        <v-subheader class="subheader">
          Files
        </v-subheader>
        <ul class="ul-root">
          <ul class="ul-node" v-if="fileCategory.files.length > 0" v-for="(fileCategory, i) in filesObject" :key="i">
            <span v-on:click="fileCategory.open=!fileCategory.open">
              <i :class="fileCategory.open ? 'fas fa-caret-down' : 'fas fa-caret-right' " :style="fileCategory.open ?  '' :'margin-left : 5px'"></i>
              <i :class="fileCategory.open ? 'fas fa-folder-open' : 'fas fa-folder' "></i>
              {{fileCategory.name}}
              ({{fileCategory.files.length}})
            </span>
            <ul v-if="fileCategory.open">
              <li v-for="(file, index) in fileCategory.files" :key="index">
                <a :href="file['file']['path']" target="_blank" style="text-decoration : none">
                  <i :class="fileCategory.icon"></i>
                  {{file['file']['name'].length > 20 ? file['file']['name'].substring(0,20) + '...' : file['file']['name']}}
                </a>
              </li>
            </ul>
          </ul>
        </ul>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import * as firebase from 'firebase'

  export default {
    name : 'ChatDrawer',
    data(){
        return{
            conversationUsers : [],
            rightDrawer : this.$mq !== 'sm' ? null : false,
            filesObject : 
            [
              {
                  name: 'Archives',
                  icon : 'far fa-file-archive',
                  open : false,
                  files : [
                  ]
              }, 
              {
                  name: 'PDF',
                  icon : 'far fa-file-pdf',
                  open : false,
                  files : [
                  ]
              }, 
              {
                  name: 'Presentations' ,
                  icon : 'far fa-file-powerpoint',
                  open : false,
                  files : [
                  ]
              }, 
              {
                  name: 'Documents' ,
                  icon : 'far fa-file-word',
                  open : false,
                  files : [
                  ]
              }, 
              {
                  name: 'Sheets' ,
                  icon : 'far fa-file-excel',
                  open : false,
                  files : [
                  ]
              }, 
              {
                  name: 'Images' ,
                  icon : 'far fa-file-image',
                  open : false,
                  files : [
                  ]
              }, 
              {
                  name: 'Music' ,
                  icon : 'far fa-file-audio',
                  open : false,
                  files : [
                  ]
              }, 
              {
                  name: 'Videos' ,
                  icon : 'far fa-file-video',
                  open : false,
                  files : [
                  ]
              },
              {
                  name: 'Other' ,
                  icon : 'far fa-file',
                  open : false,
                  files : [
                  ]
              }
            ]
          }
    },
    computed :{
      ...mapGetters(['getCurrentConversationUsersObject', 'getCurrentConversationFiles', 'getCurrentConversationId', 'getCurrentConversationProjectDescription', 'getCurrentProjectConversation'])
    },
    methods : {
      ...mapActions(['drawerResolveFiles']),
      addFile(fileObject){
        switch(fileObject[1].file.type){
          case 'zip':
          case 'rar':
          case '7z' :
          case 'gz' : {
            this.filesObject[0].files.push(fileObject[1])
            break
          }
          case 'pdf' : {
            this.filesObject[1].files.push(fileObject[1])
            break
          }
          case 'pps':
          case 'ppt': 
          case 'pptx': {
            this.filesObject[2].files.push(fileObject[1])
            break
          }
          case 'doc': 
          case 'docx':
          case 'odt' : 
          case 'txt' : {
            this.filesObject[3].files.push(fileObject[1])
            break
          }
          case 'xlr' :
          case 'xls' :
          case 'xlsx' : {
            this.filesObject[4].files.push(fileObject[1])
            break
          }
          case 'bmp' :
          case 'dds' :
          case 'gif' :
          case 'jpg' :
          case 'png' :
          case 'psd' :
          case 'tga' :
          case 'thm' :
          case 'tif' :
          case 'tiff' :
          case 'yuv' : {
            this.filesObject[5].files.push(fileObject[1])
            break
          }
          case 'mp3' :
          case 'wav' :
          case 'midi' :
          case 'wma' :
          case 'flac' : {
            this.filesObject[6].files.push(fileObject[1])
            break
          }
          case 'avi' :
          case 'mp4' :
          case '3gp' :
          case 'mkv' : {
            this.filesObject[7].files.push(fileObject[1])
            break
          }
          default : {
            this.filesObject[8].files.push(fileObject[1])
          }
        }
      }
    },
    watch : {
        rightDrawerVar : function(){
            this.rightDrawer = this.rightDrawerVar
        },
        rightDrawer : function(){
            this.$emit('setRightDrawerVar', this.rightDrawer)
        },
        getCurrentConversationFiles : function(){
          this.filesObject = [
              {
                  name: 'Archives',
                  icon : 'far fa-file-archive',
                  open : false,
                  files : [
                  ]
              }, 
              {
                  name: 'PDF',
                  icon : 'far fa-file-pdf',
                  open : false,
                  files : [
                  ]
              }, 
              {
                  name: 'Presentations' ,
                  icon : 'far fa-file-powerpoint',
                  open : false,
                  files : [
                  ]
              }, 
              {
                  name: 'Documents' ,
                  icon : 'far fa-file-word',
                  open : false,
                  files : [
                  ]
              }, 
              {
                  name: 'Sheets' ,
                  icon : 'far fa-file-excel',
                  open : false,
                  files : [
                  ]
              }, 
              {
                  name: 'Images' ,
                  icon : 'far fa-file-image',
                  open : false,
                  files : [
                  ]
              }, 
              {
                  name: 'Music' ,
                  icon : 'far fa-file-audio',
                  open : false,
                  files : [
                  ]
              }, 
              {
                  name: 'Videos' ,
                  icon : 'far fa-file-video',
                  open : false,
                  files : [
                  ]
              },
              {
                  name: 'Other' ,
                  icon : 'far fa-file',
                  open : false,
                  files : [
                  ]
              }
            ]
          if(this.getCurrentConversationFiles){
            Object.entries(this.getCurrentConversationFiles)
            .forEach((fileObject) => this.addFile(fileObject))
          }
        },
        // getCurrentConversationId : function(){
        //   if(this.getCurrentConversationId){
        //     firebase.database().ref('conversations/' + this.getCurrentConversationId + '/files')
        //     .on('child_added', (fileDataSnapshot)=>{
        //       // console.log(fileDataSnapshot, fileDataSnapshot.val())
        //       this.setNewCurrentConversation(this.getCurrentConversationId)
        //     })
        //   }
        // }
    },
    props : ['rightDrawerVar']
  }
</script>
<style scoped>
  ul{
    list-style-type: none
  }
  .ul-root{
    cursor : pointer;
    font-weight: 500;
    line-height : 35px;
    color : #455a64 !important;
    padding : 1px 5px;
  }
  .ul-root i{
    font-size : 20px;
    padding-right : 5px;
  }
  .ul-node{
    padding : 0;
  }
  .subheader{
    font-size : 16px;
  }
</style>
