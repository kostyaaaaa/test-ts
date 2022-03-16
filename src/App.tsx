import React, {
  Fragment,
  useState,
  Component,
  CSSProperties,
  ReactNode,
  ChangeEvent,
  useEffect,
} from "react";
import { useDispatch } from "react-redux";
import { add } from "./funcOverload";

// TYPES AND INTERFACES

interface IButtonInterface {
  onClick: () => void;
  children: ReactNode | Array<ReactNode>;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
}

interface IButtonState {
  counter: number;
}

type UserType = {
  firstName: string;
  lastName: string;
};

// FUNCTIONAL COMPONENTS
const Button = ({
  children,
  onClick,
  disabled = false,
  style = {},
  className = "",
}: IButtonInterface) => {
  return (
    <button onClick={onClick} disabled={disabled} style={style} className={className}>
      {children}
    </button>
  );
};

const UsersPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const addTwo = add(2);
    console.log(add(2, 4), addTwo(2));
  }, []);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => response.json())
      .then((json) => dispatch({ type: "FETCH_USER_DATA", payload: json }));
  }, []); // eslint-disable-line

  return <div></div>;
};

// CLASS COMPONENTS

class AlternativeButton extends Component<IButtonInterface, IButtonState> {
  state: IButtonState = {
    counter: 0,
  };

  incrementCounter = () => {
    this.setState(({ counter }: IButtonState) => ({
      counter: ++counter,
    }));
  };

  setCounter = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ counter: +event.target.value });
  };

  render() {
    const { children, disabled = false, style = {}, className = "" } = this.props;
    const { counter } = this.state;
    return (
      <Fragment>
        <input onChange={this.setCounter} />
        <button
          onClick={this.incrementCounter}
          disabled={disabled}
          style={style}
          className={className}
        >
          {children} {counter}
        </button>
      </Fragment>
    );
  }
}

function App() {
  const [state, setState] = useState<UserType | null>(null);
  const handleClick = (): void => {
    console.log(state);
    setState({ firstName: "John", lastName: "Smith" });
  };

  return (
    <Fragment>
      <Button
        onClick={handleClick}
        style={{
          backgroundColor: "red",
        }}
        className="app-button"
      >
        Click me
      </Button>
      <AlternativeButton
        onClick={handleClick}
        style={{
          backgroundColor: "blue",
        }}
        className="app-button"
      >
        Click me
      </AlternativeButton>
      <UsersPage />
    </Fragment>
  );
}

export default App;
