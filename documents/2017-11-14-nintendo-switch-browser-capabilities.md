---
title:      Nintendo Switch browser capabilities
date:       2017-11-14
tags:       gaming, research
tldr:       Don't get your hopes up
color:      red
published:  true
---

Before the Switch, Nintendo had a nifty HTML5 framework for game development called Nintendo Web Framework. It used to have its own page on Wikipedia, no idea where it disappeared to.

Anyhoo, I was looking forward to its return so I could make games for the Switch using my existing skillset. Due to Nintendo's enthusiasm for the Unity and Unreal game engines, it doesn't seem like that's happening anytime soon if ever, much to the chagrin of aspiring game developers (and Switch owners) like myself. However, I was curious to know what the built-in browser is capable of. Here's [what I found](http://html5test.com/s/21ae2339d0366534.html "Nintendo Switch browser HTML5 test"), with my Switch's OS on version `4.0.1`:



### Parsing Rules
- ✅ `<!DOCTYPE html>` triggers standards mode
- ✅ HTML5 tokenizer
- ✅ HTML5 tree building
- ✅ Parsing inline SVG
- ✅ Parsing inline MathML



### Elements
- ✅ Embedding custom non-visible data

#### New or modified elements
- ✅ Section elements
  - ✅ `section` element
  - ✅ `nav` element
  - ✅ `article` element
  - ✅ `aside` element
  - ✅ `header` element
  - ✅ `footer` element
- ✅ Grouping content elements
  - ✅ `main` element
  - ✅ `figure` element
  - ✅ `figcaption` element
  - ✅ reversed attribute on the `ol` element
- ⚪️ Text-level semantic elements
  - ❌ download attribute on the `a` element
  - ✅ ping attribute on the `a` element
  - ✅ `mark` element
  - ✅ `ruby`, `rt`, and `rp` elements
  - ❌ `time` element
  - ❌ `data` element
  - ❌ `wbr` element
- ⚪️ Interactive elements
  - ✅ `details` element
  - ✅ `summary` element
  - ❌ `menu` element of type `toolbar`
  - ❌ `menu` element of type `context`
  - ❌ `dialog` element

#### Global attributes or methods
- ✅ `hidden` attribute
- ✅ Dynamic markup insertion
  - ✅ `outerHTML` property
  - ✅ `insertAdjacentHTML` function



### Forms
#### Field types
- ✅ `input type=text`
  - ✅ Minimal element support
  - ✅ Selection Direction
- ✅ `input type=search`
  - ✅ Minimal element support
- ✅ `input type=tel`
 - ✅ Minimal element support
- ✅ `input type=url`
  - ✅ Minimal element support
  - ✅ Field validation
- ✅ `input type=email`
  - ✅ Minimal element support
  - ✅ Field validation
- ❌ `input type=date`
  - ❌ Minimal element support
  - ❌ Custom user-interface
  - ❌ Value sanitization
  - ❌ `min` attribute
  - ❌ `max` attribute
  - ❌ `step` attribute
  - ❌ `stepDown()` method
  - ❌ `stepUp()` method
  - ❌ `valueAsDate()` method
  - ❌ `valueAsNumber()` method
- ❌ `input type=month`
  - ❌ Minimal element support
  - ❌ Custom user-interface
  - ❌ Value sanitization
  - ❌ `min` attribute
  - ❌ `max` attribute
  - ❌ `step` attribute
  - ❌ `stepDown()` method
  - ❌ `stepUp()` method
  - ❌ `valueAsDate()` method
  - ❌ `valueAsNumber()` method
- ❌ `input type=week`
  - ❌ Minimal element support
  - ❌ Custom user-interface
  - ❌ Value sanitization
  - ❌ `min` attribute
  - ❌ `max` attribute
  - ❌ `step` attribute
  - ❌ `stepDown()` method
  - ❌ `stepUp()` method
  - ❌ `valueAsDate()` method
  - ❌ `valueAsNumber()` method
- ❌ `input type=time`
  - ❌ Minimal element support
  - ❌ Custom user-interface
  - ❌ Value sanitization
  - ❌ `min` attribute
  - ❌ `max` attribute
  - ❌ `step` attribute
  - ❌ `stepDown()` method
  - ❌ `stepUp()` method
  - ❌ `valueAsDate()` method
  - ❌ `valueAsNumber()` method
- ❌ `input type=datetime-local`
  - ❌ Minimal element support
  - ❌ Custom user-interface
  - ❌ Value sanitization
  - ❌ `min` attribute
  - ❌ `max` attribute
  - ❌ `step` attribute
  - ❌ `stepDown()` method
  - ❌ `stepUp()` method
  - ❌ `valueAsNumber()` method
- ✅ `input type=number`
  - ✅ Minimal element support
  - ✅ Custom user-interface
  - ✅ Value sanitization
  - ✅ Field validation
  - ✅ `min` attribute
  - ✅ `max` attribute
  - ✅ `step` attribute
  - ✅ `stepDown()` method
  - ✅ `stepUp()` method
  - ✅ `valueAsNumber()` method
- ✅ `input type=range`
  - ✅ Minimal element support
  - ✅ Custom user-interface
  - ✅ Value sanitization
  - ✅ `min` attribute
  - ✅ `max` attribute
  - ✅ `step` attribute
  - ✅ `stepDown()` method
  - ✅ `stepUp()` method
  - ✅ `valueAsNumber()` method
- ✅ `input type=color`
  - ✅ Minimal element support
  - ✅ Custom user-interface
  - ✅ Value sanitization
- ✅ `input type=checkbox`
  - ✅ Minimal element support
  - ✅ `indeterminate` property
- ✅ `input type=image`
  - ✅ Minimal element support
  - ✅ `width` property
  - ✅ `height` property
- ⚪️ `input type=file`
  - ✅ Minimal element support
  - ✅ `files` property
  - ❌ Directory upload support
- ✅ `textarea`
  - ✅ Minimal element support
  - ✅ `maxlength` attribute
  - ✅ `wrap` attribute
- ✅ `select`
  - ✅ Minimal element support
  - ✅ `required` attribute
- ✅ `fieldset`
  - ✅ Minimal element support
  - ✅ `elements` attribute
  - ✅ `disabled` attribute
- ❌ `datalist`
  - ❌ Minimal element support
  - ❌ `list` attribute for fields
- ✅ `output`
  - ✅ Minimal element support
- ✅ `progress`
  - ✅ Minimal element support
- ✅ `meter`
  - ✅ Minimal element support

#### Fields
- ✅ Field validation
  - ✅ `pattern` attribute
  - ✅ `required` attribute
- ✅ Association of controls and forms
  - ✅ `control` property on labels
  - ✅ `form` property on fields
  - ✅ `formAction` property on fields
  - ✅ `formEnctype` property on fields
  - ✅ `formMethod` property on fields
  - ✅ `formNoValidate` property on fields
  - ✅ `formTarget` property on fields
  - ✅ `labels` property on fields
- ✅ Other attributes
  - ✅ `autofocus` attribute
  - ✅ `autocomplete` attribute
  - ✅ `placeholder` attribute
  - ✅ `multiple` attribute
  - ✅ `dirname` attribute
- ✅ CSS selectors
  - ✅ `:valid` selector
  - ✅ `:invalid` selector
  - ✅ `:optional` selector
  - ✅ `:required` selector
  - ✅ `:in-range` selector
  - ✅ `:out-of-range` selector
  - ✅ `:read-write` selector
  - ✅ `:read-only` selector
- ✅ Events
  - ✅ `oninput` event
  - ✅ `onchange` event
  - ✅ `oninvalid` event

#### Forms
- ✅ Form validation
  - ✅ `checkValidity` method
  - ✅ `noValidate` attribute



### Web Components
- ❌ Custom elements
- ❌ Shadow DOM
- ✅ HTML templates
- ❌ HTML imports



### Location and Orientation
- ❌ Geolocation
- ✅ Device Orientation
- ✅ Device Motion



### Output
- ✅ Full screen support (prefixed)
- ❌ Web Notifications



### Input
- ✅ Gamepad control
- ❌ Pointer Events
- ❌ Pointer Lock support



### Communication
- ✅ Server-Sent Events
- ❌ Beacon
- ❌ Fetch

#### XMLHttpRequest Level 2
- ✅ Upload files
- ✅ Response type support
  - ✅ Text response type
  - ✅ Document response type
  - ✅ `ArrayBuffer` response type
  - ✅ `Blob` response type

#### WebSocket
- ✅ Basic socket communication
- ✅ `ArrayBuffer` and `Blob` support



### Streams
- ❌ Readable streams
- ❌ Writable streams



### Peer to Peer
#### Connectivity
- ✅ WebRTC 1.0 (prefixed)
- ❌ ObjectRTC API for WebRTC
- ❌ Data channel

#### Input
- ✅ Access the webcam
- ❌ Screen Capture
- ❌ Enumerate devices

#### Recording
- ❌ Media Stream recorder



### User Interaction
#### Drag and drop
- ❌ Attributes
  - ❌ `draggable` attribute
  - ❌ `dropzone` attribute
- ❌ Events
  - ❌ `ondrag` event
  - ❌ `ondragstart` event
  - ❌ `ondragenter` event
  - ❌ `ondragover` event
  - ❌ `ondragleave` event
  - ❌ `ondragend` event
  - ❌ `ondrop` event

#### HTML editing
- ❌ Editing elements
  - ❌ `contentEditable` attribute
  - ❌ `isContentEditable` property
- ❌ Editing documents
  - ❌ `designMode` attribute
- ❌ CSS selectors
  - ❌ `:read-write` selector
  - ❌ `:read-only` selector
- ❌ APIs
  - ❌ `execCommand` method
  - ❌ `queryCommandEnabled` method
  - ❌ `queryCommandIndeterm` method
  - ❌ `queryCommandState` method
  - ❌ `queryCommandSupported` method
  - ❌ `queryCommandValue` method

#### Clipboard
- ❌ Clipboard API and events

#### Spellcheck
- ✅ `spellcheck` attribute



### Performance
- ✅ Workers
- ❌ Web Workers
- ❌ Shared Workers

#### Other
- ❌ `window.requestIdleCallback`



### Security
- ✅ Web Cryptography API
- ✅ Content Security Policy 1
- ✅ Content Security Policy 2
- ✅ Cross-Origin Resource Sharing
- ❌ Subresource Integrity
- ✅ Cross-document messaging

#### Authentication
- ❌ Web Authentication / FIDO 2
- ❌ Credential Management

#### Iframes
- ✅ Sandboxed `iframe`
- ✅ `iframe` with inline contents



### Payments
- ❌ Web payments



### Video
- ✅ `video` element
- ✅ Subtitles
- ✅ Audio track selection
- ✅ Video track selection
- ✅ Poster images
- ✅ Codec detection

#### Video codecs
- ❌ MPEG-4 ASP support
- ✅ H.264 support
- ❌ H.265 support
- ❌ Ogg Theora support
- ❌ WebM with VP8 support
- ❌ WebM with VP9 support



### Audio
- ✅ `audio` element
- ✅ Loop audio
- ✅ Preload in the background

#### Advanced
- ✅ Web Audio API (prefixed)
- ❌ Speech Recognition
- ❌ Speech Synthesis

#### Audio codecs
- ❌ PCM audio support
- ❌ MP3 support
- ❌ AAC support
- ❌ Dolby Digital support
- ❌ Dolby Digital Plus support
- ❌ Ogg Vorbis support
- ❌ Ogg Opus support
- ❌ WebM with Vorbis support
- ❌ WebM with Opus support



### Streaming
- ❌ Media Source extensions
- ❌ DRM support

#### Adaptive bit rate
- ❌ Dynamic Adaptive Streaming / MPEG-DASH
- ✅ HTTP Live Streaming / HLS

#### Codecs
- ❌ Video codecs
  - ❌ MP4 with H.264 support
  - ❌ MP4 with H.265 support
  - ❌ TS with H.264 support
  - ❌ TS with H.265 support
  - ❌ WebM with VP8 support
  - ❌ WebM with VP9 support
- ❌ Audio codecs
  - ❌ MP4 with AAC support
  - ❌ MP4 with Dolby Digital support
  - ❌ MP4 with Dolby Digital Plus support
  - ❌ TS with AAC support
  - ❌ TS with Dolby Digital support
  - ❌ TS with Dolby Digital Plus support
  - ❌ WebM with Vorbis support
  - ❌ WebM with Opus support



### Responsive Images
- ✅ `picture` element
- ✅ `srcset` attribute
- ✅ `sizes` attribute



### 2D Graphics
- ✅ Canvas 2D graphics

#### Drawing primitives
- ✅ Text support
- ✅ Path support
- ✅ Ellipse support
- ✅ Dashed line support
- ✅ System focus ring support

#### Features
- ❌ Hit testing support
- ✅ Blending modes

#### Image export formats
- ✅ PNG support
- ✅ JPEG support
- ❌ JPEG-XR support
- ✅ WebP support



### 3D and VR
#### 3D Graphics
- ❌ WebGL
- ❌ WebGL 2

#### VR Headset
- ❌ WebVR



### Animation
- ❌ Web Animations API
- ✅ `window.requestAnimationFrame`



### Web Applications
#### Offline resources
- ✅ Application Cache
- ❌ Service Workers
- ❌ Push Messages

#### Content and Scheme handlers
- ❌ Custom scheme handlers
- ❌ Custom content handlers



### Storage
#### Key-value storage
- ✅ Session Storage
- ✅ Local Storage

#### Database storage
- ❌ IndexedDB
- ❌ Objectstore `Blob` support
- ❌ Objectstore `ArrayBuffer` support



### Files
#### Reading files
- ✅ Basic support for reading files
- ✅ Create a `Blob` from a file
- ✅ Create a Data URL from a `Blob`
- ✅ Create an `ArrayBuffer` from a `Blob`
- ✅ Create a Blob URL from a `Blob`

#### Accessing the file system
- ❌ FileSystem API



### Scripting
#### Script execution
- ✅ Asynchronous script execution
- ✅ Deferred script execution
- ❌ Script execution events
- ✅ Runtime script error reporting

#### ECMAScript 5
- ✅ JSON encoding and decoding

#### ECMAScript 6
- ❌ Modules
- ✅ Classes
- ✅ Arrow functions
- ✅ Promises
- ✅ Template strings
- ✅ Typed arrays
- ✅ Internationalization

#### ECMAScript 7
- ❌ Async and Await

#### Other APIs
- ✅ Base64 encoding and decoding
- ✅ Mutation Observer
- ✅ URL API
- ❌ Encoding API



### Other
- ✅ Session history
- ✅ Page Visibility
- ✅ Text selection
- ✅ Scroll into view



### And so...
The Nintendo Switch browser scored 339 out of 555 potential points. Not bad for browsing but it _certainly_ isn't equipped for game development. Lack of support for WebGL, WebM, the Web Animations API, and IndexedDB certainly inhibits the kinds of games you could make, so this might explain their silence on the NWF front.

Oh well.

If you have a Switch and want to see these results for yourself, here are the steps needed to access the web browser:

1. Go to `System Settings` > `Internet` > `Internet Settings`
2. Select the network you want to join or are already connected to
3. Select `Change Settings`
4. Select `DNS Settings` and choose `Manual`
5. Under `DNS Settings`, select `Primary DNS`
6. Replace the contents with `045.055.142.122` and hit `OK`
7. Save!
8. Connect to the network you just modified DNS settings for, and you should see a message saying "Registration is required to use this network"
9. Proceed and you'll be redirected to Google, where you can search for DuckDuckGo and use that search engine instead



### Extra stuff
The useragent Nintendo is going with is `Mozilla/5.0 (Nintendo Switch; WifiWebAuthApplet) AppleWebKit/601.6 (KHTML, like Gecko) NF/4.0.0.7.9 NintendoBrowser/5.1.0.15785`. I am SO glad their useragent isn't the usual fugly spaghetti soup that most browsers come up with. The screen size is 1280 by 720.

I remember when people made websites for the Nintendo DS, back when the browser (made by Opera) came in a _[cartridge](https://en.wikipedia.org/wiki/Nintendo_DS_%26_DSi_Browser "Nintendo DS Browser, on Wikipedia")_. I still have mine btw. It also came with RAM ("Memory Expansion Pak") you put in the GBA slot for a whopping 8MB. IGN gave it a 3.5 out of 10. HAHAHAHAHAHA

Good times. 🕸
