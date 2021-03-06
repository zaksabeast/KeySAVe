import { BREAKING_OPEN_FILE_1, BREAKING_OPEN_FILE_2, BREAK_KEY, DISMISS_BREAK_STATE, SCAN_FOLDER, SCAN_FOLDER_FINISH } from '../actions/breaking';
import { handleActions } from '../utils/handleAction';

const initialState = {
  file1: '',
  file2: '',
  file1Type: 'none',
  file2Type: 'none',
  breakState: 'NONE',
  reply: undefined,
  scanning: false
};

export default handleActions({
  [BREAKING_OPEN_FILE_1](state, { payload }) {
    return {
      ...state,
      file1: payload.file,
      file1Type: payload.type
    };
  },

  [BREAKING_OPEN_FILE_2](state, { payload }) {
    return {
      ...state,
      file2: payload.file,
      file2Type: payload.type
    };
  },

  [BREAK_KEY]: {
    success(state, { payload }) {
      return {
        ...state,
        breakState: 'SUCCESS',
        reply: payload
      };
    },

    error(state, { payload }) {
      return {
        ...state,
        breakState: 'ERROR',
        reply: payload
      };
    },
  },

  [DISMISS_BREAK_STATE]() {
    return initialState;
  },

  [SCAN_FOLDER](state) {
    return {
      ...state,
      scanning: true
    };
  },

  [SCAN_FOLDER_FINISH](state) {
    return {
      ...state,
      scanning: false
    };
  },
  REHYDRATE(state, { payload }) {
    if (payload.reducer !== 'breaking') return state;

    return {
      ...state,
      ...payload.state,
      scanning: false
    };
  }
}, initialState);
