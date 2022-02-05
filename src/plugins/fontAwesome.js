import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faArrowRightToBracket,
  faArrowUpRightFromSquare,
  faBan,
  faBurger,
  faChartLine,
  faCheck,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faEye,
  faEyeSlash,
  faHandHoldingDollar,
  faHeart,
  faPencil,
  faPercent,
  faTrashCan,
  faUser,
  faUsers,
  faUtensils,
  faXmark
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import Vue from "vue"

library.add(faChevronLeft)
library.add(faChevronRight)
library.add(faChevronDown)
library.add(faArrowUpRightFromSquare)
library.add(faCheck)
library.add(faPencil)
library.add(faTrashCan)
library.add(faBan)
library.add(faPercent)
library.add(faChartLine)
library.add(faUsers)
library.add(faBurger)
library.add(faHandHoldingDollar)
library.add(faUtensils)
library.add(faHeart)
library.add(faUser)
library.add(faArrowRightToBracket)
library.add(faXmark)
library.add(faEye)
library.add(faEyeSlash)
Vue.component("font-awesome-icon", FontAwesomeIcon)
