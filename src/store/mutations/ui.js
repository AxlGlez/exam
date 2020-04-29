import set from 'lodash/set'

export default {
  deleteNotification (state, notification) {
    state.ui.notifications = state.ui.notifications.filter(value => value.datetime !== notification)
  },
  addNotification (state, notification) {
    state.ui.notifications = [...state.ui.notifications, notification]
  },
  toggleSidebar (state) {
    state.ui.sidebar = !state.ui.sidebar
  },
  setLoading (state, { accessor, value = true }) {
    set(state, `${accessor}.loading`, value)
  },
  toggleActiveMenu (state, menu) {
    state.ui.activeMenus = state.ui.activeMenus.includes(menu)
      ? state.ui.activeMenus.filter(currentMenu => currentMenu !== menu)
      : [ ...state.ui.activeMenus, menu ]
  },
  cleanActiveMenus (state) {
    state.ui.activeMenus = []
  },
  getTheActiveMenu (state, currentPath) {
    // const ACCESSES_THAT_ARE_NOT_SHOWN_IN_THE_MENU = ['Acciones', 'Detalles']
    // let menu = state.authentication.views.reduce((accum, value) => {
    //   const parsedView = {
    //     to: value.path
    //   }
    //   if (!accum.some(currentView => currentView.title === value.title)) {
    //     if (!ACCESSES_THAT_ARE_NOT_SHOWN_IN_THE_MENU.includes(value.title)) accum.push(parsedView)
    //   } else {
    //     accum.push(parsedView)
    //   }
    //   return accum
    // }, [])
    // let activeoption = menu.find((element) => element.to === currentPath)
    // if (activeoption) state.ui.activeoption = activeoption.to
  }
}
