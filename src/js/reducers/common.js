import React from 'react'
import { actions as modalActions } from './modal'
import { uuid } from '../utils/uuid'
import { ConnectionErrorModal } from '../components/modals/ConnectionErrorModal'

const { openModal, closeModal } = modalActions

// constants
export const CONNECTION_ERROR_MODAL_VISIBLE =
  'common::connection_error_modal_visible'
export const SET_LAYOUT_OPTION = 'common::set-layout-option'

// actions

const setConnectionErrorModalVisible = value => dispatch => {
  dispatch({ type: CONNECTION_ERROR_MODAL_VISIBLE, payload: value })

  const id = uuid()

  dispatch(
    openModal({
      id,
      component: (
        <ConnectionErrorModal close={() => dispatch(closeModal(id))} id={id} />
      ),
    }),
  )
}

const setLayoutOption = (name, value) => dispatch => {
  dispatch({ type: SET_LAYOUT_OPTION, payload: { name, value } })
}

export const actions = {
  setConnectionErrorModalVisible,
  setLayoutOption,
}

// action handlers

const ACTION_HANDLERS = {
  [CONNECTION_ERROR_MODAL_VISIBLE]: state => {
    return {
      ...state,
      connectionErrorModalVisible: state['connectionErrorModalVisible'] + 1,
    }
  },
  [SET_LAYOUT_OPTION]: (state, { payload: { name, value } }) => {
    return {
      ...state,
      layout: {
        ...state['layout'],
        [name]: value,
      },
    }
  },
}

// reducers

const initialState = {
  connectionErrorModalVisible: 0,
  layout: {
    disableHeader: false,
    disableFooter: false,
    disableSidebar: false,
    floatingSidebar: false,
    sidebarExpanded: false,
  },
}

export default function userReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

// selectors

const getState = state => state['common']
const getIsConnectionErrorModalVisible = state =>
  getState(state)['connectionErrorModalVisible']
const getLayout = state => getState(state)['layout']

export const selectors = {
  getState,
  getIsConnectionErrorModalVisible,
  getLayout,
}
