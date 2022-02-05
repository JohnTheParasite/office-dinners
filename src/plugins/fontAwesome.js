import { library } from "@fortawesome/fontawesome-svg-core"
import { faArrowUpRightFromSquare, faCheck, faChevronDown, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import Vue from "vue"

library.add(faChevronLeft)
library.add(faChevronRight)
library.add(faChevronDown)
library.add(faArrowUpRightFromSquare)
library.add(faCheck)
Vue.component("font-awesome-icon", FontAwesomeIcon)
