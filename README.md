# Over 18

A joke Electron app for Linux that mocks California's Assembly Bill 1043 by providing a simple age attestation mechanism.

## Features
- Radio buttons to select if the user is over or under 18
- Dropdown for under-18 users: Under 13, Under 16, Under 18
- Saves selection to `~/.age` in `.env` style (e.g. `Over18=true` or `Over18=false\nage=15`)
- Reads existing `.age` file on launch and restores state
- Menu:
  - **File**: Save, Exit (warns on unsaved changes)
  - **Laws**: AB 1043 info, Prop 65 warning
  - **Help**: "18" page (prints 18 in 36pt font, with Print button), About (with GPL 2 license)
- Flatpak manifest for sandboxed packaging (with home directory access)

## Usage
1. Install dependencies:
   ```sh
   npm install
   ```
2. Run the app:
   ```sh
   npm start
   # or
   npx electron .
   ```

## Flatpak
- See `flatpak/org.over18.Over18.yml` for build instructions.
- The app requests `--filesystem=home` to write the `.age` file.

## License
GPL v2. See LICENSE.txt.

## Disclaimer
This app is a joke and not intended for real compliance. For a more serious take, see [Ageless Linux](https://agelesslinux.org/).
