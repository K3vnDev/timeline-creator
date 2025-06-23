# Timeline Creator
Timeline Creator is a simple web app that (you guessed it) lets you build and manage timelines. Each timeline is made up of customizable events that can be added, edited, and removed on the fly 🎞️

The interface is clean and intuitive — the creation view is the viewing page. Just click any item to edit it. Hovering over the timeline reveals a + button to add new items, keeping things smooth and clutter-free.

A menu button on the top-left corner lets you switch between timelines, or create/delete them as needed.

![The timeline view/create interface, showing a timeline named "My history with coding" with many points about games I've made](/src/public/screenshots/create.webp)

<small>⚠️ Warning: This page does not work well on mobile devices.</small>

## 📦 Timeline structure 
Timelines are separated in points and marks.

### Points
The main events of your timeline. Each point can include:

- A title
- A description
- An image

You're in control — show all three or just one. Want an image-only timeline? Go ahead.

### Marks
Quick visual indicators for key dates or labels. Perfect for things like:

- Years (2020)
- Specific timestamps (June 5, Q3, 1984)

## 🔖 Adding marks and points

Move your mouse over the timeline and click any **+** button to add a point. If you want a mark, hold the shift key while clicking.

## 🖼️ Adding Images 
You can add images to your timeline by simply dragging and dropping them:

- Drop them on a blank space → adds a new point with that image.
- Drop them on an existing point → adds or replaces the image.

Prefer clicking? There's also a button to browse your files the
old-fashioned way.

## 📂 Managing timelines

You can create, clone, delete and select timelines from the menu button on the top-left corner of the page.
I recommend changing its display color so you can easily identify it 🎨

You can also download your timeline as a JSON file and import it later.

## 🧪 How to run locally

1. Clone the repo

```bash
git clone https://github.com/K3vnDev/timeline-creator
cd timeline-creator
```

2. Once you're in the project directory, install dependencies

```bash
npm install
```

3. Start the dev server

```bash
npm run dev
```

There you go! Now find the message in the console and open the link to see your timeline (usually `http://localhost:5173`) 🪄