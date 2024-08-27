import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: true,
  isLoan: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      return { ...state, balance: 500, isActive: false };
    case "deposit":
      return { ...state, balance: state.balance + 150 };
    case "withdraw":
      return { ...state, balance: state.balance - 50 };
    case "loan":
      return {
        ...state,
        loan: state.loan + 5000,
        balance: state.balance + 5000,
        isLoan: false,
      };
    case "payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        isLoan: true,
      };
    case "closeAccount":
      return { ...state, isActive: true };
    default:
      throw new Error("Error");
  }
}

export default function App() {
  const [{ balance, loan, isActive, isLoan }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => {
            dispatch({ type: "openAccount" });
          }}
          disabled={isActive ? false : true}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "deposit" });
          }}
          disabled={isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            if (balance === 0) return;
            dispatch({ type: "withdraw" });
          }}
          disabled={isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            if (!isLoan) return;
            dispatch({ type: "loan" });
          }}
          disabled={isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            if (loan > 0 && balance < loan) return;
            dispatch({ type: "payLoan" });
          }}
          disabled={isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            if (balance !== 0) return;
            dispatch({ type: "closeAccount" });
          }}
          disabled={isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
