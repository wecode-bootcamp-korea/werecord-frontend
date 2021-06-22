# Button Component

- 공용으로 사용할 버튼 컴포넌트입니다.

## props

- **fontSize** : string
  폰트 크기에 따라 버튼 크기가 변경됩니다.

- **type** : black, white

  - black: 버튼 background가 black인 버튼
  - white: 버튼 background가 white인 버튼

- **disabled**: boolean or 리턴값이 boolean인 함수

  - 버튼이 비활성화가 될 boolean 타입의 값을 넣어줍니다. (필요시 사용)

- 버튼의 내용은 children으로 받기 때문에 원하시는 텍스트 문구를 컴포넌트로 감싸주시면 됩니다.

- **clickEvent**: 클릭 이벤트로 실행할 함수를 props로 전달해주어야 합니다!
- -

## 사용법 예시

```
  import Button from '경로'


          <Button fontSize="50" version="black" disabled={true} clickEvent={handleClick}>
            안녕?
          </Button>
```

- 폰트 사이즈: 50px

- 버전: 버튼 바탕색이 검은색

- disabled: true (비활성화)

- clickEvent: 클릭시 handleClick 함수 실행
