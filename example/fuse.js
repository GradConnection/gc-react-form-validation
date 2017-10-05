const { FuseBox, SassPlugin, CSSPlugin, WebIndexPlugin, BabelPlugin, UglifyJSPlugin, SVGPlugin } = require("fuse-box");

const ENV_DEV = 'development';
const env = process.env.NODE_ENV || 'development';

const fuse = FuseBox.init({
    homeDir: "./",
    output: "build/$name.js",
    log: true,
    debug: true,
    plugins : [
      BabelPlugin({
        presets: ["react", "es2015"]
      }),
      WebIndexPlugin({
        title: "gc-react-form-validation",
        template: "template.html"
      }),
      [SassPlugin(), CSSPlugin()],
      CSSPlugin(),
      SVGPlugin(),
      env !== ENV_DEV && UglifyJSPlugin()
    ]
});

if (env === ENV_DEV) fuse.dev({
  port: 6000
});

const bundle = fuse.bundle("app")
    .instructions(`>index.jsx`);

if (env === ENV_DEV) {
  bundle
    .watch()
    .hmr();
}

fuse.run();
