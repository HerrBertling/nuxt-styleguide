function normalize(states) {
  if (!states) {
    return [];
  }

  if (!Array.isArray(states)) {
    return [states];
  }

  return states;
}

module.exports = function(source, map) {
  try {
    const states = normalize(JSON.parse(source)).map((state) => {
      if (!state.slots) {
        state.slots = {};
      }

      if (state.content && !state.slots.default) {
        state.slots.default = state.content;
      }

      return state;
    });

    this.callback(
      null,
      `
      module.exports = function(Component) {
          if (!Component.options.__styleguide) {
              Component.options.__styleguide = {};
          }
          Component.options.__styleguide.states = ${JSON.stringify(states)}
      }`,
      map
    );
  } catch (e) {
    this.callback(e);
  }
};
