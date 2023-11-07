import Image from 'next/image';
import styles from './page.module.css';
import foodImg from '/public/food0.png';
import './globals.css';

export default function Home() {
  return (
    <div>
      <h4 className="title">메인 페이지</h4>
      <p className="title-sub">로컬 이미지 컴포넌트</p>
      <Image src={foodImg} alt="food-image" placeholder="blur" />
      <p className="title-sub">리모트 이미지 컴포넌트</p>
      <Image
        src="https://images.unsplash.com/photo-1669940812749-0a0fa4b92ba4?ixlib=rb4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        alt="car-image"
        width="400"
        height="400"
      />
    </div>
  );
}
