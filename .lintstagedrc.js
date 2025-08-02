module.exports = {
  '*.{js,ts}': ['prettier --write', 'eslint --fix', 'git add'],
  '*.{json,md,yml,yaml}': ['prettier --write', 'git add'],
};
