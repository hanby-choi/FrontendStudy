import { connectDB } from '@/util/database';

export default async function handler(req, res) {
  if (req.method == 'POST') {
    if (req.body.title == '' || req.body.content == '') {
      return res.status(500).json('빈 형식이 있습니다.');
    }
    try {
      let db = (await connectDB).db('forum');
      let result = db.collection('post').insertOne(req.body);
      res.redirect(302, '/list');
    } catch (error) {
      console.log(error);
    }
  }
}
