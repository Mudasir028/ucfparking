import { Action } from "../actions";
import { ActionType } from "../constants";

const initialState = 0;

// eslint-disable-next-line @typescript-eslint/default-param-last
const reducer = (state = initialState, action: Action): number => {
  switch (action.type) {
    case ActionType.LAST_ROW:
      return action.payload;

    default:
      return state;
  }
};

export default reducer;
