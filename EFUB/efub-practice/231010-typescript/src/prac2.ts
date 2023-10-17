// 접근 제어자를 생성자의 매개변수에 설정해 코드를 간결하게 만들어 보세요.
class Developers {
  constructor(
    public name: string,
    protected age: number,
    private position: string
  ) {}

  sayHi() {
    console.log(
      `저는 ${this.age}살이고 이름은 ${this.name}입니다. 포지션은 ${this.position}입니다`
    );
  }
}

const developer = new Developers('최한비', 23, 'developer');
developer.sayHi();
