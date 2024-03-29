import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method == 'DELETE') {
    // 사용자 정보 불러오기
    let session = await getServerSession(req, res, authOptions);

    // id에 맞는 게시글 찾기
    let db = (await connectDB).db('forum');
    let found = await db
      .collection('post')
      .findOne({ _id: new ObjectId(req.body) });

    if (found.author == session?.user.email) {
      try {
        let result = await db
          .collection('post')
          .deleteOne({ _id: new ObjectId(req.body) });
        return res.status(200).json('삭제 완료');
      } catch (error) {
        res.status(500);
      }
    } else {
      return res.status(500).json('현재 유저와 작성자 불일치');
    }
  }
}
