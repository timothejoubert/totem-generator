## CONCEPT
Totem generator is a tool build for graphic designer. It's used to ...

## HOW TO USE
- add new svg file in `assets/svg/[bodySection]/name.svg`
- Add `fill="currentColor"` inside each svg shape to allow color customization
- add corresponding import in `assets/svg/index.ts` file
- Each `[bodySection]` folder has to have same file length
- Update 

## TODO

### Controls to add 
- [ ] Body section Gap
- [ ] Body img size
- [X] Individual body section controls (color, bg, shuffle)
- [ ] Drag & drop order

### Code improvement
- [X] Create git repo
- [ ] Detect how many file length there is in `assets/svg/[bodyPart]` during runtime
- [ ] Avoid to use `svg/index.ts` or auto generate the file
- [ ] Create separate files forEach DOM logic

### Features
- [X] Add saveFile as png 
- [ ] Display all controls panel with a button or a keyDown
- [ ] Manage image set (add, remove, select range...)

### Design 
- Improve individual section control
