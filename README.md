# Metro Performance Monitor Website

This is the front end React App for our performance monitor tool. 


## Getting Started

1. Clone & install nodes packages:
```
git clone https://github.com/metro-ontime/frontend.git
cd frontend
npm i
```
2. To run live development server: `npm run dev`
3. To build and export static web app to 'out' directory:
```
npm run build
npm run export
```

**Note:** this web app is hosted on GitHub Pages

4. So when building & exporting for GitHub Pages, instead run:
```
npm run build:gh-pages
npm run export:gh-pages
npm run deploy
```
**Note:** in order to publish to gh-pages branch, master branch must be up-to-date.

## Coding Style

We use ESLint with the AirBnB javascript/react Style Guide, available here:
https://github.com/airbnb/javascript/tree/master/react
