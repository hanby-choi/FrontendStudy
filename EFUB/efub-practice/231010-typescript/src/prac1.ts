class Developer {
  public name: string; // 어디서든 접근 가능한 접근 제어자 설정
  protected age: number; // 클래스 내부와 파생 클래스에서 접근 가능한 접근 제어자 설정
  private position: string; // 클래스 내부에서만 접근 가능한 접근 제어자 설정

  constructor(name: string, age: number, position: string) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  sayHi() {
    console.log(
      `저는 ${this.age}살이고 이름은 ${this.name}입니다. 포지션은 ${this.position}입니다`
    );
  }
}

// Developer 클래스를 상속받는 FrontendDeveloper 클래스를 선언해주세요.
// 규칙 1. FrontendDeveloper 클래스에 'react'라는 이름의 새로운 필드를 선언해주세요.
// (해당 필드의 접근 제어자는 protected, 타입은 boolean으로 설정)
// 규칙 2. 오류가 나지 않도록 constructor를 작성해주세요. (주의 : super를 잊지 마세요!)
// 규칙 3. FrontendDeveloper 클래스에 'func'라는 이름의 새로운 메서드를 선언해주세요.
// (해당 메서드에서는 name, age, position, react 중 오류가 나지 않을 필드들을 모두 console.log()로 출력해주세요.)
class FrontendDeveloper extends Developer {
  protected react: boolean;
  constructor(name: string, age: number, position: string, react: boolean) {
    super(name, age, position);
    this.react = react;
  }
  func() {
    console.log(this.name);
    console.log(this.age);
    console.log(this.react);
  }
}

const frontendDeveloper = new FrontendDeveloper(
  '최한비',
  23,
  'developer',
  true
);
frontendDeveloper.func();
