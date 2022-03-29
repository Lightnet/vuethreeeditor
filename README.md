# Vue Three Editor

# Status:
  - stable and some bugs.
  - simple set up editor
  - work in progress and testing.

# Packages:
- vue
- three
- troisjs
- express
- axios
- vite
- mongoose
- cannon-es

# Port Project:
  I ported the project from react framework. Almost the same layout design. There were some changes on the ways since the code framework were different. Still follow some logics.

- https://github.com/Lightnet/threenextreact

## Test project:

- https://stackblitz.com/edit/node-s5mq5i

### Notes:
- click on editor link.
- add AmbientLight to see box or other objects. Since default to black.
- bugs in browser or not update. Select entity object > AmbientLight > param > color to update the scene to see object.
- 


# Information:
  Work In Progress!

  To develop vuejs, Troisjs and threejs editor in module design format.

  Troisjs package reduce time to develop on vuejs components. Looking the Troisjs src code that have easy coding.

# Features:
- Simple account
- Docs (work in progress)
  - entity setup prefab
  - 
- Editor
  - debug
    - lights helper not added
    - camera helper not added
  - tools
    - transform controls
      - select object to display the helper transform
      - default key from three.js transformcontrol
      - Not all geometry work as only box and plane is added.
  - project
    - project list ( added )
    - delete ( added )
    - create ( added )
    - edit ( added )
  - scene ( added )
    - scene list ( added )
    - delete ( not added )
    - update ( not added )
    - create ( not added )
    - load ( added )
      - entities load correctly
  - entity
    - save ( added )
    - load ( added )
    - update ( added )
    - delete ( added )
  - Physics ( work in progress )
    - simple cube fall
  - express ( added )
    - access ( added )
    - entity objects ( added )
    - project ( added )
    - scene ( added )
    - assets ( added )
  - material ( added )
    - simple geometry color and wireframe
  - geometry
    - box ( added )
    - plane ( added )
    - sphere ( added )
    - cylinder ( added )
  - lights ( added )
    - Tested basic lights and working some need target object or vector to work.
    - Render lights bugs not showing lights.


# Notes:
- transform controls ray overlay not select mesh due to plane select first and cube. raycasting.
- transform control and input transform ui does not update correctly
- troisjs package can render client only and not SSR server render.
  -  Bug around import and require conflicts from three and troisjs for camera orbit.
- window undefined for ssr
- script setup user create object mount inject renderer doesn't load correctly.
  - one reason is orbit camera is null
    -  work when doing some event handle as render update variables.



# Set up:
  Need to install nodejs.

```
npm install
npm run devn
```

SSR server prerender (not working with troisjs)
```
npm install
npm run ssrbuild
npm run generate
npm run devs
```
Reason is the winodw is undefined.

# Links:
- https://vuejs.org/
- https://troisjs.github.io
- https://github.com/troisjs/trois
