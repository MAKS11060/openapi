import*as e from"react";import*as t from"react/jsx-runtime.js";import*as o from"immutable";import*as r from"react-immutable-proptypes";import*as i from"@swagger-api/apidom-json-pointer";var n={d:(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},s={};n.d(s,{Z:()=>S});const a=(e=>{var t={};return n.d(t,e),t})({useEffect:()=>e.useEffect});const p=(e=>{var t={};return n.d(t,e),t})({jsx:()=>t.jsx,jsxs:()=>t.jsxs}),c=({getComponent:e,editorPreviewSwaggerUIActions:t})=>{const o=e("BaseLayout",!0);return(0,a.useEffect)((()=>()=>{t.previewUnmounted()}),[t]),(0,p.jsx)("div",{className:"swagger-editor__editor-preview-swagger-ui",children:(0,p.jsx)(o,{})})};const d=(e=>{var t={};return n.d(t,e),t})({List:()=>o.List});(e=>{var t={};n.d(t,e)})({});const u=({path:e,content:t,showButton:o,editorPreviewSwaggerUIActions:r})=>{const i=t=>{t.stopPropagation(),r.jumpToPath(e.toJS())},n=(0,p.jsx)("div",{role:"button",tabIndex:0,onClick:i,onKeyDown:i,children:(0,p.jsx)("img",{src:"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDI0IDI0IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxwYXRoIGQ9Ik0xOSA3djRINS44M2wzLjU4LTMuNTlMOCA2bC02IDYgNiA2IDEuNDEtMS40MUw1LjgzIDEzSDIxVjd6Ii8+Cjwvc3ZnPgo=",className:"view-line-link",title:"Jump to definition",alt:"Jump to path"})});return t?(0,p.jsxs)("span",{role:"button",tabIndex:0,onClick:i,onKeyDown:i,children:[o&&n,t]}):(0,p.jsx)("div",{children:n})};u.defaultProps={path:(0,d.List)(),content:null,showButton:!1};const m=u,w=(e,t)=>({getComponent:o,editorSelectors:r})=>{const i=o("EditorPreviewSwaggerUI",!0);return r.selectIsContentTypeOpenAPI()?(0,p.jsx)(i,{}):(0,p.jsx)(e,{...t})},l=()=>({type:"editor_preview_swagger_ui_preview_unmounted"});const g=(e=>{var t={};return n.d(t,e),t})({compile:()=>i.compile}),j=({path:e})=>({type:"editor_preview_swagger_ui_jump_to_path_started",payload:e}),P=({position:e,path:t,jsonPointer:o})=>({type:"editor_preview_swagger_ui_jump_to_path_success",payload:e,meta:{jsonPointer:o,path:t}}),I=({error:e,path:t,jsonPointer:o})=>({type:"editor_preview_swagger_ui_jump_to_path_failure",error:!0,payload:e,meta:{jsonPointer:o,path:t}}),h=e=>async t=>{const{editorActions:o,editorPreviewSwaggerUIActions:r}=t;let i="";r.jumpToPathStarted({path:e});try{i=(0,g.compile)(e);const t=await o.getJsonPointerPosition(i);if(t.error)throw t;const{payload:n}=t,s=await o.setPosition(n);if(s.error)throw s;return r.jumpToPathSuccess({path:e,jsonPointer:i,position:n})}catch(n){return r.jumpToPathFailure({error:n,path:e,jsonPointer:i})}},v=e=>{let t=null;return(o,r)=>(...i)=>{const n=o(...i);return n===t||(e(o,r)(...i),t=n),n}},y=v(((e,t)=>({content:e})=>{const{specActions:o,editorSelectors:r}=t;r.selectIsContentTypeOpenAPI()&&o.updateSpec(e,"swagger-editor")})),_=v(((e,t)=>()=>{t.specActions.updateSpec("","swagger-editor")})),S=()=>({components:{EditorPreviewSwaggerUI:c,JumpToPath:m},wrapComponents:{EditorPreview:w},statePlugins:{editor:{wrapActions:{detectContentTypeSuccess:y}},editorPreviewSwaggerUI:{actions:{previewUnmounted:l,jumpToPath:h,jumpToPathStarted:j,jumpToPathSuccess:P,jumpToPathFailure:I},wrapActions:{previewUnmounted:_}}}});var x=s.Z;export{x as default};
//# sourceMappingURL=index.js.map