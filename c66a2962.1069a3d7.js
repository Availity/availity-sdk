(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{102:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return l})),t.d(n,"metadata",(function(){return o})),t.d(n,"toc",(function(){return c})),t.d(n,"default",(function(){return b}));var r=t(3),a=t(7),i=(t(0),t(111)),l={title:"Environment Vars"},o={unversionedId:"resources/env-var",id:"resources/env-var",isDocsHomePage:!1,title:"Environment Vars",description:"Get run-time environment variables for immutable builds",source:"@site/docs/resources/env-var.md",slug:"/resources/env-var",permalink:"/sdk-js/resources/env-var",editUrl:"https://github.com/availity/sdk-js/edit/master/docusaurus/docs/resources/env-var.md",version:"current",sidebar:"someSidebar",previous:{title:"Analytics",permalink:"/sdk-js/resources/analytics"},next:{title:"Messaging",permalink:"/sdk-js/resources/messaging"}},c=[{value:"Install",id:"install",children:[{value:"NPM",id:"npm",children:[]},{value:"Yarn",id:"yarn",children:[]}]},{value:"Usage",id:"usage",children:[{value:"envVar (default export)",id:"envvar-default-export",children:[]},{value:"setEnvironments",id:"setenvironments",children:[]},{value:"getSpecificEnv",id:"getspecificenv",children:[]},{value:"setSpecificEnvironments",id:"setspecificenvironments",children:[]}]}],s={toc:c};function b(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},s,t,{components:n,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Get run-time environment variables for immutable builds"),Object(i.b)("p",null,Object(i.b)("a",{parentName:"p",href:"https://www.npmjs.com/package/@availity/env-var"},Object(i.b)("img",{parentName:"a",src:"https://img.shields.io/npm/v/@availity/env-var.svg?style=for-the-badge",alt:"Version"}))),Object(i.b)("h2",{id:"install"},"Install"),Object(i.b)("h3",{id:"npm"},"NPM"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash"},"$ npm install @availity/env-var\n")),Object(i.b)("h3",{id:"yarn"},"Yarn"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash"},"$ yarn add @availity/env-var\n")),Object(i.b)("h2",{id:"usage"},"Usage"),Object(i.b)("h3",{id:"envvar-default-export"},"envVar (default export)"),Object(i.b)("p",null,"Given an object of possible values and get back the value for the current environment."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"import envVar from '@availity/env-var';\n\nconst myEnvVal = envVar(valuesObject[, windowOverride]);\n\nexport default myEnvVal;\n")),Object(i.b)("h4",{id:"required-params"},"Required params"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"valuesObject: An object with keys which match the name of the potential environments. The value of the give for the current environment will be returned")),Object(i.b)("h4",{id:"optional-params"},"Optional params"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"windowOverride: String or Window Object which can be used to override the window which is used to determine the current hostname (which is used to determine the current environment)",Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},"When string, the string will be takes an a fully qualified URL and the hostname will be parsed from it."),Object(i.b)("li",{parentName:"ul"},"When Window Object, the location hostname will be used."))),Object(i.b)("li",{parentName:"ul"},"defaultVar: String or Object which will be the default value when the given var is not found. If not given, then\nwill use the ",Object(i.b)("inlineCode",{parentName:"li"},"local")," param in the ",Object(i.b)("inlineCode",{parentName:"li"},"valuesObject")," var.")),Object(i.b)("h4",{id:"example"},"Example"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"import envVar from '@availity/env-var';\n\n/*\ndepending on which environment this is ran in, myEnvVal would be something different\nin prod: myEnvVal will be '123'\nin qa: myEnvVal will be '234'\nin test: myEnvVal will be '345' (defaults to local if env is not found)\n*/\nconst myEnvVal = envVar({ prod: '123', qa: '234', local: '345' });\n\nexport default myEnvVal;\n")),Object(i.b)("h3",{id:"setenvironments"},"setEnvironments"),Object(i.b)("p",null,"Set the potential environments and the tests used to determine which environment the code is currently being executed in."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"import { setEnvironments } from '@availity/env-var';\n\nsetEnvironments(possibleEnvironments[, replaceExisting]);\n")),Object(i.b)("h4",{id:"required-params-1"},"Required params"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"possibleEnvironments: An object with keys which match the name of the potential environments and the values are the tests which are ran to determine if the environment is the current one.")),Object(i.b)("p",null,"These tests can be"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"String: A string will be used to check an exact match."),Object(i.b)("li",{parentName:"ul"},"Regular Expression: A regex will be ",Object(i.b)("inlineCode",{parentName:"li"},"test"),"d with the domain."),Object(i.b)("li",{parentName:"ul"},"Function: The function will be called and the result should be a boolean indicating if the environment is the current environment."),Object(i.b)("li",{parentName:"ul"},"Array: An array containing any of the above types.")),Object(i.b)("h4",{id:"optional-params-1"},"Optional params"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"replaceExisting: Boolean, when true possibleEnvironments will replace the existing environments instead of merging.")),Object(i.b)("h4",{id:"example-1"},"Example"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"import { setEnvironments } from '@availity/env-var';\n\nsetEnvironments({\n    local: ['127.0.0.1', 'localhost'],\n    test: [/^t(?:(?:\\d\\d)|(?:est))-apps$/],\n    qa: [/^q(?:(?:\\d\\d)|(?:ap?))-apps$/],\n    prod: [/^apps$/],\n    myEnv: ['custom-stuff-here'],\n});\n")),Object(i.b)("h3",{id:"getspecificenv"},"getSpecificEnv"),Object(i.b)("p",null,"Get the specific current environment, without rolling up to the general environment. Whereas ",Object(i.b)("inlineCode",{parentName:"p"},"envVar")," treats the ",Object(i.b)("inlineCode",{parentName:"p"},"t01")," environment as ",Object(i.b)("inlineCode",{parentName:"p"},"test"),", for example, ",Object(i.b)("inlineCode",{parentName:"p"},"getSpecificEnv")," returns ",Object(i.b)("inlineCode",{parentName:"p"},"'t01'")," for the ",Object(i.b)("inlineCode",{parentName:"p"},"t01")," environment."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"import { getSpecificEnv } from '@availity/env-var';\n\nconst specificEnv = getSpecificEnv([windowOverride]);\n")),Object(i.b)("h4",{id:"required-params-2"},"Required params"),Object(i.b)("p",null,"None"),Object(i.b)("h4",{id:"optional-params-2"},"Optional params"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"windowOverride: String or Window Object which can be used to override the window which is used to determine the current hostname (which is used to determine the current environment)",Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},"When string, the string will be takes an a fully qualified URL and the hostname will be parsed from it."),Object(i.b)("li",{parentName:"ul"},"When Window Object, the location hostname will be used.")))),Object(i.b)("h4",{id:"example-2"},"Example"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"import { getSpecificEnv } from '@availity/env-var';\n\n/*\ndepending on the environment this code runs in, specificEnv would be something different,\nlike 't01' or 'stg' or 'prod'\n*/\nconst specificEnv = getSpecificEnv();\n")),Object(i.b)("h3",{id:"setspecificenvironments"},"setSpecificEnvironments"),Object(i.b)("p",null,"Set the tests that will be used to determine the specific environment the code is currently being executed in."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"import { setSpecificEnvironments } from '@availity/env-var';\n\nsetSpecificEnvironments(possibleEnvironments[, replaceExisting]);\n")),Object(i.b)("h4",{id:"required-params-3"},"Required params"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"possibleEnvironments: An array of objects with the following keys:",Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},"regex: the regular expression to match against the current subdomain"),Object(i.b)("li",{parentName:"ul"},"fn: the function to run to return the name of the environment as a string")))),Object(i.b)("p",null,"The code will iterate through the objects, matching the subdomain against the ",Object(i.b)("inlineCode",{parentName:"p"},"regex"),". If the regex matches, the code calls the corresponding ",Object(i.b)("inlineCode",{parentName:"p"},"fn"),", passing an object containing the match (capturing groups), subdomain, and pathname. The iteration stops when it receives a non-empty answer from a function or when it reaches the end, in which case it returns ",Object(i.b)("inlineCode",{parentName:"p"},"'local'"),"."),Object(i.b)("h4",{id:"optional-params-3"},"Optional params"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"replaceExisting: Boolean, when true possibleEnvironments will replace the existing environments instead of merging.")),Object(i.b)("h4",{id:"example-3"},"Example"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"import { setSpecificEnvironments } from '@availity/env-var';\n\nsetSpecificEnvironments([\n    {\n        regex: /^(?:(.*)-)?apps$/,\n        fn: (options) => options.match[1] || 'prod',\n    },\n    {\n        regex: /.*?\\.(?:av|aw|gc)(n|p)$/,\n        fn: (options) => options.subdomain || options.pathname.split('/')[2],\n    },\n]);\n")))}b.isMDXComponent=!0},111:function(e,n,t){"use strict";t.d(n,"a",(function(){return p})),t.d(n,"b",(function(){return d}));var r=t(0),a=t.n(r);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=a.a.createContext({}),b=function(e){var n=a.a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},p=function(e){var n=b(e.components);return a.a.createElement(s.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},u=a.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),p=b(t),u=r,d=p["".concat(l,".").concat(u)]||p[u]||m[u]||i;return t?a.a.createElement(d,o(o({ref:n},s),{},{components:t})):a.a.createElement(d,o({ref:n},s))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,l=new Array(i);l[0]=u;var o={};for(var c in n)hasOwnProperty.call(n,c)&&(o[c]=n[c]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var s=2;s<i;s++)l[s]=t[s];return a.a.createElement.apply(null,l)}return a.a.createElement.apply(null,t)}u.displayName="MDXCreateElement"}}]);