# Repo Finder
## React - Typescript - Tailwind - DaisyUI
## Demo
[Repo Finder](https://repo-finder-sigma.vercel.app/)

## Features
- Find Github user
- Find their repositories
- Simple caching
- In sec

## Clarity
Search your favorite users Github and their repositories in a sec. That's it, with minimal design you will not getting distracted by other content

## Quick Start
- React 19.1
- Tailwindcss 4.1
- Daisyui 5

### How to install
- Clone this repo
- npm i
- npm run dev

thats it, you ready to go


## API Usage - GithubAPI
- /search/users?[username]&per_page=[total_data]
- /users/[username]/repos

This project is using public API withour credential, and the request will be limit for only 60req/minute
## Folder Directories 
```
...
src
 |--- api
 |--- components
 |--- lib
 |--- types
```
### api
Every request from API to GithubAPI will be stored here. This project only use 2 GithubAPI, ```searching for user``` and ```get user repositories```. The request from GithubAPI is limited only 60 request due to public request (without credentials)
### components
All components will be saved here, shared component, usable component will be stored here.
### lib
Is use for store function that used in several components, example for checking value of the object. For example this project is using native JS ```fecth```, if using axios all config axios will be stored here.
### types
All data that used on project will be declared here, response, request, and props.

### Whats hot?
When accessing user repositories, all repositories that already called before will be stored on the ```Map()``` and can be called later if the same user are clicked to see repositories
```
...
// cache.ts
export  const  repoCache  =  new  Map<string, IGithubRepo[]>();
...

// users.tsx - calling user respositories
if (repoCache.has(selectedUser)) {
 setIsLoading(false);
 setIsVisible(true);
 return; // return function if username exist on Map
}
...

try {
	const  repositories  =  await  getUserRepositories(selectedUser); // calling API
	repoCache.set(selectedUser, repositories);
...
```
when username already stored into the ```Map()```  no need to call the API, but if there is no username stored on the ```Map()``` request will be send and ```repositories``` will be stored on state and ```Map()```