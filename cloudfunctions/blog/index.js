// 云函数入口文件
const cloud = require('wx-server-sdk')

// 如果遇到报出一大串不知所云的错误，在该云函数内加入环境变量
cloud.init(
  {
    env: 'cloud1-9gllb3t0e96be3a1',
    traceUser: true,
  }
)

// const TcbRoute =require('tcb-router')

const TcbRouter = require('tcb-router')

const db=cloud.database()

const blogCollection= db.collection('blog')

const MAX_LIMIT = 100


// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
  event
  })
  app.router('list',async(ctx,next)=>{
    const keyword=event.keyword
    let w={}
    if(keyword.trim()!=''){
      w={
        content: db.RegExp({
          regexp:keyword,
          options:'i'
        })
      }
    }

   


    let blogList = await blogCollection.where(w).skip(event.start).limit(event.count).orderBy('createTime','desc').get().then((res)=>{
      return res.data
    })
    ctx.body=blogList
  })


  app.router('detail',async(ctx,next)=>{
    let blogId=event.blogId
    //详情查询
    let detail=await blogCollection.where({
      _id:blogId
    }).get().then((res)=>{
      return res.data
    })
    //评论查询
    const countResult=await blogCollection.count()
    const total = countResult.total
    let commentList={
      data:[]
    }
    if(total>0){
      const batchTimes = Math.ceil(total/MAX_LIMIT)
      const tasks=[]
      for(let i=0;i<batchTimes;i++){
        let promise=db.collection('blog-comment').skip(i*MAX_LIMIT).limit(MAX_LIMIT).where({
          blogId
        }).orderBy('createTime','desc').get()
        tasks.push(promise)
      }
      if(tasks.length>0){
        commentList=(await Promise.all(tasks)).reduce((acc,cur)=>{
          return{
            data:acc.data.concat(cur.data)
          }
        })
      }


    }

    ctx.body={
      commentList,
      detail
    }


  })

  const WxContent=cloud.getWXContext()

  app.router('getListByOpenid',async(ctx,next)=>{
   ctx.body=await blogCollection.where({
      _openid:WxContent.OPENID
    }).skip(event.start).limit(event.count).orderBy('createTime','desc').get().then((res)=>{
      return res.data
    })
  })


  return app.serve()
}