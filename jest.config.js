module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  collectCoverageFrom: ["src/**/*.{js,jsx,vue}"],
  coveragePathIgnorePatterns: ["/node_modules/", "/coverage/", "/dist/"]
}
