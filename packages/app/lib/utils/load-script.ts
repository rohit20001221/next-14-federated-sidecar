export const loadRemoteScript = async (props: {
  scope: string;
  module: string;
}) => {
  const { scope, module } = props;

  // @ts-ignore
  await __webpack_init_sharing__("default");
  // @ts-ignore
  const container = global[scope];

  // @ts-ignore
  if (!global.___INITIALIZED_SCOPES.includes(scope)) {
    try {
      await container.init({
        react: {
          default: {
            get: () => () => require("react"),
            loaded: 1,
          },
        },
      });

      // @ts-ignore
      global.___INITIALIZED_SCOPES.push(scope);
    } catch {}
  }

  const factory = await container.get(module);
  const m = factory();

  return m;
};
