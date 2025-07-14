# Angular Import Organizer

Automatically organize all imports in your Angular project files following clear categories and conventions. This Visual Studio Code extension helps you keep your code clean and maintainable by sorting and grouping imports in TypeScript files.

## Features

- Sorts and groups imports in Angular TypeScript files.
- Categorizes imports: Angular Core, third-party libraries, interfaces/types, constants/configs, services, helpers, components, and unknown.
- Inserts category headers for each group of imports.
- Works with a single command from the editor.

## Installation

1. Clone or download this repository.
2. Run `npm install` to install dependencies.
3. Compile the extension with `npm run compile`.
4. Open the folder in VS Code and press `F5` to launch in development mode.

## Usage

1. Open a TypeScript file in your Angular project.
2. Run the command `Organize imports in this file` from the command palette (`Ctrl+Shift+P`).
3. Imports will be automatically sorted and grouped.

## Configuration

Currently, the extension does not expose customizable settings. All organization rules are predefined.

## Contributing

Contributions are welcome! See the [CONTRIBUTING.md](CONTRIBUTING.md) file for details.

## Known Issues

- Only organizes `.ts` files that are not test files (`.spec.ts`).
- Does not support files outside Angular projects or those not following standard import conventions.

## Release Notes

See the [CHANGELOG.md](CHANGELOG.md) file for the change history.

---

**Enjoy cleaner and more organized code in your Angular projects!**
