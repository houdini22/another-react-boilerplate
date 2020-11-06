// ------------------------------------
// Constants
// ------------------------------------
export const OPEN_MODAL = 'modal::open-modal'
export const CLOSE_MODAL = 'modal::close-modal'

// ------------------------------------
// Actions
// ------------------------------------
const openModal = ({ id, component }) => (dispatch) => {
  dispatch({
    type: OPEN_MODAL,
    payload: {
      id,
      component,
    },
  })
}

const closeModal = (id) => (dispatch) => {
  dispatch({
    type: CLOSE_MODAL,
    payload: {
      id,
    },
  })
}

export const actions = {
  openModal,
  closeModal,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [OPEN_MODAL]: (state, { payload: { id, component } }) => {
    return {
      ...state,
      modals: [
        ...state.modals,
        {
          id,
          component,
        },
      ],
    }
  },
  [CLOSE_MODAL]: (state, { payload }) => {
    return {
      ...state,
      modals: state.modals.filter(({ id }) => {
        return payload.id !== id
      }),
    }
  },
}

// ------------------------------------
// Reducer
// ------------------------------------

const getInitialState = () => ({
  modals: [],
})

export default function userReducer(state = getInitialState(), action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

// selectors

const getState = (state) => state['modal']

export const selectors = {
  getState,
}
