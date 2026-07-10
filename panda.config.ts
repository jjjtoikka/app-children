import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";
import orange from "@park-ui/panda-preset/colors/orange";
import neutral from "@park-ui/panda-preset/colors/neutral";

export default defineConfig({
  preflight: true,
  include: ["./app/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
  jsxFramework: "react",
  presets: [
    createPreset({
      accentColor: orange,
      grayColor: neutral,
      radius: "lg",
    }),
  ],
  plugins: [
    {
      name: "Remove Panda Preset Colors",
      hooks: {
        "preset:resolved": ({ utils, preset, name }) =>
          name === "@pandacss/preset-panda"
            ? utils.omit(preset, [
                "theme.tokens.colors",
                "theme.semanticTokens.colors",
              ])
            : preset,
      },
    },
  ],
  theme: {
    extend: {
      tokens: {
        fonts: {
          sans: { value: "'Nunito', 'Comic Neue', sans-serif" },
          display: { value: "'Fredoka', 'Nunito', sans-serif" },
        },
      },
    },
  },
});
