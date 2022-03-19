# Vue Three Editor

# Information:
  Work In Progress!

  To develop vuejs threejs editor in module design format.

# Notes:
- troisjs package can render client only and not SSR server render.
  -  Bug around import and require conflicts from three and troisjs for camera orbit.

# Set up:
  Need to install nodejs.

```
npm install
npm run dev
```

SSR server prerender (not working with troisjs)
```
npm install
npm run ssrbuild
npm run generate
npm run devs
```

# Links:
- https://vuejs.org/
- https://troisjs.github.io
- https://github.com/troisjs/trois
