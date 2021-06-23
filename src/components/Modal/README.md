# Modal Component

- 조건부 랜더링으로 Modal을 render시킵니다.

## props

- **setOff** : function
  클릭시 isOn의 상태값을 바꿔줍니다. handleModal 함수를 props으로 전달해주어야 합니다.

- **height** : string
  모달의 높이를 string값으로 전달합니다. (px까지 전달해주어야합니다.)

- **children** (optional)
  모달 안에 들어갈 세부 UI들을 children으로 받습니다.

ex)

```
const [isModal, setIsModal] = useState(false);
{isOn &&
<Modal setOff={setIsModal} height="600px">
  <div>hello</div>
</Modal>}
```
