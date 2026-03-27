# URL Shortener — My Personal Build Notes
*Written in my own words so I actually remember this.*

---

## Step 1: Setting Up the Server

I installed Express using `npm install express` and created an `index.js` file. Inside it, I wrote `app.listen(3000, ...)` which basically tells my computer — *"run a program that sits and waits for someone to knock on port 3000."* When my browser visits `localhost:3000`, it's knocking on that door and Express answers it. Without this line, nothing runs at all. It's the heartbeat of the whole server.

---

## Step 2: Creating a POST Route at `/short`

I used `app.post("/short", (req, res) => { ... })` to create a route that listens for POST requests. A POST route is used when someone is *sending* data to the server — not just visiting a page. In my case, someone sends a long URL and says "shorten this." I used Thunder Client (a VS Code extension) to simulate sending that request because you can't send a POST request from a browser's address bar directly.

---

## Step 3: Reading the Request Body with Middleware

When I first tried to read the incoming URL using `req.body.longUrl`, I got `undefined`. That's because Express by default has no idea how to read JSON data. I had to add `app.use(express.json())` *above* all my routes. This is called **middleware** — code that runs on every request before it reaches the route. Think of it as a security checkpoint that pre-processes incoming data. Once I added it, `req.body` worked perfectly and gave me the object the user sent.

---

## Step 4: Generating the Short Code

I needed to create a random 6-character string like `zwzlly` to act as the short identifier. I used:

```js
const short = Math.random().toString(36).substring(2, 8)
```

Breaking this down — `Math.random()` gives a decimal like `0.783456`. `.toString(36)` converts it to base-36, which uses digits 0–9 and letters a–z (10 + 26 = 36 characters total). `.substring(2, 8)` slices from index 2 to 8, giving me exactly 6 characters and skipping the `"0."` at the start that's always there.

I also learned that `console.log()` *returns* `undefined` — it just prints, it doesn't give back a value. So I can never write `const short = console.log(something)` and expect `short` to hold anything useful.

---

## Step 5: Storing the Mapping (In-Memory)

After generating the short code, I needed to *remember* which short code belongs to which long URL. I created an empty object **outside** the route so it persists while the server is running:

```js
const urls = {}
```

Then inside the route, after generating the code, I store the pair:

```js
urls[short] = req.body.longUrl
```

This means the short code is the **key** and the long URL is the **value**. It's like a dictionary — if someone gives me `zwzlly`, I look up `urls["zwzlly"]` and get back `https://www.google.com`. The reason I declare `urls` outside the route is critical — if it was inside, it would be recreated as empty every single time someone hits `/short`, and all previous entries would be lost.

---

## Step 6: The Redirect Route

I created a `GET` route using a **dynamic route parameter** to handle any short code:

```js
app.get("/:url", (req, res) => {
  const longUrl = urls[req.params.url]
  res.redirect(longUrl)
})
```

The `:url` syntax tells Express — *"accept anything after the slash and call it `url`."* So when someone visits `localhost:3000/zwzlly`, Express captures `zwzlly` and stores it in `req.params.url`. I then use that as a key to look up the long URL in my `urls` object and redirect the user there with `res.redirect()`. This is how every URL shortener on the planet works — the short code is just a key to look up the real destination.

---

## The Big Weakness — and Why MongoDB is Next

Right now, my `urls` object lives in **RAM** (memory). The moment I restart the server, `const urls = {}` runs fresh — completely empty. Every short URL I ever created is gone. This is called **in-memory storage**, and it's fine for learning but completely unusable in production. Imagine Bitly losing every link every time they restart a server.

This is exactly why databases exist. **MongoDB** stores data on disk, so it survives restarts, crashes, and even server replacements. The next step is connecting MongoDB using a library called **Mongoose**, creating a **Schema** (a blueprint for what a URL document looks like), and replacing `urls[short] = longUrl` with a real database save operation.

---

## What's Coming Next — MongoDB Integration

**Step 7: Connect to MongoDB Atlas**

MongoDB Atlas is a free cloud-hosted MongoDB database. I'll connect to it using Mongoose:

```js
const mongoose = require('mongoose')
mongoose.connect('your-connection-string')
```

**Step 8: Create a Schema and Model**

A Schema defines the shape of the data I want to store. For this project it'll be something like:

```js
const urlSchema = new mongoose.Schema({
  shortCode: String,
  longUrl: String,
  createdAt: { type: Date, default: Date.now }
})

const Url = mongoose.model('Url', urlSchema)
```

**Step 9: Replace In-Memory Storage with Database Calls**

Instead of `urls[short] = req.body.longUrl`, I'll write:

```js
const newUrl = new Url({ shortCode: short, longUrl: req.body.longUrl })
await newUrl.save()
```

And instead of `urls[req.params.url]`, I'll write:

```js
const found = await Url.findOne({ shortCode: req.params.url })
res.redirect(found.longUrl)
```

Notice the `await` — this is where async/await becomes essential. Talking to a database takes time (it's a network call), so I have to *wait* for the result before using it. Without `await`, I'd get a Promise object instead of the actual data.

---

## Key Concepts I've Learned So Far

**Callbacks and Async/Await** — JavaScript is asynchronous because some things (like database calls) take time. Instead of freezing the whole program to wait, you use `async/await` to say "pause here, wait for the result, then continue." I learned this through the restaurant analogy — the waiter doesn't make you stand at the counter. He takes your order and *calls you back* when it's ready.

**REST API basics** — My server is a REST API. `GET` means "give me something", `POST` means "here's data, process it." Every app I'll ever build has this same foundation.

**Middleware** — Code that runs before your route handler on every request. `express.json()` is the most common one. Later I'll use middleware for authentication, logging, and error handling.

**Dynamic Route Parameters** — Using `:paramName` in a route path to capture variable parts of the URL. Used in every social app ever — Twitter's `/:username`, Amazon's `/product/:id`.

**Key-Value Storage** — The fundamental concept of storing data with a unique key so you can retrieve it later. I implemented it manually with a JS object. Databases, Redis caches, and hash maps in DSA all use this same idea.

---

*Every concept above was learned by hitting an actual error, not by reading about it first. That's why it sticks.*
