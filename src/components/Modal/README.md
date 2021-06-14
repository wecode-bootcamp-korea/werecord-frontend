# Modal Component

- 조건부 랜더링으로 Modal을 render시킵니다.

## props

- **isOn** : boolean
  모달의 열림/닫힘 상태값을 부모에게서 전달받습니다.

- **setOff** : function
  클릭시 isOn의 상태값을 바꿔줍니다. handleModal 함수를 props으로 전달해주어야 합니다.

```
const [isOn, setIsOn] = useState(false);

const handleModal = e => {
  const clickedInside = e.target.closest('.modal');
  const clickedBtn = e.target.closest('.closeBtn');

  if (clickedInside) {
    if (clickedBtn) {
      setIsOn(false);
    }
    if (!clickedBtn) {
      return;
    }
  } else {
    setIsOn(false);
  }
};
```

- **height** : string
  모달의 높이를 string값으로 전달합니다. (px까지 전달해주어야합니다.)

- **children** (optional)
  모달 안에 들어갈 세부 UI들을 children으로 받습니다.

ex)

```
{isOn &&
<Modal isOn={isOn} setOff={handleModal} height="600px">
  <div>hello</div>
</Modal>}
```
