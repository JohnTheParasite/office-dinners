import { config } from "@vue/test-utils"
import AuthService from "@/services/authService"

config.mocks["$authService"] = AuthService // создать замоканый
