//模拟评论数据
const comment = {
    status: "成功",
    code: 200,
    data: [
      {
        id: 'comment0001', //主键id
        date: '2018-07-05 08:30',  //评论时间
        ownerId: 'talents100020', //文章的id
        fromId: 'errhefe232213',  //评论者id
        fromName: 'Test',   //评论者昵称
        fromAvatar: 'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg', //评论者头像
        likeNum: 3, //点赞人数
        content: '资瓷！',  //评论内容
        reply: [  //回复，或子评论
          {
            id: '34523244545',  //主键id
            commentId: 'comment0001',  //父评论id，即父亲的id
            fromId: 'observer223432',  //评论者id
            fromName: 'Alpha',  //评论者昵称
            fromAvatar: 'https://wx4.sinaimg.cn/mw690/69e273f8gy1ft1541dmb7j215o0qv7wh.jpg', //评论者头像
            toId: 'errhefe232213',  //被评论者id
            toName: 'Test',  //被评论者昵称
            toAvatar: 'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg',  //被评论者头像
            content: '前排',  //评论内容
            date: '2018-07-05 08:35'   //评论时间
          },
          {
            id: '34523244545',
            commentId: 'comment0001',
            fromId: 'observer567422',
            fromName: 'Beta',
            fromAvatar: 'http://imgsrc.baidu.com/imgad/pic/item/c2fdfc039245d688fcba1b80aec27d1ed21b245d.jpg',
            toId: 'observer223432',
            toName: 'Alpha',
            toAvatar: 'https://wx4.sinaimg.cn/mw690/69e273f8gy1ft1541dmb7j215o0qv7wh.jpg',
            content: '大神一个！',
            date: '2018-07-05 08:50'
          }
        ]
      },
      {
        id: 'comment0002',
        date: '2018-07-05 08:30',
        ownerId: 'talents100020',
        fromId: 'errhefe232213',
        fromName: 'Isaac',
        fromAvatar: 'http://ww1.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2q2p8pj30v90uzmzz.jpg',
        likeNum: 0,
        content: '%%%',
        reply: []
      }
    ]
  };
  
  export {comment}
  