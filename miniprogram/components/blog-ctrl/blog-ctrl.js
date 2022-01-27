// components/blog-ctrl/blog-ctrl.js
let userInfo={}
const db=wx.cloud.database()


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blogId:String,
    blog:Object,
  },
  externalClasses:['iconfont','icon-pinglun','icon-fenxiang'],

  
  /**
   * 组件的初始数据
   */
  data: {
    //登录组建是否显示
    loginShow:false,
    //底部弹出层
    modalShow:false,
    content:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onComment(){
      wx.getSetting({
        success:(res)=>{
          console.log("!!!!!!")
          console.log(res)
          if(res.authSetting['scope.userInfo']){
            wx.getUserInfo({
              success:(res)=>{
                userInfo=res.userInfo
                //显示评论弹出层
                this.setData({
                  modalShow:true,
                })
              }
            })
          }else{
            this.setData({
              loginShow:true,
            })
          }
        }
    })
    },

    onLoginsuccess(event){
      userInfo=event.detail
      //授权框消失，评论框显示
      this.setData({
        loginShow:false
      },()=>{
        this.setData({
          modalShow:true,
        })
      })
    },
    onloginfail(){
      wx.showModal({
        title:'授权用户才能进行评价',
        content:'',
      })
    },

    onInput(event){
      this.setData({
        content:event.detail.value
      })



    },

    onSend(event){
      //评论信息插入数据库
      let content=this.data.content
      if(content.trim()==''){
        wx.showModal({
          title:'评论不能为空',
          cancelColor: '',
        })
        return
      }
      wx.showLoading({
        title:'评价中',
        mask:true,
      })

      db.collection('blog-comment').add({
        data:{
          content,
          createTime:db.serverDate(),
          blogId:this.properties.blogId,
          avatarUrl:userInfo.avatarUrl,
          nickName:userInfo.nickName

        }
      }).then((res)=>{
        wx.hideLoading()
        wx.showToast({
          title: '评论成功',
        })
        this.setData({
          modalShow:false,
          content:'',
        })
        this.triggerEvent('refreshCommentList')



      })



      //推送模板信息




    },

  }
})
